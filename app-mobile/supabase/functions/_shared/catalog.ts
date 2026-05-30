// Row → frontend shape mappers for catalog endpoints. Keeps every endpoint's response
// 1:1 with the Product / Shop types in src/data/types.ts so the existing screens consume
// the API output without translation. price_minor stays integer GNF (no float conversion).

export interface ProductRow {
  id: string;
  shop_id: string;
  title: string;
  description: string;
  price_minor: number | string; // bigint may arrive as string from PostgREST
  category: string;
  condition: 'neuf' | 'occasion' | 'reconditionné';
  status: 'active' | 'reserved' | 'sold' | 'paused' | 'pending';
  photos: string[] | null;
  boosted: boolean;
  view_count: number;
  fav_count: number;
  city: string;
  district: string | null;
  created_at: string;
}

export interface ShopRow {
  id: string;
  owner_id: string;
  name: string;
  about: string;
  city: string;
  cover_url: string | null;
  avatar_url: string | null;
  verified: boolean;
  rating: number | string;
  review_count: number;
  follower_count: number;
  response_time_text: string;
  product_count?: number; // present on shops_with_counts view only
}

export function mapProduct(r: ProductRow) {
  return {
    id: r.id,
    shopId: r.shop_id,
    title: r.title,
    description: r.description,
    priceGnf: Number(r.price_minor),
    category: r.category,
    condition: r.condition,
    status: r.status,
    photos: r.photos ?? [],
    boosted: r.boosted,
    viewCount: r.view_count,
    favCount: r.fav_count,
    city: r.city,
    district: r.district ?? undefined,
    createdAt: r.created_at,
  };
}

export function mapShop(r: ShopRow) {
  return {
    id: r.id,
    ownerId: r.owner_id,
    name: r.name,
    cover: r.cover_url ?? '',
    avatar: r.avatar_url ?? '',
    city: r.city,
    verified: r.verified,
    rating: Number(r.rating),
    reviewCount: r.review_count,
    followerCount: r.follower_count,
    productCount: r.product_count ?? 0,
    responseTime: r.response_time_text,
    about: r.about,
  };
}
