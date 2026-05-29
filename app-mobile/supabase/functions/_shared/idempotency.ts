import type { SupabaseClient } from '@shared/db.ts';

const enc = new TextEncoder();

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export interface IdempotencyResult {
  fingerprint: string;
  cached?: { status_code: number; response_body: unknown };
  conflict?: boolean;
}

const TTL_MS = 24 * 60 * 60 * 1000;

export async function checkIdempotency(
  sb: SupabaseClient,
  key: string,
  route: string,
  rawBody: string,
): Promise<IdempotencyResult> {
  const fingerprint = await sha256Hex(`${route}\n${rawBody}`);
  const { data } = await sb
    .from('idempotency_keys')
    .select('fingerprint, status_code, response_body, expires_at')
    .eq('key', key)
    .maybeSingle();
  if (!data) return { fingerprint };
  if (new Date(data.expires_at).getTime() <= Date.now()) return { fingerprint };
  if (data.fingerprint !== fingerprint) return { fingerprint, conflict: true };
  return {
    fingerprint,
    cached: { status_code: data.status_code, response_body: data.response_body },
  };
}

export async function storeIdempotency(
  sb: SupabaseClient,
  key: string,
  fingerprint: string,
  status_code: number,
  response_body: unknown,
): Promise<void> {
  const expires_at = new Date(Date.now() + TTL_MS).toISOString();
  await sb.from('idempotency_keys').upsert(
    { key, fingerprint, status_code, response_body, expires_at },
    { onConflict: 'key' },
  );
}
