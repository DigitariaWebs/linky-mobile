import { handlePreflight, corsHeaders } from '@shared/cors.ts';
import { apiError, isApiError, jsonResponse } from '@shared/errors.ts';
import { serviceClient, type SupabaseClient } from '@shared/db.ts';
import { checkIdempotency, storeIdempotency } from '@shared/idempotency.ts';

export interface Ctx<T> {
  sb: SupabaseClient;
  body: T;
  req: Request;
}

export interface HandlerResult {
  status?: number;
  body: unknown;
}

export function makePost<T>(
  route: string,
  validate: (b: unknown) => b is T,
  handler: (ctx: Ctx<T>) => Promise<HandlerResult>,
  // Runs over the response body BEFORE it is persisted in idempotency_keys.response_body.
  // The LIVE response sent to the caller is unaffected. Used by token-minting endpoints to
  // strip access_token/refresh_token so a service-role DB read can't replay live credentials
  // for the 24h cache window. Contract: clients calling a previously-cached idempotency-key
  // get back only the non-credential subset (e.g. { user }) — if they need fresh tokens they
  // must re-call session-refresh or sign in again.
  cacheResponseFilter?: (body: unknown) => unknown,
): (req: Request) => Promise<Response> {
  return async (req: Request): Promise<Response> => {
    const pre = handlePreflight(req);
    if (pre) return pre;
    const cors = corsHeaders(req);

    if (req.method !== 'POST') return apiError('METHOD_NOT_ALLOWED', 405, 'Méthode non autorisée', cors);

    const idemKey = req.headers.get('idempotency-key');
    if (!idemKey) return apiError('IDEMPOTENCY_KEY_REQUIRED', 400, "En-tête Idempotency-Key requis", cors);

    const rawBody = await req.text();
    let parsed: unknown;
    try { parsed = JSON.parse(rawBody); }
    catch { return apiError('INVALID_BODY', 400, 'Corps JSON invalide', cors); }
    if (!validate(parsed)) return apiError('INVALID_BODY', 400, 'Corps invalide', cors);

    const sb = serviceClient();
    const idem = await checkIdempotency(sb, idemKey, route, rawBody);
    if (idem.conflict) return apiError('IDEMPOTENCY_KEY_CONFLICT', 409, "Clé déjà utilisée avec un autre payload", cors);
    if (idem.cached) return jsonResponse(idem.cached.response_body, idem.cached.status_code, cors);

    try {
      const { status = 200, body } = await handler({ sb, body: parsed, req });
      const cacheBody = cacheResponseFilter ? cacheResponseFilter(body) : body;
      await storeIdempotency(sb, idemKey, idem.fingerprint, status, cacheBody);
      return jsonResponse(body, status, cors);
    } catch (e) {
      if (isApiError(e)) return apiError(e.code, e.status, e.message_fr, cors);
      console.error(`[${route}] handler error:`, e);
      return apiError('INTERNAL_ERROR', 500, 'Erreur interne', cors);
    }
  };
}

// Shared filter for token-minting endpoints. Returns a shallow clone of the body
// with access_token + refresh_token stripped. See cacheResponseFilter contract above.
export function stripTokens(body: unknown): unknown {
  if (!body || typeof body !== 'object') return body;
  const { access_token: _a, refresh_token: _r, ...rest } = body as Record<string, unknown>;
  return rest;
}
