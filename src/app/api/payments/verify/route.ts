import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  const orderId = searchParams.get("orderId");

  if (!reference || !orderId) {
    return NextResponse.json({ error: "Missing reference or orderId" }, { status: 400 });
  }

  try {
    // Verify with Paystack
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });

    const paystack = await paystackRes.json();

    if (!paystackRes.ok || paystack.data?.status !== "success") {
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: "FAILED" },
      });
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }

    // Confirm amount matches
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const paidKobo = paystack.data.amount; // Paystack amount is in kobo
    const expectedKobo = Number(order.total) * 100;

    if (paidKobo < expectedKobo) {
      return NextResponse.json({ success: false, message: "Amount mismatch" }, { status: 400 });
    }

    // Mark paid
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "PAID",
        status: "PAID",
        paymentReference: reference,
      },
    });

    return NextResponse.json({ success: true, orderNumber: order.orderNumber });
  } catch (err) {
    console.error("Payment verify error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
