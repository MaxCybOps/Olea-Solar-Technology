import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  const orderId   = searchParams.get("orderId");

  if (!reference || !orderId) {
    return NextResponse.json({ error: "Missing reference or orderId" }, { status: 400 });
  }

  try {
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const paystack = await paystackRes.json();

    if (!paystackRes.ok || paystack.data?.status !== "success") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabaseAdmin.from("orders") as any).update({ payment_status: "failed" }).eq("id", orderId);
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }

    const { data: order } = await supabaseAdmin.from("orders").select("total, order_number").eq("id", orderId).maybeSingle();
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const row = order as any;
    const paidKobo     = paystack.data.amount;
    const expectedKobo = Number(row.total) * 100;

    if (paidKobo < expectedKobo) {
      return NextResponse.json({ success: false, message: "Amount mismatch" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabaseAdmin.from("orders") as any)
      .update({ payment_status: "paid", status: "confirmed", payment_reference: reference })
      .eq("id", orderId);

    return NextResponse.json({ success: true, orderNumber: row.order_number });
  } catch (err) {
    console.error("Payment verify error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
