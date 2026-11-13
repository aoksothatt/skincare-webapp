import {
  HomepageData,
  Product,
  FeaturedProduct,
  Paginated,
  FilterOptions,
  ProductQueryParams,
  ProductReview,
  ReviewsSummary,
} from "./types";
import { MOCK_PRODUCTS, CATEGORIES, MOCK_REVIEWS } from "./mock-data";

/**
 * Calculates the lowest effective price for a product across all its variants.
 * Uses sale_price if available, otherwise regular price.
 */
export function getEffectivePrice(product: Product): number {
  if (!product.variants || product.variants.length === 0) return 0;
  return Math.min(
    ...product.variants.map((v) => (v.sale_price !== null ? v.sale_price : v.price))
  );
}

/**
 * Fetch Homepage data including hero configuration and featured product stands.
 * Designed to seamlessly plug into GET /api/v1/home on Laravel.
 */
export async function getHomepage(): Promise<HomepageData> {
  const activeProducts = MOCK_PRODUCTS.filter((p) => p.is_active);
  const featuredSlice = activeProducts.slice(0, 5);

  const featured: FeaturedProduct[] = featuredSlice.map((p) => {
    const firstVariant = p.variants[0];
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      category_name: p.category.name,
      price: firstVariant ? firstVariant.price : 20,
      sale_price: firstVariant ? firstVariant.sale_price : null,
      size_label: firstVariant ? firstVariant.size_label : "Standard",
      image_url: p.images.length > 0 ? p.images[0] : undefined,
      illustration_type: p.illustration_type,
      badge_text: p.badge,
      tint: p.tint,
      body_color: p.body_color,
    };
  });

  return {
    hero: {
      badge: "New arrivals · Free delivery over $30",
      title: "Skin that feels calm, clear and cared for",
      highlight_word: "calm",
      subtitle: "Authentic skincare and simple routines, delivered to your door.",
      button_label: "Shop now",
      button_link: "/shop",
    },
    featured,
  };
}

/**
 * Retrieves paginated products based on query parameters.
 * Filtering, search, sorting, and pagination are executed server-side.
 */
export async function getProducts(
  params: ProductQueryParams = {}
): Promise<Paginated<Product>> {
  const {
    category,
    skin,
    concern,
    price,
    q,
    sort = "popular",
    page = 1,
    per_page = 6,
  } = params;

  let filtered = MOCK_PRODUCTS.filter((p) => p.is_active);

  // Category filter
  if (category && category.trim() !== "") {
    filtered = filtered.filter(
      (p) => p.category.slug.toLowerCase() === category.toLowerCase()
    );
  }

  // Skin type filter (comma-separated support)
  if (skin && skin.trim() !== "") {
    const requestedSkins = skin.split(",").map((s) => s.trim().toLowerCase());
    filtered = filtered.filter((p) =>
      p.skin_types.some((st) => requestedSkins.includes(st.toLowerCase()))
    );
  }

  // Concern filter (comma-separated support)
  if (concern && concern.trim() !== "") {
    const requestedConcerns = concern.split(",").map((c) => c.trim().toLowerCase());
    filtered = filtered.filter((p) =>
      p.concerns.some((c) => requestedConcerns.includes(c.toLowerCase()))
    );
  }

  // Price range filter using effective price
  if (price && price.trim() !== "") {
    filtered = filtered.filter((p) => {
      const effPrice = getEffectivePrice(p);
      if (price === "u20") return effPrice < 20;
      if (price === "m") return effPrice >= 20 && effPrice <= 30;
      if (price === "o30") return effPrice > 30;
      return true;
    });
  }

  // Search query (matches name, category, skin types, concerns, and ingredients)
  if (q && q.trim() !== "") {
    const query = q.trim().toLowerCase();
    filtered = filtered.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.category.name.toLowerCase().includes(query) ||
        p.skin_types.some((s) => s.toLowerCase().includes(query)) ||
        p.concerns.some((c) => c.toLowerCase().includes(query)) ||
        p.description.toLowerCase().includes(query)
      );
    });
  }

  // Sorting
  filtered.sort((a, b) => {
    switch (sort) {
      case "popular":
        return a.popularity_rank - b.popularity_rank;
      case "new":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "low":
        return getEffectivePrice(a) - getEffectivePrice(b);
      case "high":
        return getEffectivePrice(b) - getEffectivePrice(a);
      default:
        return a.popularity_rank - b.popularity_rank;
    }
  });

  const total = filtered.length;
  const validPage = Math.max(1, page);
  const validPerPage = Math.max(1, per_page);
  const last_page = Math.max(1, Math.ceil(total / validPerPage));
  const startIndex = (validPage - 1) * validPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + validPerPage);

  return {
    data: paginatedData,
    total,
    page: validPage,
    per_page: validPerPage,
    last_page,
  };
}

/**
 * Filter options for the shop catalog sidebar and mobile drawer.
 */
export async function getFilterOptions(): Promise<FilterOptions> {
  const skinTypesSet = new Set<string>();
  const concernsSet = new Set<string>();

  MOCK_PRODUCTS.forEach((p) => {
    p.skin_types.forEach((s) => skinTypesSet.add(s));
    p.concerns.forEach((c) => concernsSet.add(c));
  });

  return {
    categories: CATEGORIES,
    skin_types: Array.from(skinTypesSet),
    concerns: Array.from(concernsSet),
    price_ranges: [
      { id: "u20", label: "Under $20" },
      { id: "m", label: "$20 – $30" },
      { id: "o30", label: "Over $30" },
    ],
  };
}

/**
 * Retrieves a single active product by its URL slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = MOCK_PRODUCTS.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() && p.is_active
  );
  return product || null;
}

/**
 * Fetches related products prioritizing same category, then shared skin types.
 */
export async function getRelatedProducts(
  slug: string,
  limit: number = 4
): Promise<Product[]> {
  const current = await getProductBySlug(slug);
  if (!current) return [];

  const candidates = MOCK_PRODUCTS.filter(
    (p) => p.slug.toLowerCase() !== slug.toLowerCase() && p.is_active
  );

  const scored = candidates.map((p) => {
    let score = 0;
    if (p.category.slug === current.category.slug) score += 10;
    const commonSkins = p.skin_types.filter((s) => current.skin_types.includes(s));
    score += commonSkins.length * 2;
    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.product);
}

/**
 * Retrieves approved customer reviews and rating distribution for a product.
 */
export async function getProductReviews(
  slug: string
): Promise<{ summary: ReviewsSummary; data: ProductReview[] }> {
  const reviews = (MOCK_REVIEWS[slug] || []).filter((r) => r.is_approved);
  const count = reviews.length;

  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;

  reviews.forEach((r) => {
    distribution[r.rating] = (distribution[r.rating] || 0) + 1;
    sum += r.rating;
  });

  const average = count > 0 ? Number((sum / count).toFixed(1)) : 5.0;

  return {
    summary: {
      average,
      count,
      distribution,
    },
    data: reviews,
  };
}
