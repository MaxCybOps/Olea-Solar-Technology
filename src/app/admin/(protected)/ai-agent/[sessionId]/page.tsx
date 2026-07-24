import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bot, User } from "lucide-react";
import { fetchSessionMessages } from "@/lib/supabase/chat";

export const dynamic = "force-dynamic";

export default async function ChatTranscriptPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const messages = await fetchSessionMessages(sessionId);
  if (messages.length === 0) notFound();

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <Link href="/admin/ai-agent" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--olea-green-700)", textDecoration: "none", marginBottom: 20 }}>
        <ArrowLeft size={14} /> All conversations
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--olea-ink)", margin: "0 0 24px" }}>Conversation Transcript</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 680 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
            <div style={{ width: 30, height: 30, borderRadius: 9999, background: m.role === "user" ? "var(--olea-green-700)" : "var(--olea-green-50)", color: m.role === "user" ? "#fff" : "var(--olea-green-700)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div style={{ maxWidth: "78%", background: m.role === "user" ? "var(--olea-green-700)" : "#fff", color: m.role === "user" ? "#fff" : "var(--olea-ink)", padding: "12px 16px", borderRadius: 14, fontSize: 14, lineHeight: 1.55, boxShadow: m.role === "user" ? "none" : "var(--shadow-sm)" }}>
              {m.content}
              <div style={{ fontSize: 10.5, opacity: 0.6, marginTop: 6 }}>
                {new Date(m.created_at).toLocaleString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
