import { supabaseAdmin } from "./admin";

// Format: OLE-2026-0142. Count-based sequencing is good enough at this
// business's order volume; a rare double-booked number under simultaneous
// checkouts is a cosmetic issue, not a data-integrity one (order_number
// isn't used as a lookup key anywhere critical).
export async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  try {
    const { count } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true });
    const next = (count ?? 0) + 1;
    return `OLE-${year}-${String(next).padStart(4, "0")}`;
  } catch {
    return `OLE-${year}-${Date.now().toString().slice(-4)}`;
  }
}
