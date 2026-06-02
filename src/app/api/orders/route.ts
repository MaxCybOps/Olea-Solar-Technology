import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateOrderRef } from "@/lib/utils";

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

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        deliveryAddress: data.deliveryAddress,
        subtotal,
        deliveryFee,
        total,
        status: "PENDING",
        paymentStatus: "PENDING",
        notes: data.notes,
        items: {
          create: data.items.map((i) => ({
            productId: i.productId,
            productName: i.productName,
            productPrice: i.productPrice,
            quantity: i.quantity,
            subtotal: i.productPrice * i.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, orderId: order.id, orderNumber: order.orderNumber, total: order.total }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 });
    }
    console.error("Order POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
