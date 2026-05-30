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
const PER_MINUTE = 3;
const PER_DAY = 10;

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

  // Email delivery: when LANDING_OTP_URL + OTP_EMAIL_SECRET are set, POST the code to
  // the landing's /api/send-otp transactional endpoint. Phone delivery + email without
  // landing configured fall through to the dev_code stub (no SMS provider wired yet).
  const landingUrl = Deno.env.get('LANDING_OTP_URL');
  const emailSecret = Deno.env.get('OTP_EMAIL_SECRET');
  const canDeliverEmail = !!landingUrl && !!emailSecret;

  if (body.channel === 'email' && canDeliverEmail) {
    try {
      const r = await fetch(`${landingUrl}/api/send-otp`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-otp-secret': emailSecret,
        },
        body: JSON.stringify({ to: target, code }),
      });
      if (!r.ok) {
        const detail = await r.text().catch(() => '');
        console.error('[otp-request] email delivery failed:', r.status, detail);
        throwApi('OTP_DELIVERY_FAILED', 502,
          "Envoi du code par email impossible. Réessaie plus tard.");
      }
      return { body: { otp_id: inserted.id } }; // no dev_code in real delivery
    } catch (e) {
      console.error('[otp-request] email fetch threw:', e);
      throwApi('OTP_DELIVERY_FAILED', 502,
        "Envoi du code par email impossible. Réessaie plus tard.");
    }
  }

  // Stub fallback: phone channel + email without landing configured.
  console.log(`[OTP STUB] channel=${body.channel} target=${target} code=${code} otp_id=${inserted.id}`);
  return { body: { otp_id: inserted.id, dev_code: code } };
}));
