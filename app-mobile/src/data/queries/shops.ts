import { useQuery } from '@tanstack/react-query';
import { mockShops, getShop } from '../mockShops';
import type { Shop } from '../types';
import { latency } from './latency';

export function useShops(limit?: number) {
  return useQuery({
    queryKey: ['shops', limit],
    queryFn: async (): Promise<Shop[]> => {
      await latency();
      const list = mockShops.filter((s) => s.verified);
      return typeof limit === 'number' ? list.slice(0, limit) : list;
    },
  });
}

export function useShop(id: string | undefined) {
  return useQuery({
    queryKey: ['shop', id],
    enabled: !!id,
    queryFn: async (): Promise<Shop | undefined> => {
      await latency();
      return getShop(id as string);
    },
  });
}
