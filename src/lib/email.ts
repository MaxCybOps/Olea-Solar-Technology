import { Resend } from "resend";

// Lazy client: RESEND_API_KEY may not be set (locally or if not yet added to
// Vercel) — every function below no-ops instead of throwing when it's missing,
// so email is optional infrastructure, not a hard dependency of checkout/leads.
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const FROM = "Olea Technologies <onboarding@resend.dev>";

function wrap(title: string, bodyHtml: string): string {
  return `
    <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
      <div style="background: #07291f; color: #fff; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <div style="font-weight: 700; font-size: 18px;">Olea Technologies</div>
      </div>
      <div style="background: #fff; border: 1px solid #e8e8e4; border-top: none; border-radius: 0 0 12px 12px; padding: 28px 24px;">
        <h1 style="font-size: 19px; margin: 0 0 16px; color: #07291f;">${title}</h1>
        ${bodyHtml}
      </div>
      <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">Olea Technologies · Owerri, Nigeria</p>
    </div>
  `;
}

function fmtNaira(n: number): string {
  return "₦" + n.toLocaleString("en-NG");
}

export async function sendOrderConfirmation(params: {
  to: string;
  customerName: string;
  orderNumber: string;
  total: number;
  items: { productName: string; quantity: number; unitPrice: number }[];
}) {
  const resend = getResend();
  if (!resend) return;

  const rows = params.items.map((i) =>
    `<tr><td style="padding:8px 0;color:#333;">${i.productName} × ${i.quantity}</td><td style="padding:8px 0;text-align:right;color:#333;">${fmtNaira(i.unitPrice * i.quantity)}</td></tr>`
  ).join("");

  const html = wrap(`Order ${params.orderNumber} confirmed`, `
    <p style="color:#555;font-size:14px;line-height:1.6;">Hi ${params.customerName}, thanks for your order. We're getting it ready.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;border-top:1px solid #eee;padding-top:12px;">${rows}</table>
    <div style="border-top:2px solid #07291f;padding-top:10px;text-align:right;font-weight:700;color:#07291f;">Total: ${fmtNaira(params.total)}</div>
  `);

  try {
    await resend.emails.send({ from: FROM, to: params.to, subject: `Order ${params.orderNumber} confirmed`, html });
  } catch (err) {
    console.error("sendOrderConfirmation failed:", err);
  }
}

export async function sendAdminOrderAlert(params: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
}) {
  const resend = getResend();
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!resend || !adminEmail) return;

  const html = wrap("New order placed", `
    <p style="color:#555;font-size:14px;line-height:1.6;">
      <strong>${params.orderNumber}</strong> from ${params.customerName} (${params.customerEmail})<br/>
      Total: <strong>${fmtNaira(params.total)}</strong>
    </p>
  `);

  try {
    await resend.emails.send({ from: FROM, to: adminEmail, subject: `New order: ${params.orderNumber}`, html });
  } catch (err) {
    console.error("sendAdminOrderAlert failed:", err);
  }
}

export async function sendAdminLeadAlert(params: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}) {
  const resend = getResend();
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!resend || !adminEmail) return;

  const html = wrap("New inquiry received", `
    <p style="color:#555;font-size:14px;line-height:1.6;">
      <strong>${params.name}</strong> (${params.email}${params.phone ? `, ${params.phone}` : ""})<br/><br/>
      "${params.message}"
    </p>
  `);

  try {
    await resend.emails.send({ from: FROM, to: adminEmail, subject: `New inquiry from ${params.name}`, html });
  } catch (err) {
    console.error("sendAdminLeadAlert failed:", err);
  }
}
