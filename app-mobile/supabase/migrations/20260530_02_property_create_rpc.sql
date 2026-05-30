-- Block E.2 — Atomic property + photos insert via a single PL/pgSQL function so the
-- row in public.properties and the rows in public.property_photos commit or roll back
-- together. The edge function passes owner_id/shop_id explicitly (so auth + ownership
-- are checked at the API layer) and bundles the rest of the property columns + the
-- photos array as jsonb. Postgres functions run in a single tx, so the cleanup-orphan
-- pattern the previous handler had goes away.
--
-- security definer + search_path='' is required so the service_role caller can't be
-- redirected through a malicious search_path; all table refs inside the function are
-- fully qualified to public.*. EXECUTE is revoked from anon/authenticated and granted
-- only to service_role — clients never call this directly, only via the edge function.

create or replace function public.create_property_with_photos(
  p_owner_id  uuid,
  p_shop_id   uuid,
  p_property  jsonb,
  p_photos    jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_property_id uuid;
begin
  insert into public.properties (
    owner_id, shop_id, type, title, description,
    price_minor, per_month, bedrooms, area_sqm, furnished,
    amenities, city, district, distance_to_road_m,
    lat, lng, status
  ) values (
    p_owner_id,
    p_shop_id,
    (p_property ->> 'type')::text,
    (p_property ->> 'title')::text,
    coalesce((p_property ->> 'description')::text, ''),
    (p_property ->> 'price_minor')::bigint,
    (p_property ->> 'per_month')::boolean,
    (p_property ->> 'bedrooms')::int,
    (p_property ->> 'area_sqm')::int,
    (p_property ->> 'furnished')::boolean,
    coalesce(
      case
        when jsonb_typeof(p_property -> 'amenities') = 'array'
          then array(select jsonb_array_elements_text(p_property -> 'amenities'))
        else null
      end,
      '{}'::text[]
    ),
    (p_property ->> 'city')::text,
    nullif((p_property ->> 'district')::text, ''),
    coalesce((p_property ->> 'distance_to_road_m')::int, 0),
    (p_property ->> 'lat')::double precision,
    (p_property ->> 'lng')::double precision,
    coalesce((p_property ->> 'status')::text, 'active')
  )
  returning id into v_property_id;

  -- Photos: insert in the order they arrive. The edge function re-normalizes positions
  -- to 0..N-1 before calling this RPC, so we trust them here.
  insert into public.property_photos (property_id, url, storage_path, position)
  select
    v_property_id,
    (photo ->> 'url')::text,
    (photo ->> 'storage_path')::text,
    (photo ->> 'position')::int
  from jsonb_array_elements(coalesce(p_photos, '[]'::jsonb)) as photo;

  return v_property_id;
end;
$$;

revoke all on function public.create_property_with_photos(uuid, uuid, jsonb, jsonb) from public;
revoke all on function public.create_property_with_photos(uuid, uuid, jsonb, jsonb) from anon;
revoke all on function public.create_property_with_photos(uuid, uuid, jsonb, jsonb) from authenticated;
grant execute on function public.create_property_with_photos(uuid, uuid, jsonb, jsonb) to service_role;
