import { gnfToEur } from './currency';

const frNumber = new Intl.NumberFormat('fr-FR');

export function formatGNF(amount: number): string {
  return `${frNumber.format(Math.round(amount))} GNF`;
}

export function formatEUR(amount: number): string {
  return `≈ ${frNumber.format(amount)} €`;
}

export function formatDual(amountGnf: number): { primary: string; secondary: string } {
  return {
    primary: formatGNF(amountGnf),
    secondary: formatEUR(gnfToEur(amountGnf)),
  };
}

export function formatGNFShort(amount: number): string {
  if (amount >= 1_000_000) {
    const v = amount / 1_000_000;
    return `${v.toFixed(v >= 10 ? 0 : 1)}M GNF`;
  }
  if (amount >= 1_000) {
    return `${Math.round(amount / 1_000)}k GNF`;
  }
  return formatGNF(amount);
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `À ${meters}m du goudron`;
  const km = (meters / 1000).toFixed(meters % 1000 === 0 ? 0 : 1);
  return `À ${km}km du goudron`;
}

export function formatRelativeFR(date: Date | string | number): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "À l'instant";
  if (mins < 60) return `Il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Hier';
  if (days < 7) return `Il y a ${days}j`;
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
}

export function maskPhone(phone: string): string {
  // +224 622 55 12 88 -> +224 622 •• 12 88
  if (phone.length < 8) return phone;
  return phone.replace(/(\d{2})\s?(\d{2})(?=\s?\d{2}\s?\d{2}$)/, '•• $2');
}

export function maskEmail(email: string): string {
  // fatou.balde@gmail.com -> f••••.b••@gmail.com
  const at = email.indexOf('@');
  if (at < 1) return email;
  const local = email.slice(0, at);
  const domain = email.slice(at);
  const masked = local
    .split('.')
    .map((part) => (part.length <= 1 ? part : part[0] + '•'.repeat(Math.min(part.length - 1, 4))))
    .join('.');
  return `${masked}${domain}`;
}
