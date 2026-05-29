-- 2C: Transactional user + identity creation.
-- Replaces the manual two-insert pattern that left orphan users rows on unique-constraint races.
--
-- Three RPCs:
--   find_or_create_user_with_phone(p_e164, p_carrier)
--     -- otp-verify phone path: phone OTP proves ownership, so verified_at = now()
--   find_or_create_user_with_email(p_address)
--     -- otp-verify email path: email OTP proves ownership, so verified_at = now()
--   create_user_with_email(p_address, p_password_hash)
--     -- email-signup path: no proof of ownership yet, verified_at stays NULL (2D)

create or replace function public.find_or_create_user_with_phone(
  p_e164 text,
  p_carrier text
)
returns table (id uuid, was_created boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  found_user_id uuid;
  new_user_id uuid;
begin
  -- Fast path: phone already linked to a user
  select p.user_id into found_user_id from public.phones p where p.e164 = p_e164;
  if found_user_id is not null then
    return query select found_user_id, false;
    return;
  end if;

  -- Slow path: create user + phone atomically.
  begin
    insert into public.users default values returning users.id into new_user_id;
    insert into public.phones (user_id, e164, carrier, is_primary, verified_at)
      values (new_user_id, p_e164, p_carrier, true, now());
    return query select new_user_id, true;
  exception
    when unique_violation then
      -- Concurrent signup beat us. PG rolled back the user insert; look up the winner.
      select p.user_id into found_user_id from public.phones p where p.e164 = p_e164;
      if found_user_id is null then raise; end if;
      return query select found_user_id, false;
  end;
end;
$$;

create or replace function public.find_or_create_user_with_email(
  p_address text
)
returns table (id uuid, was_created boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  found_user_id uuid;
  new_user_id uuid;
begin
  select e.user_id into found_user_id from public.emails e where e.address = p_address;
  if found_user_id is not null then
    return query select found_user_id, false;
    return;
  end if;

  begin
    insert into public.users default values returning users.id into new_user_id;
    insert into public.emails (user_id, address, is_primary, verified_at)
      values (new_user_id, p_address, true, now());
    return query select new_user_id, true;
  exception
    when unique_violation then
      select e.user_id into found_user_id from public.emails e where e.address = p_address;
      if found_user_id is null then raise; end if;
      return query select found_user_id, false;
  end;
end;
$$;

create or replace function public.create_user_with_email(
  p_address text,
  p_password_hash text
)
returns table (id uuid, display_name text, avatar_url text, locale text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_user_id uuid;
begin
  -- Note: verified_at is intentionally NULL. Email-signup doesn't prove ownership (anyone
  -- can type any email). A separate verification flow must set verified_at before sensitive
  -- actions are allowed on this email. (2D)
  insert into public.users (password_hash) values (p_password_hash) returning users.id into new_user_id;
  -- Lets unique_violation (SQLSTATE 23505) bubble up — PG will roll back the user insert,
  -- so no orphan rows. Edge function maps 23505 -> EMAIL_ALREADY_REGISTERED.
  insert into public.emails (user_id, address, is_primary, verified_at)
    values (new_user_id, p_address, true, null);

  return query
    select u.id, u.display_name, u.avatar_url, u.locale
    from public.users u where u.id = new_user_id;
end;
$$;

revoke all on function public.find_or_create_user_with_phone(text, text) from public, anon, authenticated;
revoke all on function public.find_or_create_user_with_email(text) from public, anon, authenticated;
revoke all on function public.create_user_with_email(text, text) from public, anon, authenticated;
grant execute on function public.find_or_create_user_with_phone(text, text) to service_role;
grant execute on function public.find_or_create_user_with_email(text) to service_role;
grant execute on function public.create_user_with_email(text, text) to service_role;
