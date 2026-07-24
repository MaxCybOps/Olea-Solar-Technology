import type { Metadata } from "next";
import Link from "next/link";
import { Bot, MessageSquare } from "lucide-react";
import { fetchChatSessions } from "@/lib/supabase/chat";
import { truncate } from "@/lib/utils";

export const metadata: Metadata = { title: "Olea AI Agent" };
export const dynamic = "force-dynamic";

export default async function AIAgentPage() {
  const sessions = await fetchChatSessions();

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--olea-ink)", margin: 0 }}>Olea AI Agent</h1>
        <p style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>
          {sessions.length} conversation{sessions.length !== 1 ? "s" : ""} with the site's AI chat widget
        </p>
      </div>

      <div style={{ background: "rgba(26,122,74,0.06)", border: "1px solid rgba(26,122,74,0.2)", borderRadius: 10, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "var(--olea-green-800)", display: "flex", gap: 10 }}>
        <Bot size={16} style={{ flexShrink: 0, marginTop: 1 }} />
        <div>The chat widget on your site (bottom-right bubble) is powered by Claude. Every conversation is logged here automatically, nothing to configure.</div>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
        {sessions.length === 0 ? (
          <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--fg-2)" }}>
            <MessageSquare size={40} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--olea-ink)" }}>No conversations yet</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>Visitor chats with the AI widget will appear here.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--olea-green-50)", borderBottom: "1px solid var(--border-subtle)" }}>
                {["First Message", "Messages", "Last Active", ""].map((h) => (
                  <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={s.sessionId} style={{ borderBottom: i < sessions.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <td style={{ padding: "14px 16px", maxWidth: 400 }}>{truncate(s.firstUserMessage, 90)}</td>
                  <td style={{ padding: "14px 16px", color: "var(--fg-2)" }}>{s.messageCount}</td>
                  <td style={{ padding: "14px 16px", color: "var(--fg-2)", whiteSpace: "nowrap" }}>
                    {new Date(s.lastMessageAt).toLocaleString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <Link href={`/admin/ai-agent/${s.sessionId}`} style={{ fontSize: 12, fontWeight: 600, color: "var(--olea-green-700)", background: "var(--olea-green-50)", padding: "6px 12px", borderRadius: 6, textDecoration: "none" }}>
                      View transcript
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
