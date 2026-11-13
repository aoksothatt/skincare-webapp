export type IllustrationType = "serum" | "pump" | "jar" | "tube";
export type IllustrationMode = "podium" | "tile";

export type SkinType = "Dry" | "Combination" | "Oily" | "Sensitive";
export type Concern = "Hydration" | "Acne" | "Brightening";

export interface Category {
  name: string;
  slug: string;
}

export interface KeyIngredient {
  name: string;
  benefit: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size_label: string;
  price: number;
  sale_price: number | null;
  stock_qty: number;
}

export interface ProductReview {
  id: string;
  author: string;
  skin_type: string;
  rating: number;
  comment: string;
  date: string;
  is_approved: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  skin_types: string[];
  concerns: string[];
  badge?: string;
  illustration_type: IllustrationType;
  tint: string;
  body_color: string;
  is_active: boolean;
  popularity_rank: number;
  created_at: string;
  description: string;
  ingredients: string;
  how_to_use: string[];
  key_ingredients: KeyIngredient[];
  images: string[];
  rating_average: number;
  rating_count: number;
  variants: ProductVariant[];
}

export interface FeaturedProduct {
  id: string;
  slug: string;
  name: string;
  category_name: string;
  price: number;
  sale_price: number | null;
  size_label: string;
  image_url?: string;
  illustration_type: IllustrationType;
  badge_text?: string;
  tint: string;
  body_color: string;
}

export interface HeroData {
  badge: string;
  title: string;
  highlight_word: string;
  subtitle: string;
  button_label: string;
  button_link: string;
}

export interface HomepageData {
  hero: HeroData;
  featured: FeaturedProduct[];
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  last_page: number;
}

export interface FilterOptions {
  categories: Category[];
  skin_types: string[];
  concerns: string[];
  price_ranges: { id: "u20" | "m" | "o30"; label: string }[];
}

export interface ProductQueryParams {
  category?: string;
  skin?: string;
  concern?: string;
  price?: "u20" | "m" | "o30" | "";
  q?: string;
  sort?: "popular" | "new" | "low" | "high";
  page?: number;
  per_page?: number;
}

export interface ReviewsSummary {
  average: number;
  count: number;
  distribution: Record<number, number>;
}

export interface CartItem {
  variantId: string;
  qty: number;
  product: Product;
  variant: ProductVariant;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: "info" | "success" | "warn";
}
