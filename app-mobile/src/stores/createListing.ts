import { create } from 'zustand';

export type ListingKind = 'product' | 'property';

interface CreateListingState {
  kind: ListingKind;
  sellerType: 'particular' | 'merchant';
  category: string;
  title: string;
  description: string;
  priceGnf: number;
  quantity: number;
  condition: 'neuf' | 'occasion' | 'reconditionné';
  photos: string[];
  // Property-specific
  propertyType: 'location' | 'vente' | 'terrain';
  rooms: number;
  areaSqm: number;
  city: string;
  district: string;
  distanceToRoadMeters: number;
  furnished: boolean;
  setKind: (k: ListingKind) => void;
  set: <K extends keyof CreateListingState>(key: K, value: CreateListingState[K]) => void;
  reset: () => void;
}

const DEFAULTS = {
  kind: 'product' as ListingKind,
  sellerType: 'particular' as const,
  category: 'Électronique',
  title: 'iPhone 12 Pro 256Go',
  description: 'Comme neuf, peu utilisé. Avec boîte et chargeur.',
  priceGnf: 4_800_000,
  quantity: 1,
  condition: 'occasion' as const,
  photos: [] as string[],
  propertyType: 'location' as const,
  rooms: 2,
  areaSqm: 68,
  city: 'Conakry',
  district: 'Kaloum',
  distanceToRoadMeters: 250,
  furnished: true,
};

export const useCreateListing = create<CreateListingState>((set) => ({
  ...DEFAULTS,
  setKind: (kind) => set({ kind }),
  set: (key, value) => set({ [key]: value } as Partial<CreateListingState>),
  reset: () => set(DEFAULTS),
}));
