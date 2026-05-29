-- 2B: Atomic OTP attempts increment.
-- Replaces the read-then-write pattern in otp-verify that races under concurrent wrong-code attempts.

create or replace function public.increment_otp_attempts(p_otp_id uuid)
returns int
language sql
security definer
set search_path = ''
as $$
  update public.otp_codes
    set attempts = attempts + 1
    where id = p_otp_id
    returning attempts;
$$;

revoke all on function public.increment_otp_attempts(uuid) from public, anon, authenticated;
grant execute on function public.increment_otp_attempts(uuid) to service_role;
