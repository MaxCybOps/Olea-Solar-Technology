import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import ReviewsClient from "./ReviewsClient";

interface ReviewWithProduct {
  id: string;
  product_id: string;
  customer_name: string;
  customer_email: string | null;
  rating: number;
  title: string | null;
  body: string;
  is_approved: boolean;
  is_verified: boolean;
  admin_response: string | null;
  created_at: string;
  products: { name: string } | null;
}

export const metadata: Metadata = { title: "Reviews" };
export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("*, products(name)")
    .order("created_at", { ascending: false });

  if (error) console.error("Reviews fetch error:", error);

  const reviews = (data ?? []) as ReviewWithProduct[];
  const pending  = reviews.filter((r) => !r.is_approved).length;
  const approved = reviews.filter((r) => r.is_approved).length;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Reviews</h1>
        <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>
          {reviews.length} total · <span style={{ color: "#b53030", fontWeight: 600 }}>{pending} pending approval</span> · {approved} approved
        </p>
      </div>

      {reviews.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 14, padding: "80px 20px", textAlign: "center", color: "var(--fg-2)", boxShadow: "var(--shadow-sm)" }}>
          <MessageSquare size={40} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--olea-ink)" }}>No reviews yet</p>
          <p style={{ fontSize: 13, marginTop: 6 }}>Customer reviews submitted on product pages will appear here for moderation.</p>
        </div>
      ) : (
        <ReviewsClient reviews={reviews} />
      )}
    </div>
  );
}
