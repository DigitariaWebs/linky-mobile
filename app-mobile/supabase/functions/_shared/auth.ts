import { verifyAccessToken } from '@shared/jwt.ts';
import { throwApi } from '@shared/errors.ts';

// Extracts + verifies the Linky access token from the `Authorization: Bearer <token>` header
// (the mobile client sends the user JWT there and the anon key in `apikey`). Returns the
// authenticated user id (the token's `sub`). Throws UNAUTHORIZED (401) on any failure.
export async function requireUser(req: Request): Promise<string> {
  const secret = Deno.env.get('LINKY_JWT_SECRET');
  if (!secret) throwApi('CONFIG_MISSING', 500, 'Configuration manquante');
  const m = (req.headers.get('authorization') ?? '').match(/^Bearer\s+(.+)$/i);
  if (!m) throwApi('UNAUTHORIZED', 401, 'Authentification requise.');
  try {
    const { sub } = await verifyAccessToken(m[1], secret);
    return sub;
  } catch {
    throwApi('UNAUTHORIZED', 401, 'Session invalide ou expirée.');
  }
}
