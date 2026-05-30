// V1 product category whitelist. Strings are stored as-is in products.category; the
// frontend picks from this same list to keep the catalog from fragmenting into typos.
// Expand here when the catalog grows; no migration needed since the schema accepts any text.
export const PRODUCT_CATEGORIES = [
  'Beauté',
  'Électronique',
  'Mode',
  'Maison',
  'Auto',
  'Sport',
  'Alimentation',
  'Bébé & Enfants',
  'Bricolage',
  'Loisirs',
  'Services',
  'Autre',
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
