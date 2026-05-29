import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { requireUser } from '@shared/auth.ts';

interface Cursor { created_at: string; id: string }
interface Body { cursor?: Cursor | null; limit?: number }

function valid(b: unknown): b is Body {
  if (typeof b !== 'object' || b === null) return false;
  const x = b as Body;
  if (x.limit !== undefined && (typeof x.limit !== 'number' || x.limit <= 0)) return false;
  if (x.cursor !== undefined && x.cursor !== null) {
    if (typeof x.cursor.created_at !== 'string' || typeof x.cursor.id !== 'string') return false;
  }
  return true;
}

// Keyset-paginated ledger history for the authenticated user's wallet(s), newest first.
// Pass next_cursor back as `cursor` for the next page; null cursor = first page.
Deno.serve(makePost<Body>(
  '/v1/wallet/history',
  valid,
  async ({ sb, body, req }) => {
    const userId = await requireUser(req);
    const limit = body.limit ?? 20;
    const c = body.cursor ?? null;
    const { data, error } = await sb.rpc('get_wallet_history', {
      p_user_id: userId,
      p_cursor_created_at: c?.created_at ?? null,
      p_cursor_id: c?.id ?? null,
      p_limit: limit,
    });
    if (error) throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
    const rows = (data ?? []) as Array<{ created_at: string; id: string }>;
    const next = rows.length === limit && rows.length > 0
      ? { created_at: rows[rows.length - 1].created_at, id: rows[rows.length - 1].id }
      : null;
    return { body: { entries: rows, next_cursor: next } };
  },
));
