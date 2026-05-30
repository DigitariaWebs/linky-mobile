import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { mapShop, type ShopRow } from '@shared/catalog.ts';

interface Body {
  verified_only?: boolean;
  limit?: number;
}

function valid(b: unknown): b is Body {
  if (typeof b !== 'object' || b === null) return false;
  const x = b as Record<string, unknown>;
  if (x.verified_only !== undefined && typeof x.verified_only !== 'boolean') return false;
  if (x.limit !== undefined && (typeof x.limit !== 'number' || x.limit < 1 || x.limit > 100)) return false;
  return true;
}

Deno.serve(makePost<Body>('/v1/shops/list', valid, async ({ sb, body }) => {
  const verifiedOnly = body.verified_only ?? true; // matches useShops default behavior
  const limit = body.limit ?? 50;
  let q = sb
    .from('shops_with_counts')
    .select('id, owner_id, name, about, city, cover_url, avatar_url, verified, rating, review_count, follower_count, response_time_text, product_count')
    .order('rating', { ascending: false });
  if (verifiedOnly) q = q.eq('verified', true);
  const { data, error } = await q.limit(limit);
  if (error) {
    console.error('[list-shops] query error:', error);
    throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
  }
  return { body: { shops: (data as ShopRow[] | null ?? []).map(mapShop) } };
}));
