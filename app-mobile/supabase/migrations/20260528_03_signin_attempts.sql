-- 2F: Per-target and per-IP rate limiting for email signin.
-- Without this, credential-stuffing is wide open: Idempotency-Key gates retries of the SAME
-- request, but each attempt with a fresh idem-key looks like a new request.

create table if not exists public.signin_attempts (
  id          uuid primary key default public.uuidv7(),
  target      text not null,           -- normalized email (or raw input on invalid-format)
  ip          text,                    -- x-forwarded-for first hop, may be null
  succeeded   boolean not null,
  created_at  timestamptz not null default now()
);

create index if not exists signin_attempts_target_created_at_idx
  on public.signin_attempts (target, created_at desc);

create index if not exists signin_attempts_ip_created_at_idx
  on public.signin_attempts (ip, created_at desc);

alter table public.signin_attempts enable row level security;
-- No policies: only service_role accesses this table (which bypasses RLS).
