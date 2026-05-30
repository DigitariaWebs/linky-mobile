// Returns a one-shot signed upload URL for product photos. The client PUTs the file
// directly to Supabase Storage with this URL — no proxying through the edge function.
// The matching public_url is precomputed and returned so the client can stash it in
// the create-product photos[] array without a second round trip.
//
// Path layout: products/<user_id>/<random>-<safe-filename>
// The user_id prefix makes housekeeping (e.g. delete-on-account-deletion) trivial.
import { makePost } from '@shared/wrap.ts';
import { throwApi } from '@shared/errors.ts';
import { requireUser } from '@shared/auth.ts';

interface Body { filename: string; content_type: string }

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
const NAME_RE = /^[A-Za-z0-9._-]{1,80}$/;

function valid(b: unknown): b is Body {
  if (typeof b !== 'object' || b === null) return false;
  const x = b as Record<string, unknown>;
  if (typeof x.filename !== 'string' || !NAME_RE.test(x.filename)) return false;
  if (typeof x.content_type !== 'string' || !ALLOWED.includes(x.content_type)) return false;
  return true;
}

function randomSegment(): string {
  const a = new Uint8Array(8);
  crypto.getRandomValues(a);
  return Array.from(a).map((b) => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(makePost<Body>('/v1/photos/upload-url', valid, async ({ sb, body, req }) => {
  const userId = await requireUser(req);
  const path = `products/${userId}/${randomSegment()}-${body.filename}`;

  const { data, error } = await sb.storage.from('product-photos').createSignedUploadUrl(path);
  if (error || !data) {
    console.error('[photo-upload-url] createSignedUploadUrl error:', error);
    throwApi('INTERNAL_ERROR', 500, 'Erreur génération URL');
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  if (!supabaseUrl) throwApi('CONFIG_MISSING', 500, 'Configuration manquante');
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/product-photos/${path}`;

  return {
    body: {
      upload_url: data.signedUrl,
      token: data.token,
      path,
      public_url: publicUrl,
      content_type: body.content_type,
    },
  };
}));
