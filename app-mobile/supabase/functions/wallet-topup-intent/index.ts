import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { requireUser } from '@shared/auth.ts';

interface Body { currency: 'GNF' | 'EUR'; amount_minor: number; method?: string }

function valid(b: unknown): b is Body {
  if (typeof b !== 'object' || b === null) return false;
  const x = b as Body;
  return (x.currency === 'GNF' || x.currency === 'EUR')
    && typeof x.amount_minor === 'number' && Number.isInteger(x.amount_minor) && x.amount_minor > 0
    && (x.method === undefined || typeof x.method === 'string');
}

// Records a PENDING top-up intent. No money moves: a payment rail will later confirm it and
// credit the wallet via a single locked ledger entry (post_external_credit, payments module).
Deno.serve(makePost<Body>(
  '/v1/wallet/topup-intent',
  valid,
  async ({ sb, body, req }) => {
    const userId = await requireUser(req);
    const { data, error } = await sb
      .from('topup_intents')
      .insert({ user_id: userId, currency: body.currency, amount_minor: body.amount_minor, method: body.method ?? null })
      .select('id, currency, amount_minor, status, method, created_at')
      .single();
    if (error || !data) throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
    return { body: { topup: data } };
  },
));
