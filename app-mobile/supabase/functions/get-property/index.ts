// Public read for a single property. No JWT required, no status filter — direct links to
// reserved/sold listings still resolve so the frontend can render the badge. Photos are
// returned in full (ordered by position) since this is the detail screen's primary read.
import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { mapProperty, type PropertyRow } from '@shared/catalog.ts';

interface Body { id: string }

function valid(b: unknown): b is Body {
  const x = b as Body;
  return !!x && typeof x.id === 'string' && /^[0-9a-f-]{36}$/i.test(x.id);
}

Deno.serve(makePost<Body>('/v1/properties/get', valid, async ({ sb, body }) => {
  const { data: prop, error: propErr } = await sb
    .from('properties_with_cover')
    .select('id, owner_id, shop_id, type, title, description, price_minor, per_month, bedrooms, area_sqm, furnished, amenities, city, district, distance_to_road_m, lat, lng, video_url, status, view_count, fav_count, created_at')
    .eq('id', body.id)
    .maybeSingle();
  if (propErr) {
    console.error('[get-property] fetch error:', propErr);
    throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
  }
  if (!prop) throwApi('PROPERTY_NOT_FOUND', 404, 'Annonce introuvable.');

  const { data: photoRows, error: photoErr } = await sb
    .from('property_photos')
    .select('url')
    .eq('property_id', body.id)
    .order('position', { ascending: true });
  if (photoErr) {
    console.error('[get-property] photos fetch error:', photoErr);
    throwApi('INTERNAL_ERROR', 500, 'Erreur lecture photos');
  }

  const photoUrls = (photoRows ?? []).map((p) => p.url as string);
  return { body: { property: mapProperty(prop as PropertyRow, photoUrls) } };
}));
