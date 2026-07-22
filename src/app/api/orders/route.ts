import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { generateOrderRef } from "@/lib/utils";
import { sendOrderConfirmation, sendAdminOrderAlert } from "@/lib/email";

const orderSchema = z.object({
  customerName: z.string().min(2).max(255),
  customerEmail: z.string().email().max(255),
  customerPhone: z.string().min(7).max(20),
  deliveryAddress: z.object({
    street: z.string().min(3).max(500),
    city: z.string().min(2).max(100),
    state: z.string().min(2).max(100),
    postalCode: z.string().max(20).optional(),
  }),
  items: z.array(z.object({
    productId: z.string(),
    productName: z.string(),
    productPrice: z.number().positive(),
    quantity: z.number().int().positive(),
  })).min(1),
  notes: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    const subtotal = data.items.reduce((sum, i) => sum + i.productPrice * i.quantity, 0);
    const deliveryFee = 15000;
    const total = subtotal + deliveryFee;
    const orderNumber = generateOrderRef();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: order, error: orderErr } = await (supabaseAdmin.from("orders") as any)
      .insert({
        order_number: orderNumber,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        shipping_address: data.deliveryAddress,
        subtotal,
        shipping_fee: deliveryFee,
        total,
        status: "pending",
        payment_status: "pending",
        notes: data.notes ?? null,
      })
      .select()
      .single();

    if (orderErr) throw orderErr;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: itemsErr } = await (supabaseAdmin.from("order_items") as any).insert(
      data.items.map((i) => ({
        order_id: order.id,
        product_id: i.productId,
        product_name: i.productName,
        unit_price: i.productPrice,
        quantity: i.quantity,
        total_price: i.productPrice * i.quantity,
      }))
    );

    if (itemsErr) throw itemsErr;

    await Promise.all([
      sendOrderConfirmation({
        to: data.customerEmail,
        customerName: data.customerName,
        orderNumber: order.order_number,
        total: order.total,
        items: data.items.map((i) => ({ productName: i.productName, quantity: i.quantity, unitPrice: i.productPrice })),
      }),
      sendAdminOrderAlert({
        orderNumber: order.order_number,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        total: order.total,
      }),
    ]);

    return NextResponse.json(
      { success: true, orderId: order.id, orderNumber: order.order_number, total: order.total },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 });
    }
    console.error("Order POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
