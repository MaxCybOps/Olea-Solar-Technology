import { supabaseAdmin } from "./admin";
import type { ProductRow } from "@/types/database";
import type { Product } from "@/types";

export function mapRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    shortDescription: row.short_description ?? "",
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    stockQuantity: row.stock_quantity,
    lowStockThreshold: row.low_stock_threshold,
    category: row.category as Product["category"],
    images: (row.images as string[]) ?? [],
    specifications: (row.specifications as Record<string, string>) ?? {},
    isActive: row.is_active,
    isFeatured: row.is_featured,
    requiresInstallation: false,
    rating: row.rating ?? undefined,
    reviewCount: row.review_count ?? undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export async function fetchAllActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as unknown as ProductRow[]).map(mapRowToProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!data) return null;
  return mapRowToProduct(data as unknown as ProductRow);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const { data } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (!data) return [];
  return (data as unknown as ProductRow[]).map(mapRowToProduct);
}

export async function fetchProductSlugs(): Promise<string[]> {
  const { data } = await supabaseAdmin
    .from("products")
    .select("slug")
    .eq("is_active", true);

  return (data as unknown as { slug: string }[])?.map((r) => r.slug) ?? [];
}

export async function fetchLowStockProducts(): Promise<Pick<ProductRow, "id" | "name" | "slug" | "category" | "stock_quantity" | "low_stock_threshold">[]> {
  // Supabase JS client doesn't support column-to-column comparisons, so filter in JS
  const { data } = await supabaseAdmin
    .from("products")
    .select("id, name, slug, category, stock_quantity, low_stock_threshold")
    .eq("is_active", true)
    .order("stock_quantity", { ascending: true });

  if (!data) return [];
  type Row = { id: string; name: string; slug: string; category: string; stock_quantity: number; low_stock_threshold: number };
  return (data as unknown as Row[]).filter((p) => p.stock_quantity <= p.low_stock_threshold);
}
