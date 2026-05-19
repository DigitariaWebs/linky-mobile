import { useQuery } from '@tanstack/react-query';
import { mockProducts } from '../mockProducts';
import { mockProperties } from '../mockProperties';
import type { DiscoverItem } from '../types';
import { latency } from './latency';

export type DiscoverFilter = 'all' | 'products' | 'properties';

// Stable shuffle using mulberry32 so the feed is deterministic across renders.
function seeded(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function useDiscoverFeed(filter: DiscoverFilter = 'all') {
  return useQuery({
    queryKey: ['discover-feed', filter],
    queryFn: async (): Promise<DiscoverItem[]> => {
      await latency();
      const items: DiscoverItem[] = [];
      if (filter !== 'properties') {
        for (const item of mockProducts.filter((p) => p.status === 'active')) {
          items.push({ kind: 'product', item });
        }
      }
      if (filter !== 'products') {
        for (const item of mockProperties.filter((p) => p.status === 'active')) {
          items.push({ kind: 'property', item });
        }
      }
      // Interleave / shuffle deterministically
      const rng = seeded(42);
      return items.sort(() => rng() - 0.5);
    },
  });
}
