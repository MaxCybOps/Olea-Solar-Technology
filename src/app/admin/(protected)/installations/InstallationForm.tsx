"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import type { InstallationRow } from "@/types/database";

interface Props {
  installation?: InstallationRow;
  mode: "create" | "edit";
}

export default function InstallationForm({ installation, mode }: Props) {
  const router = useRouter();

  const [customerName, setCustomerName]   = useState(installation?.customer_name ?? "");
  const [customerPhone, setCustomerPhone] = useState(installation?.customer_phone ?? "");
  const [address, setAddress]             = useState(installation?.address ?? "");
  const [scheduledDate, setScheduledDate] = useState(installation?.scheduled_date ?? "");
  const [technicianName, setTechnicianName] = useState(installation?.technician_name ?? "");
  const [status, setStatus]               = useState(installation?.status ?? "scheduled");
  const [notes, setNotes]                 = useState(installation?.notes ?? "");

  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError]       = useState("");

  async function handleSave() {
    if (!customerName.trim() || !address.trim()) { setError("Customer name and address are required."); return; }
    setSaving(true);
    setError("");

    const payload = {
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim() || null,
      address: address.trim(),
      scheduled_date: scheduledDate || null,
      technician_name: technicianName.trim() || null,
      status,
      notes: notes.trim() || null,
      order_id: installation?.order_id ?? null,
    };

    if (mode === "create") {
      const res = await fetch("/api/admin/installations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Failed to create installation"); setSaving(false); return; }
    } else {
      const res = await fetch(`/api/admin/installations/${installation!.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Failed to update installation"); setSaving(false); return; }
    }

    router.push("/admin/installations");
    router.refresh();
  }

  async function handleDelete() {
    if (!installation) return;
    if (!confirm(`Delete installation for "${installation.customer_name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await fetch(`/api/admin/installations/${installation.id}`, { method: "DELETE" });
    router.push("/admin/installations");
    router.refresh();
  }

  const inputStyle: React.CSSProperties = { width: "100%", padding: "11px 14px", border: "1.5px solid var(--border-subtle)", borderRadius: 10, fontSize: 14, fontFamily: "var(--font-sans)", color: "var(--olea-ink)", outline: "none", background: "#fff", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 6 };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--olea-ink)", margin: 0 }}>
          {mode === "create" ? "Schedule Installation" : `Edit: ${installation?.customer_name}`}
        </h1>
        <div style={{ display: "flex", gap: 10 }}>
          {mode === "edit" && (
            <button onClick={handleDelete} disabled={deleting} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10, border: "1.5px solid #e53e3e", background: "#fff", color: "#e53e3e", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
              <Trash2 size={14} /> {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
          <button onClick={handleSave} disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10, border: "none", background: saving ? "var(--olea-gray-200)" : "var(--olea-green-900)", color: saving ? "var(--fg-2)" : "#fff", fontWeight: 700, fontSize: 14, cursor: saving ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)" }}>
            {saving && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
            {saving ? "Saving…" : mode === "create" ? "Schedule" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: "rgba(229,62,62,0.08)", border: "1px solid rgba(229,62,62,0.25)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#c53030" }}>
          {error}
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)", maxWidth: 640, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Customer Name *</label>
            <input style={inputStyle} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Customer Phone</label>
            <input style={inputStyle} value={customerPhone ?? ""} onChange={(e) => setCustomerPhone(e.target.value)} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Installation Address *</label>
          <textarea style={{ ...inputStyle, height: 70, resize: "vertical" } as React.CSSProperties} value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Scheduled Date</label>
            <input type="date" style={inputStyle} value={scheduledDate ?? ""} onChange={(e) => setScheduledDate(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Technician</label>
            <input style={inputStyle} value={technicianName ?? ""} onChange={(e) => setTechnicianName(e.target.value)} placeholder="Assign a technician" />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Status</label>
          <select style={inputStyle} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Notes</label>
          <textarea style={{ ...inputStyle, height: 90, resize: "vertical" } as React.CSSProperties} value={notes ?? ""} onChange={(e) => setNotes(e.target.value)} placeholder="Access instructions, equipment needed, special requirements…" />
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
