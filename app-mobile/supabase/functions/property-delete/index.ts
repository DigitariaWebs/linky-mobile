// Hard-delete a property the caller owns. property_photos rows cascade via FK on
// properties.id (ON DELETE CASCADE in the Phase E migration). visit_requests also
// cascade. Storage objects are NOT auto-removed — same future sweeper job as products.
import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { requireUser } from '@shared/auth.ts';

interface Body { id: string }

function valid(b: unknown): b is Body {
  const x = b as Body;
  return !!x && typeof x.id === 'string' && /^[0-9a-f-]{36}$/i.test(x.id);
}

Deno.serve(makePost<Body>('/v1/properties/delete', valid, async ({ sb, body, req }) => {
  const userId = await requireUser(req);

  const { data: own, error: eOwn } = await sb
    .from('properties').select('id, owner_id')
    .eq('id', body.id).maybeSingle();
  if (eOwn) throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
  if (!own) throwApi('PROPERTY_NOT_FOUND', 404, 'Annonce introuvable.');
  if ((own as { owner_id: string }).owner_id !== userId) throwApi('FORBIDDEN', 403, 'Action refusée.');

  const { error } = await sb.from('properties').delete().eq('id', body.id);
  if (error) {
    console.error('[property-delete] error:', error);
    throwApi('INTERNAL_ERROR', 500, 'Erreur suppression');
  }
  return { body: { deleted: true } };
}));
