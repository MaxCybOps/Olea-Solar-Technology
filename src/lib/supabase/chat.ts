import { supabaseAdmin } from "./admin";
import type { ChatMessageRow } from "@/types/database";

export interface ChatSessionSummary {
  sessionId: string;
  messageCount: number;
  firstUserMessage: string;
  lastMessageAt: string;
}

export async function fetchChatSessions(): Promise<ChatSessionSummary[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data) return [];
    const rows = data as unknown as ChatMessageRow[];

    const bySession = new Map<string, ChatMessageRow[]>();
    for (const row of rows) {
      const list = bySession.get(row.session_id) ?? [];
      list.push(row);
      bySession.set(row.session_id, list);
    }

    return Array.from(bySession.entries())
      .map(([sessionId, msgs]) => ({
        sessionId,
        messageCount: msgs.length,
        firstUserMessage: msgs.find((m) => m.role === "user")?.content ?? "(no message)",
        lastMessageAt: msgs[msgs.length - 1].created_at,
      }))
      .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
  } catch {
    return [];
  }
}

export async function fetchSessionMessages(sessionId: string): Promise<ChatMessageRow[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (error || !data) return [];
    return data as unknown as ChatMessageRow[];
  } catch {
    return [];
  }
}
