-- Block E.1 — Catalog (read side): shops + products + per-user favorites. Write path
-- (seller create/update, image upload, boost) is a later module. Prices are GNF integer
-- minor units (GNF has no decimal). Photos are stored as a flat text[] of URLs so the
-- shape stays 1:1 with the frontend's Product.photos string[].

-- Shops: a seller's storefront. Aggregate counts (rating/review/follower) are denormalized
-- snapshots — a worker can recompute; we don't keep them transactionally exact.
create table if not exists public.shops (
  id                  uuid primary key default public.uuidv7(),
  owner_id            uuid not null references public.users(id) on delete cascade,
  name                text not null,
  about               text not null default '',
  city                text not null,
  cover_url           text,
  avatar_url          text,
  verified            boolean not null default false,
  rating              numeric(3,2) not null default 0,
  review_count        int not null default 0,
  follower_count      int not null default 0,
  response_time_text  text not null default '— —',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index if not exists shops_owner_idx on public.shops(owner_id);
create index if not exists shops_city_idx on public.shops(city);
create index if not exists shops_verified_idx on public.shops(verified) where verified;
alter table public.shops enable row level security;
-- No public policies: reads happen via edge functions (service_role). RLS denies anon/authenticated.

-- Products: items for sale by a shop. status drives whether a row appears in public lists.
create table if not exists public.products (
  id           uuid primary key default public.uuidv7(),
  shop_id      uuid not null references public.shops(id) on delete cascade,
  title        text not null,
  description  text not null default '',
  price_minor  bigint not null check (price_minor >= 0),
  category     text not null,
  condition    text not null check (condition in ('neuf','occasion','reconditionné')),
  status       text not null default 'active'
               check (status in ('active','reserved','sold','paused','pending')),
  photos       text[] not null default '{}',
  boosted      boolean not null default false,
  view_count   int not null default 0,
  fav_count    int not null default 0,
  city         text not null,
  district     text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists products_shop_idx on public.products(shop_id);
create index if not exists products_category_active_idx
  on public.products(category) where status = 'active';
create index if not exists products_status_created_idx
  on public.products(status, created_at desc);
create index if not exists products_city_idx on public.products(city);
-- Popularity sort: top-N by view_count among active rows.
create index if not exists products_active_views_idx
  on public.products(view_count desc) where status = 'active';
alter table public.products enable row level security;
-- No public policies: service_role only.

-- Per-user favorites. Composite PK prevents duplicate rows. fav_count on products is a
-- denormalized cache kept in sync by the favorite-toggle endpoint (separate session).
create table if not exists public.product_favorites (
  user_id    uuid not null references public.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);
create index if not exists product_favorites_product_idx on public.product_favorites(product_id);
alter table public.product_favorites enable row level security;
-- No public policies: write endpoint runs as service_role after requireUser().

-- View: shops with an active-product count joined in, so the API can return the Shop shape
-- the frontend expects (productCount) in one query.
create or replace view public.shops_with_counts as
  select
    s.id, s.owner_id, s.name, s.about, s.city,
    s.cover_url, s.avatar_url, s.verified, s.rating,
    s.review_count, s.follower_count, s.response_time_text,
    s.created_at, s.updated_at,
    coalesce(p.cnt, 0)::int as product_count
  from public.shops s
  left join (
    select shop_id, count(*) as cnt
    from public.products
    where status = 'active'
    group by shop_id
  ) p on p.shop_id = s.id;
