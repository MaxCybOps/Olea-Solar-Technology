import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";

  // Validate webhook signature
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_WEBHOOK_SECRET ?? "")
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const reference = event.data?.reference as string | undefined;
    if (!reference) return NextResponse.json({ received: true });

    try {
      const order = await prisma.order.findFirst({ where: { paymentReference: reference } });
      if (order && order.paymentStatus !== "PAID") {
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "PAID", status: "PAID" },
        });
      }
    } catch (err) {
      console.error("Webhook handler error:", err);
    }
  }

  return NextResponse.json({ received: true });
}
