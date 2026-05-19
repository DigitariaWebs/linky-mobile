import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mockProducts, getProduct } from '../mockProducts';
import type { Product } from '../types';
import { latency } from './latency';

export interface ProductFilters {
  category?: string;
  query?: string;
  shopId?: string;
}

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async (): Promise<Product[]> => {
      await latency();
      let list = mockProducts.slice();
      if (filters.category && filters.category !== 'all') {
        list = list.filter((p) => p.category === filters.category);
      }
      if (filters.shopId) {
        list = list.filter((p) => p.shopId === filters.shopId);
      }
      if (filters.query) {
        const q = filters.query.toLowerCase();
        list = list.filter(
          (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
        );
      }
      return list;
    },
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    enabled: !!id,
    queryFn: async (): Promise<Product | undefined> => {
      await latency();
      return getProduct(id as string);
    },
  });
}

export function usePopularProducts(limit = 4) {
  return useQuery({
    queryKey: ['products-popular', limit],
    queryFn: async (): Promise<Product[]> => {
      await latency();
      return [...mockProducts]
        .filter((p) => p.status === 'active')
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, limit);
    },
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) => {
      await new Promise((r) => setTimeout(r, 120));
      return productId;
    },
    onSuccess: (productId) => {
      qc.invalidateQueries({ queryKey: ['product', productId] });
    },
  });
}
