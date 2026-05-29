-- Block D.2 support: wallet read helpers + top-up/withdrawal records.
-- No money moves here. In V1 top-ups/withdrawals only RECORD intent/request (manual payout;
-- payment processors deferred). When a top-up is later confirmed by a payment rail it will be
-- credited via a single locked ledger entry (post_external_credit, added with the payments module).

-- Pending top-up intents. Lifecycle: pending -> completed | failed | cancelled.
create table if not exists public.topup_intents (
  id           uuid primary key default public.uuidv7(),
  user_id      uuid not null references public.users(id) on delete cascade,
  currency     text not null check (currency in ('GNF','EUR')),
  amount_minor bigint not null check (amount_minor > 0),
  status       text not null default 'pending' check (status in ('pending','completed','failed','cancelled')),
  method       text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists topup_intents_user_idx on public.topup_intents (user_id, created_at desc);
alter table public.topup_intents enable row level security;
-- No policies: service_role only.

-- Withdrawal requests. V1 = manual payout. Lifecycle: pending -> approved -> paid | rejected | cancelled.
create table if not exists public.withdrawal_requests (
  id           uuid primary key default public.uuidv7(),
  user_id      uuid not null references public.users(id) on delete cascade,
  currency     text not null check (currency in ('GNF','EUR')),
  amount_minor bigint not null check (amount_minor > 0),
  status       text not null default 'pending' check (status in ('pending','approved','paid','rejected','cancelled')),
  destination  text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists withdrawal_requests_user_idx on public.withdrawal_requests (user_id, created_at desc);
alter table public.withdrawal_requests enable row level security;
-- No policies: service_role only.

-- Read helper: balances per currency for a user. Balance = latest balance_after per wallet (0 if none).
create or replace function public.get_wallet_balances(p_user_id uuid)
returns table (wallet_id uuid, currency text, balance_minor bigint)
language sql
security definer
set search_path = ''
as $$
  select w.id, w.currency,
         coalesce((select le.balance_after from public.ledger_entries le
                   where le.wallet_id = w.id
                   order by le.created_at desc, le.id desc limit 1), 0) as balance_minor
  from public.wallets w
  where w.user_id = p_user_id
  order by w.currency;
$$;
revoke all on function public.get_wallet_balances(uuid) from public, anon, authenticated;
grant execute on function public.get_wallet_balances(uuid) to service_role;

-- Read helper: keyset-paginated ledger history across all of a user's wallets, newest first.
-- First page: pass null cursor. Subsequent pages: pass the last row's (created_at, id).
create or replace function public.get_wallet_history(
  p_user_id uuid,
  p_cursor_created_at timestamptz,
  p_cursor_id uuid,
  p_limit int
)
returns table (
  id uuid, wallet_id uuid, currency text, direction text,
  amount_minor bigint, balance_after bigint, ref_type text, ref_id uuid, created_at timestamptz
)
language sql
security definer
set search_path = ''
as $$
  select le.id, le.wallet_id, w.currency, le.direction,
         le.amount_minor, le.balance_after, le.ref_type, le.ref_id, le.created_at
  from public.ledger_entries le
  join public.wallets w on w.id = le.wallet_id
  where w.user_id = p_user_id
    and (p_cursor_created_at is null
         or (le.created_at, le.id) < (p_cursor_created_at, p_cursor_id))
  order by le.created_at desc, le.id desc
  limit greatest(1, least(coalesce(p_limit, 20), 100));
$$;
revoke all on function public.get_wallet_history(uuid, timestamptz, uuid, int) from public, anon, authenticated;
grant execute on function public.get_wallet_history(uuid, timestamptz, uuid, int) to service_role;
