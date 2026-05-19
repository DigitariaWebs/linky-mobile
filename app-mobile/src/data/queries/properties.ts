import { useQuery } from '@tanstack/react-query';
import { mockProperties, getProperty } from '../mockProperties';
import type { Property, PropertyType } from '../types';
import { latency } from './latency';

export interface PropertyFilters {
  type?: PropertyType;
  city?: string;
  rooms?: string | null;
  priceMaxGnf?: number;
  distanceToRoadMaxM?: number;
  furnishedOnly?: boolean;
  query?: string;
}

export function useProperties(filters: PropertyFilters = {}) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async (): Promise<Property[]> => {
      await latency();
      let list = mockProperties.slice();
      if (filters.type) list = list.filter((p) => p.type === filters.type);
      if (filters.city) list = list.filter((p) => p.city === filters.city);
      if (filters.rooms && filters.rooms !== 'studio') {
        const n = filters.rooms === '4+' ? 4 : Number(filters.rooms);
        list = list.filter((p) =>
          filters.rooms === '4+' ? (p.bedrooms ?? 0) >= n : p.bedrooms === n,
        );
      }
      if (filters.rooms === 'studio') {
        list = list.filter((p) => (p.bedrooms ?? 0) <= 1);
      }
      if (filters.priceMaxGnf) {
        list = list.filter((p) => p.priceGnf <= filters.priceMaxGnf!);
      }
      if (filters.distanceToRoadMaxM != null) {
        list = list.filter((p) => p.distanceToRoadMeters <= filters.distanceToRoadMaxM!);
      }
      if (filters.furnishedOnly) {
        list = list.filter((p) => p.furnished === true);
      }
      if (filters.query) {
        const q = filters.query.toLowerCase();
        list = list.filter(
          (p) => p.title.toLowerCase().includes(q) || p.district.toLowerCase().includes(q),
        );
      }
      return list;
    },
  });
}

export function useProperty(id: string | undefined) {
  return useQuery({
    queryKey: ['property', id],
    enabled: !!id,
    queryFn: async (): Promise<Property | undefined> => {
      await latency();
      return getProperty(id as string);
    },
  });
}

export function useNearbyProperties(limit = 4) {
  return useQuery({
    queryKey: ['properties-nearby', limit],
    queryFn: async (): Promise<Property[]> => {
      await latency();
      return mockProperties.filter((p) => p.status === 'active').slice(0, limit);
    },
  });
}
