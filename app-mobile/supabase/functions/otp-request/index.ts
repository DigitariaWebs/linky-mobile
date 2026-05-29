import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { hmacHex } from '@shared/hmac.ts';
import { normalizePhone, normalizeEmail } from '@shared/validate.ts';

interface Body { channel: 'phone' | 'email'; target: string; purpose: 'signin' }

function valid(b: unknown): b is Body {
  const x = b as Body;
  return !!x && (x.channel === 'phone' || x.channel === 'email')
    && typeof x.target === 'string' && x.target.length > 0
    && x.purpose === 'signin';
}

const OTP_TTL_SEC = 300;
const PER_MINUTE = 1;
const PER_DAY = 5;

Deno.serve(makePost<Body>('/v1/otp/request', valid, async ({ sb, body }) => {
  const target = body.channel === 'phone' ? normalizePhone(body.target) : normalizeEmail(body.target);
  if (!target) throwApi('INVALID_TARGET', 400, body.channel === 'phone' ? 'Numéro invalide' : 'Email invalide');

  const now = Date.now();
  const sixtySecAgo = new Date(now - 60_000).toISOString();
  const dayAgo = new Date(now - 24 * 3600 * 1000).toISOString();

  const { count: minuteCount, error: e1 } = await sb
    .from('otp_codes')
    .select('id', { count: 'exact', head: true })
    .eq('target', target)
    .gte('created_at', sixtySecAgo);
  if (e1) throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
  if ((minuteCount ?? 0) >= PER_MINUTE) throwApi('OTP_RATE_LIMITED', 429, 'Trop de demandes. Réessaie dans une minute.');

  const { count: dayCount, error: e2 } = await sb
    .from('otp_codes')
    .select('id', { count: 'exact', head: true })
    .eq('target', target)
    .gte('created_at', dayAgo);
  if (e2) throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');
  if ((dayCount ?? 0) >= PER_DAY) throwApi('OTP_RATE_LIMITED', 429, 'Limite quotidienne atteinte.');

  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  const code = String(100000 + (arr[0] % 900000));
  const hmacSecret = Deno.env.get('LINKY_OTP_HMAC_SECRET');
  if (!hmacSecret) throwApi('INTERNAL_ERROR', 500, 'Configuration manquante');
  const code_hash = await hmacHex(hmacSecret, `${target}:${code}`);
  const expires_at = new Date(now + OTP_TTL_SEC * 1000).toISOString();

  const { data: inserted, error: e3 } = await sb
    .from('otp_codes')
    .insert({ channel: body.channel, target, code_hash, purpose: body.purpose, expires_at })
    .select('id')
    .single();
  if (e3 || !inserted) throwApi('INTERNAL_ERROR', 500, 'Erreur base de données');

  // ⚠️ DEV-ONLY DELIVERY GATE — must never deliver via dev_code in production.
  // LINKY_OTP_DELIVERY defaults to 'stub'. In stub mode we return the code to the
  // client as `dev_code` (and log it) for BOTH phone and email, because no SMS/email
  // provider is wired yet (Twilio deferred to production; email provider TBD).
  // PRODUCTION MUST set LINKY_OTP_DELIVERY to a real provider value so this branch is
  // skipped and dev_code is NEVER returned. A non-stub mode with no provider wired
  // fails loudly rather than silently not delivering.
  const delivery = Deno.env.get('LINKY_OTP_DELIVERY') ?? 'stub';
  if (delivery !== 'stub') {
    throwApi('CONFIG_MISSING', 500, "Service d'envoi du code indisponible. Réessaie plus tard.");
  }
  console.log(`[OTP STUB] channel=${body.channel} target=${target} code=${code} otp_id=${inserted.id}`);
  return { body: { otp_id: inserted.id, dev_code: code } };
}));
