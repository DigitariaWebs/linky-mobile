import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { requireUser } from '@shared/auth.ts';

// Returns the authenticated user's balances per currency. Balance is derived from the
// ledger (latest balance_after per wallet) via get_wallet_balances - never stored standalone.
Deno.serve(makePost<Record<string, unknown>>(
  '/v1/wallet/balance',
  (b): b is Record<string, unknown> => typeof b === 'object' && b !== null,
  async ({ sb, req }) => {
    const userId = await requireUser(req);
    const { data, error } = await sb.rpc('get_wallet_balances', { p_user_id: userId });
    if (error) throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
    return { body: { balances: data ?? [] } };
  },
));
