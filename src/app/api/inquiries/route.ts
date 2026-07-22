import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendAdminLeadAlert } from "@/lib/email";

const inquirySchema = z.object({
  name:     z.string().min(2).max(255),
  email:    z.string().email().max(255),
  phone:    z.string().max(20).optional(),
  location: z.string().max(255).optional(),
  interest: z.string().max(100).optional(),
  message:  z.string().min(10).max(5000),
  referral: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = inquirySchema.parse(body);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: lead, error } = await (supabaseAdmin.from("leads") as any)
      .insert({
        name:    data.name,
        email:   data.email,
        phone:   data.phone   ?? null,
        message: data.message,
        type:    data.interest ?? "general",
        status:  "new",
      })
      .select()
      .single();

    if (error) throw error;

    await sendAdminLeadAlert({ name: data.name, email: data.email, phone: data.phone, message: data.message });

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 });
    }
    console.error("Inquiry POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
