// Static GNF ↔ EUR conversion rate for V1. Replace with live FX in V2.
// Matches design/parts.jsx gnfToEur (≈ 11000) for consistency with mockups.
export const GNF_PER_EUR = 11000;

export function gnfToEur(amountGnf: number): number {
  return Math.round(amountGnf / GNF_PER_EUR);
}

export function eurToGnf(amountEur: number): number {
  return Math.round(amountEur * GNF_PER_EUR);
}
