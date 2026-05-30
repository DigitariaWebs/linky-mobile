import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { mapProduct, type ProductRow } from '@shared/catalog.ts';

interface Body {
  category?: string;
  query?: string;
  shop_id?: string;
  sort?: 'recent' | 'popular';
  limit?: number;
}

function valid(b: unknown): b is Body {
  if (typeof b !== 'object' || b === null) return false;
  const x = b as Record<string, unknown>;
  if (x.category !== undefined && typeof x.category !== 'string') return false;
  if (x.query !== undefined && typeof x.query !== 'string') return false;
  if (x.shop_id !== undefined && (typeof x.shop_id !== 'string' || !/^[0-9a-f-]{36}$/i.test(x.shop_id))) return false;
  if (x.sort !== undefined && x.sort !== 'recent' && x.sort !== 'popular') return false;
  if (x.limit !== undefined && (typeof x.limit !== 'number' || x.limit < 1 || x.limit > 100)) return false;
  return true;
}

Deno.serve(makePost<Body>('/v1/products/list', valid, async ({ sb, body }) => {
  const limit = body.limit ?? 50;
  let q = sb
    .from('products')
    .select('id, shop_id, title, description, price_minor, category, condition, status, photos, boosted, view_count, fav_count, city, district, created_at')
    .eq('status', 'active');

  if (body.category && body.category !== 'all') q = q.eq('category', body.category);
  if (body.shop_id) q = q.eq('shop_id', body.shop_id);
  if (body.query) {
    // V1 text search: ILIKE on title + description. .or() with comma syntax. Escape % and , to
    // prevent users from broadening their own query by injecting wildcards or breaking the filter.
    const safe = body.query.replace(/[%,]/g, ' ');
    q = q.or(`title.ilike.%${safe}%,description.ilike.%${safe}%`);
  }

  if (body.sort === 'popular') q = q.order('view_count', { ascending: false });
  else q = q.order('created_at', { ascending: false });

  const { data, error } = await q.limit(limit);
  if (error) {
    console.error('[list-products] query error:', error);
    throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
  }
  return { body: { products: (data as ProductRow[] | null ?? []).map(mapProduct) } };
}));
