export function normalizePhone(t: string): string | null {
  const stripped = t.replace(/\s+/g, '');
  return /^\+[1-9]\d{6,14}$/.test(stripped) ? stripped : null;
}

export function normalizeEmail(t: string): string | null {
  const v = t.trim().toLowerCase();
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? v : null;
}

export function detectCarrier(e164: string): 'orange' | 'mtn' | 'other' {
  // Guinea (+224): Orange 6[12]X, MTN 66X, plus a few others. Coarse heuristic until provider lookup lands.
  const m = e164.match(/^\+224(\d{2})/);
  if (!m) return 'other';
  const prefix = m[1];
  if (prefix === '61' || prefix === '62') return 'orange';
  if (prefix === '66') return 'mtn';
  return 'other';
}
