-- 3B: Nightly cleanup of expired/revoked rows.
-- Without this, sessions / idempotency_keys / signin_attempts grow unboundedly.

create extension if not exists pg_cron with schema extensions;

-- Unschedule if it already exists (idempotent re-apply)
do $$
begin
  perform cron.unschedule('linky-auth-cleanup');
exception
  when others then null;
end $$;

select cron.schedule(
  'linky-auth-cleanup',
  '0 3 * * *',  -- 03:00 UTC nightly
  $$
    delete from public.sessions
      where (revoked_at is not null and revoked_at < now() - interval '90 days')
         or expires_at < now() - interval '90 days';
    delete from public.idempotency_keys where expires_at < now();
    delete from public.signin_attempts where created_at < now() - interval '30 days';
    delete from public.otp_codes where expires_at < now() - interval '7 days';
  $$
);
