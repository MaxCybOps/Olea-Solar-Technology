import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import ProductForm from "../ProductForm";
import type { ProductRow } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from("products").select("*").eq("id", id).single();
  if (error || !data) notFound();
  return <ProductForm mode="edit" product={data as ProductRow} />;
}
