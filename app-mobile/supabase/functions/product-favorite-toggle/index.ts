import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { requireUser } from '@shared/auth.ts';

interface Body { product_id: string }

function valid(b: unknown): b is Body {
  const x = b as Body;
  return !!x && typeof x.product_id === 'string' && /^[0-9a-f-]{36}$/i.test(x.product_id);
}

Deno.serve(makePost<Body>('/v1/products/favorite-toggle', valid, async ({ sb, body, req }) => {
  const userId = await requireUser(req);
  const { data, error } = await sb.rpc('toggle_product_favorite', {
    p_user_id: userId,
    p_product_id: body.product_id,
  });
  if (error) {
    console.error('[product-favorite-toggle] rpc error:', error);
    // 23503 = foreign_key_violation → product was deleted between the request and the RPC.
    if ((error as { code?: string }).code === '23503') {
      throwApi('PRODUCT_NOT_FOUND', 404, 'Produit introuvable');
    }
    throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
  }
  const row = Array.isArray(data) && data.length > 0 ? data[0] : null;
  if (!row) throwApi('INTERNAL_ERROR', 500, 'Réponse invalide');
  return {
    body: {
      favorited: !!(row as { favorited: boolean }).favorited,
      fav_count: Number((row as { fav_count: number }).fav_count),
    },
  };
}));
