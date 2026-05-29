-- Block D.1 - Wallet + double-entry ledger. Rail-agnostic: payment processors
-- (Stripe, mobile money) post into this ledger later; the ledger must exist first.
-- Money is INTEGER minor units, never float. GNF has no minor unit (stored as-is);
-- EUR is stored in cents. Balances are always recomputable from ledger_entries.

-- One wallet per user per currency. A single user (buyer/seller/agent) may hold both GNF and EUR.
create table if not exists public.wallets (
  id          uuid primary key default public.uuidv7(),
  user_id     uuid not null references public.users(id) on delete cascade,
  currency    text not null check (currency in ('GNF','EUR')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, currency)
);
create index if not exists wallets_user_id_idx on public.wallets (user_id);
alter table public.wallets enable row level security;
-- No policies: only service_role (edge functions) touches wallets; RLS denies anon/authenticated.

-- Append-only ledger. Every money movement is TWO rows (one debit, one credit) sharing a
-- ref_id - the double-entry invariant, enforced in post_transfer(), not on the table.
-- balance_after is a running-balance cache; it stays recomputable as sum(credits)-sum(debits).
create table if not exists public.ledger_entries (
  id             uuid primary key default public.uuidv7(),
  wallet_id      uuid not null references public.wallets(id) on delete restrict,
  direction      text not null check (direction in ('debit','credit')),
  amount_minor   bigint not null check (amount_minor > 0),
  balance_after  bigint not null,
  ref_type       text not null,
  ref_id         uuid not null,
  created_at     timestamptz not null default now()
);
create index if not exists ledger_entries_wallet_created_idx
  on public.ledger_entries (wallet_id, created_at desc);
create index if not exists ledger_entries_ref_idx
  on public.ledger_entries (ref_type, ref_id);
alter table public.ledger_entries enable row level security;
-- No policies: service_role only.

-- Enforce append-only at the DB level: UPDATE and DELETE are blocked for everyone,
-- including service_role. Financial history is immutable.
create or replace function public.ledger_entries_immutable()
returns trigger
language plpgsql
as $$
begin
  raise exception 'ledger_entries is append-only (% blocked)', tg_op;
end;
$$;

drop trigger if exists ledger_entries_no_update on public.ledger_entries;
create trigger ledger_entries_no_update
  before update on public.ledger_entries
  for each row execute function public.ledger_entries_immutable();

drop trigger if exists ledger_entries_no_delete on public.ledger_entries;
create trigger ledger_entries_no_delete
  before delete on public.ledger_entries
  for each row execute function public.ledger_entries_immutable();

-- Double-entry transfer: debit p_from_wallet + credit p_to_wallet atomically, sharing p_ref_id,
-- with a balance check. Raises INSUFFICIENT_FUNDS when the source can't cover the amount.
-- Both wallet rows are locked (in id order) so concurrent transfers serialize without deadlock.
create or replace function public.post_transfer(
  p_from_wallet  uuid,
  p_to_wallet    uuid,
  p_amount_minor bigint,
  p_ref_type     text,
  p_ref_id       uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_from_currency text;
  v_to_currency   text;
  v_from_balance  bigint;
  v_to_balance    bigint;
begin
  if p_amount_minor is null or p_amount_minor <= 0 then
    raise exception 'INVALID_AMOUNT';
  end if;
  if p_from_wallet = p_to_wallet then
    raise exception 'SAME_WALLET';
  end if;

  -- Lock both wallets in deterministic (id) order to avoid deadlocks under concurrency.
  perform 1 from public.wallets where id in (p_from_wallet, p_to_wallet) order by id for update;

  select currency into v_from_currency from public.wallets where id = p_from_wallet;
  select currency into v_to_currency   from public.wallets where id = p_to_wallet;
  if v_from_currency is null then raise exception 'FROM_WALLET_NOT_FOUND'; end if;
  if v_to_currency   is null then raise exception 'TO_WALLET_NOT_FOUND'; end if;
  if v_from_currency <> v_to_currency then
    raise exception 'CURRENCY_MISMATCH';  -- no implicit FX; conversions are explicit transfers
  end if;

  -- Current balance = latest balance_after for the wallet (0 if no entries yet).
  v_from_balance := coalesce((select balance_after from public.ledger_entries
                              where wallet_id = p_from_wallet order by created_at desc, id desc limit 1), 0);
  v_to_balance   := coalesce((select balance_after from public.ledger_entries
                              where wallet_id = p_to_wallet order by created_at desc, id desc limit 1), 0);

  if v_from_balance < p_amount_minor then
    raise exception 'INSUFFICIENT_FUNDS';
  end if;

  insert into public.ledger_entries (wallet_id, direction, amount_minor, balance_after, ref_type, ref_id)
    values (p_from_wallet, 'debit',  p_amount_minor, v_from_balance - p_amount_minor, p_ref_type, p_ref_id);
  insert into public.ledger_entries (wallet_id, direction, amount_minor, balance_after, ref_type, ref_id)
    values (p_to_wallet,   'credit', p_amount_minor, v_to_balance   + p_amount_minor, p_ref_type, p_ref_id);
end;
$$;

revoke all on function public.post_transfer(uuid, uuid, bigint, text, uuid) from public, anon, authenticated;
grant execute on function public.post_transfer(uuid, uuid, bigint, text, uuid) to service_role;
