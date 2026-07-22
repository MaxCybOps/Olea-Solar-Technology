import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";

  // Paystack has no separate webhook-signing secret — signatures are verified
  // with the same secret key used for API calls (unlike Stripe's model).
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY ?? "")
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
      const { data: order } = await supabaseAdmin
        .from("orders")
        .select("id, payment_status")
        .eq("payment_reference", reference)
        .maybeSingle();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const row = order as any;
      if (row && row.payment_status !== "paid") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabaseAdmin.from("orders") as any)
          .update({ payment_status: "paid", status: "confirmed" })
          .eq("id", row.id);
      }
    } catch (err) {
      console.error("Webhook handler error:", err);
    }
  }

  return NextResponse.json({ received: true });
}
