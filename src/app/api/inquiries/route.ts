import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  location: z.string().max(255).optional(),
  interest: z.string().max(100).optional(),
  message: z.string().min(10).max(5000),
  referral: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = inquirySchema.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        interest: data.interest,
        message: data.message,
        referralSource: data.referral,
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 });
    }
    console.error("Inquiry POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
