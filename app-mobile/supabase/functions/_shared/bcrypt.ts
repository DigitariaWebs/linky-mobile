import bcrypt from 'bcryptjs';

export const BCRYPT_ROUNDS = 10;

export async function bcryptHash(plain: string): Promise<string> {
  return await bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function bcryptCompare(plain: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plain, hash);
}
