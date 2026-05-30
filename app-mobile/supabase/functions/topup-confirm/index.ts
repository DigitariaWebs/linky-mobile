// Confirms a pending top-up intent, credits the user's wallet, and marks the intent completed.
// V1 = manual operator use: gated by LINKY_ADMIN_SECRET via the x-admin-secret header.
// When a payment processor is wired (Stripe / Orange Money / MTN), the rail's webhook handler
// will be a different endpoint that calls the SAME confirm_topup RPC with rail-specific auth.
import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';

interface Body { topup_id: string }

function valid(b: unknown): b is Body {
  const x = b as Body;
  return !!x && typeof x.topup_id === 'string' && /^[0-9a-f-]{36}$/i.test(x.topup_id);
}

function timingSafeStringEq(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

Deno.serve(makePost<Body>('/v1/wallet/topup-confirm', valid, async ({ sb, body, req }) => {
  const adminSecret = Deno.env.get('LINKY_ADMIN_SECRET');
  if (!adminSecret) throwApi('CONFIG_MISSING', 500, 'Service indisponible.');
  const provided = req.headers.get('x-admin-secret') ?? '';
  if (!timingSafeStringEq(provided, adminSecret)) {
    throwApi('FORBIDDEN', 403, 'Accès refusé.');
  }

  const { data, error } = await sb.rpc('confirm_topup', { p_topup_id: body.topup_id });
  if (error) {
    const msg = (error as { message?: string }).message ?? '';
    if (msg.includes('TOPUP_NOT_FOUND')) throwApi('TOPUP_NOT_FOUND', 404, 'Top-up introuvable.');
    if (msg.includes('TOPUP_NOT_PENDING')) throwApi('TOPUP_NOT_PENDING', 409, 'Top-up déjà traité.');
    console.error('[topup-confirm] rpc error:', error);
    throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
  }
  const row = Array.isArray(data) && data.length > 0 ? data[0] : null;
  if (!row) throwApi('INTERNAL_ERROR', 500, 'Réponse invalide');
  return {
    body: {
      wallet_id: (row as { wallet_id: string }).wallet_id,
      new_balance: Number((row as { new_balance: number | string }).new_balance),
    },
  };
}));
