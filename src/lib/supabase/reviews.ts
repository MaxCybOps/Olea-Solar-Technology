import { supabaseAdmin } from "./admin";
import type { ReviewRow } from "@/types/database";

export async function fetchApprovedReviews(productId: string): Promise<ReviewRow[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as unknown as ReviewRow[];
  } catch {
    return [];
  }
}
