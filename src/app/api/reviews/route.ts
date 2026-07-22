import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";

const reviewSchema = z.object({
  productId:     z.string().min(1),
  customerName:  z.string().min(2).max(120),
  customerEmail: z.string().email().max(255).optional().or(z.literal("")),
  rating:        z.number().int().min(1).max(5),
  title:         z.string().max(150).optional(),
  body:          z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = reviewSchema.parse(json);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabaseAdmin.from("reviews") as any).insert({
      product_id: data.productId,
      customer_name: data.customerName,
      customer_email: data.customerEmail || null,
      rating: data.rating,
      title: data.title || null,
      body: data.body,
      is_approved: false,
      is_verified: false,
    });

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 });
    }
    console.error("Review POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
