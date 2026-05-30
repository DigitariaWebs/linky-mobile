-- Block D.3 — Wallet funding loop. confirm_topup closes the gap between a recorded
-- top-up intent and an actual balance change. One atomic transaction:
--   1. Lock the topup_intents row (serializes concurrent confirmations of the same intent)
--   2. Ensure the user has a wallet for the intent's currency (auto-create on first use)
--   3. Append a one-sided ledger credit (ref_type='topup', ref_id=intent id)
--   4. Mark the intent 'completed'
-- "One-sided" because the counterparty is OUTSIDE the system (the payment rail). The
-- double-entry invariant in post_transfer applies only to internal transfers; external
-- funding flows are documented as single entries linked back to the rail's record id.

create or replace function public.confirm_topup(p_topup_id uuid)
returns table (wallet_id uuid, new_balance bigint)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_topup     record;
  v_wallet_id uuid;
  v_balance   bigint;
begin
  -- Lock the topup row first; if two operators click "confirm" at once only one proceeds.
  select id, user_id, currency, amount_minor, status
    into v_topup
    from public.topup_intents
    where id = p_topup_id
    for update;
  if not found then raise exception 'TOPUP_NOT_FOUND'; end if;
  if v_topup.status <> 'pending' then
    raise exception 'TOPUP_NOT_PENDING';
  end if;

  -- Ensure a wallet exists for this user + currency. unique (user_id, currency) makes
  -- the conflict path a no-op if the wallet was created earlier.
  insert into public.wallets (user_id, currency)
    values (v_topup.user_id, v_topup.currency)
    on conflict (user_id, currency) do nothing;

  select id into v_wallet_id
    from public.wallets
    where user_id = v_topup.user_id and currency = v_topup.currency
    for update;

  v_balance := coalesce(
    (select balance_after from public.ledger_entries
       where wallet_id = v_wallet_id
       order by created_at desc, id desc
       limit 1), 0);

  insert into public.ledger_entries (wallet_id, direction, amount_minor, balance_after, ref_type, ref_id)
    values (v_wallet_id, 'credit', v_topup.amount_minor, v_balance + v_topup.amount_minor, 'topup', p_topup_id);

  update public.topup_intents
    set status = 'completed', updated_at = now()
    where id = p_topup_id;

  wallet_id := v_wallet_id;
  new_balance := v_balance + v_topup.amount_minor;
  return next;
end;
$$;

revoke all on function public.confirm_topup(uuid) from public, anon, authenticated;
grant execute on function public.confirm_topup(uuid) to service_role;
