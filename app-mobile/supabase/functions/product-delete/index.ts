// Hard-delete a product the caller owns. product_favorites rows cascade via FK.
// Storage photos are NOT auto-removed here — a sweeper job (later) prunes orphans.
import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { requireUser } from '@shared/auth.ts';

interface Body { id: string }

function valid(b: unknown): b is Body {
  const x = b as Body;
  return !!x && typeof x.id === 'string' && /^[0-9a-f-]{36}$/i.test(x.id);
}

Deno.serve(makePost<Body>('/v1/products/delete', valid, async ({ sb, body, req }) => {
  const userId = await requireUser(req);

  const { data: own, error: eOwn } = await sb
    .from('products').select('id, shops!inner(owner_id)')
    .eq('id', body.id).maybeSingle();
  if (eOwn) throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
  if (!own) throwApi('PRODUCT_NOT_FOUND', 404, 'Produit introuvable.');
  const ownerId = Array.isArray((own as { shops: unknown }).shops)
    ? ((own as { shops: { owner_id: string }[] }).shops[0]?.owner_id)
    : (own as { shops: { owner_id: string } }).shops?.owner_id;
  if (ownerId !== userId) throwApi('FORBIDDEN', 403, 'Action refusée.');

  const { error } = await sb.from('products').delete().eq('id', body.id);
  if (error) {
    console.error('[product-delete] error:', error);
    throwApi('INTERNAL_ERROR', 500, 'Erreur suppression');
  }
  return { body: { deleted: true } };
}));
