-- Block E.1 — Properties (read + write): properties + per-property photos + visit requests.
-- Mirrors the catalog (products) pattern: prices in GNF integer minor units, RLS-on but
-- service-role-only (edge functions enforce ownership via requireUser). Offers are a
-- later module (Phase F) — visit_requests is scoped to scheduling only.

-- Properties: a real-estate listing owned by a user (and optionally tied to a shop/agence).
-- type drives downstream UX (terrain has no bedrooms/sdb/visites). per_month is true for
-- locations, false for vente/terrain — kept as a boolean so the API doesn't need to
-- inspect type to know how to display the price.
create table if not exists public.properties (
  id                     uuid primary key default public.uuidv7(),
  owner_id               uuid not null references public.users(id) on delete cascade,
  shop_id                uuid references public.shops(id) on delete set null,
  type                   text not null check (type in ('location','vente','terrain')),
  title                  text not null,
  description            text not null default '',
  price_minor            bigint not null check (price_minor >= 0),
  per_month              boolean not null default false,
  bedrooms               int check (bedrooms is null or bedrooms >= 0),
  area_sqm               int check (area_sqm is null or area_sqm >= 0),
  furnished              boolean,
  amenities              text[] not null default '{}',
  city                   text not null,
  district               text,
  distance_to_road_m     int not null default 0 check (distance_to_road_m >= 0),
  -- Geo: split lat/lng instead of PostGIS to keep the supabase project dependency-free.
  -- If proximity search is ever needed, add a generated geography column + GiST index then.
  lat                    double precision,
  lng                    double precision,
  video_url              text,
  status                 text not null default 'active'
                         check (status in ('active','reserved','sold','paused','pending')),
  view_count             int not null default 0,
  fav_count              int not null default 0,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create index if not exists properties_owner_idx on public.properties(owner_id);
create index if not exists properties_shop_idx on public.properties(shop_id);
create index if not exists properties_type_active_idx
  on public.properties(type) where status = 'active';
create index if not exists properties_city_idx on public.properties(city);
create index if not exists properties_status_created_idx
  on public.properties(status, created_at desc);
-- Common marketplace filter: city + type + price ceiling, active only.
create index if not exists properties_active_city_type_price_idx
  on public.properties(city, type, price_minor) where status = 'active';
alter table public.properties enable row level security;
-- No public policies: service_role only via edge functions.

-- Property photos: separate from text[] (vs products) because real-estate listings
-- typically have many more photos with explicit cover/order, and we want per-photo
-- metadata (storage path for deletion, caption later). position 0 is the cover.
create table if not exists public.property_photos (
  id           uuid primary key default public.uuidv7(),
  property_id  uuid not null references public.properties(id) on delete cascade,
  url          text not null,
  storage_path text,
  position     int not null check (position >= 0),
  created_at   timestamptz not null default now(),
  unique (property_id, position)
);
create index if not exists property_photos_property_idx on public.property_photos(property_id, position);
alter table public.property_photos enable row level security;
-- No public policies: service_role only.

-- Visit requests: buyer proposes a time slot on a property; the seller/agent accepts,
-- rejects, or it expires. requested_at is the concrete UTC instant the buyer asked for.
-- decided_at + decided_by_id are filled when the seller responds; cancelled by buyer.
create table if not exists public.visit_requests (
  id              uuid primary key default public.uuidv7(),
  property_id     uuid not null references public.properties(id) on delete cascade,
  buyer_id        uuid not null references public.users(id) on delete cascade,
  requested_at    timestamptz not null,
  note            text not null default '',
  status          text not null default 'pending'
                  check (status in ('pending','accepted','rejected','cancelled','completed')),
  decided_at      timestamptz,
  decided_by_id   uuid references public.users(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  -- A buyer can't double-book the same slot on the same property.
  unique (property_id, buyer_id, requested_at)
);
create index if not exists visit_requests_property_idx on public.visit_requests(property_id, status);
create index if not exists visit_requests_buyer_idx on public.visit_requests(buyer_id, created_at desc);
create index if not exists visit_requests_pending_idx
  on public.visit_requests(property_id, requested_at) where status = 'pending';
alter table public.visit_requests enable row level security;
-- No public policies: service_role only.

-- View: properties + cover photo URL + photo count, so list-properties / get-property
-- can return the frontend shape (photos[]) without N+1. The cover is position=0.
create or replace view public.properties_with_cover as
  select
    p.*,
    pc.url as cover_url,
    coalesce(pp.cnt, 0)::int as photo_count
  from public.properties p
  left join lateral (
    select url from public.property_photos
    where property_id = p.id and position = 0
    limit 1
  ) pc on true
  left join (
    select property_id, count(*) as cnt
    from public.property_photos group by property_id
  ) pp on pp.property_id = p.id;
