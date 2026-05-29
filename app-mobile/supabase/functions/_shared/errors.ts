export function jsonResponse(body: unknown, status: number, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...extraHeaders },
  });
}

export function apiError(code: string, status: number, message_fr: string, extraHeaders: Record<string, string> = {}): Response {
  return jsonResponse({ error: { code, message_fr } }, status, extraHeaders);
}

export interface ApiErrorShape {
  __apiError: true;
  code: string;
  status: number;
  message_fr: string;
}

export function throwApi(code: string, status: number, message_fr: string): never {
  const e: ApiErrorShape = { __apiError: true, code, status, message_fr };
  throw e;
}

export function isApiError(e: unknown): e is ApiErrorShape {
  return !!e && typeof e === 'object' && (e as { __apiError?: boolean }).__apiError === true;
}
