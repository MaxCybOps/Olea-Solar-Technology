import type { Metadata } from "next";
import { fetchAllActiveProducts } from "@/lib/supabase/products";
import { SEED_PRODUCTS } from "@/lib/products-data";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "Shop Solar Products | Olea Technologies",
  description: "Browse inverters, solar panels, batteries, charge controllers, and complete systems.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const dbProducts = await fetchAllActiveProducts();
  // Fall back to seed data if Supabase isn't set up or returns nothing
  const products = dbProducts.length > 0 ? dbProducts : SEED_PRODUCTS.filter((p) => p.isActive);
  return <ProductsPageClient products={products} />;
}
