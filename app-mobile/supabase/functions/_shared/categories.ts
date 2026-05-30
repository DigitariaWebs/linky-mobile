// V1 product category whitelist. Mirrors the 6 grouped tiles in the create-product wizard
// (app/create/product/category.tsx) — the wizard is the source of truth, this list just
// enforces it server-side so manual API hits can't slip in arbitrary labels. Keep the two
// lists in sync when adding/renaming tiles. Schema accepts any text, so no migration needed.
export const PRODUCT_CATEGORIES = [
  'Mode & Beauté',
  'Électronique',
  'Maison',
  'Auto & Moto',
  'Beauté & Soin',
  'Services',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export function isValidCategory(s: unknown): s is ProductCategory {
  return typeof s === 'string' && (PRODUCT_CATEGORIES as readonly string[]).includes(s);
}

export const PRODUCT_CONDITIONS = ['neuf', 'occasion', 'reconditionné'] as const;
export type ProductCondition = (typeof PRODUCT_CONDITIONS)[number];
export function isValidCondition(s: unknown): s is ProductCondition {
  return typeof s === 'string' && (PRODUCT_CONDITIONS as readonly string[]).includes(s);
}
