"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Bot, ArrowUp, Loader2, Maximize2, Minimize2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Size my home system",
  "What's a 5KVA inverter cost?",
  "Talk to an engineer",
  "Do you serve my area?",
];

const WELCOME: Message = {
  role: "assistant",
  content: "Hi! I'm Olea AI. Tell me about your power needs and I'll guide you to the right system.",
};

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem("olea_chat_session");
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem("olea_chat_session", id);
  }
  return id;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");

    const userMessage: Message = { role: "user", content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          sessionId: sessionIdRef.current,
        }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      // Stream the response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantText };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I had trouble connecting. Please try again or contact us directly." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showSuggestions = messages.length <= 2 && !loading;

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open AI chat assistant"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 90,
          width: 60,
          height: 60,
          borderRadius: 9999,
          background: "var(--brand)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-xl)",
          transition: "transform 250ms cubic-bezier(0.34,1.56,0.64,1)",
          transform: open ? "scale(0.92)" : "scale(1)",
        }}
      >
        {!open && (
          <span style={{ position: "absolute", inset: -8, borderRadius: 9999, border: "2px solid rgba(11,61,46,0.4)", animation: "oleaPulse 2.5s infinite", pointerEvents: "none" }} />
        )}
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window — visibility:hidden when closed prevents GPU white-box artifact */}
      <div
        style={{
          position: "fixed",
          bottom: 96,
          right: 24,
          zIndex: 95,
          width: maximized ? "min(760px, calc(100vw - 32px))" : "min(360px, calc(100vw - 32px))",
          height: maximized ? "min(760px, calc(100vh - 120px))" : 480,
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          display: "flex",
          flexDirection: "column",
          transformOrigin: "bottom right",
          transform: open ? "scale(1) translateY(0)" : "scale(0.88) translateY(16px)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          transition: "transform 280ms cubic-bezier(0.22,1,0.36,1), opacity 220ms ease, visibility 0ms linear 220ms, width 260ms cubic-bezier(0.22,1,0.36,1), height 260ms cubic-bezier(0.22,1,0.36,1)",
        }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div style={{ background: "var(--brand)", color: "#fff", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9999, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bot size={20} style={{ color: "var(--accent)" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Olea AI Assistant</div>
            <div style={{ fontSize: 11, opacity: 0.75, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, background: "#5fc88e", borderRadius: 9999, display: "inline-block" }} />
              Online · replies instantly
            </div>
          </div>
          <button
            onClick={() => setMaximized((m) => !m)}
            aria-label={maximized ? "Shrink chat window" : "Expand chat window"}
            title={maximized ? "Shrink" : "Expand"}
            style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", opacity: 0.7, padding: 4, display: "flex" }}
          >
            {maximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button onClick={() => { setOpen(false); setMaximized(false); }} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", opacity: 0.7, padding: 4, display: "flex" }}>
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div ref={bodyRef} style={{ flex: 1, padding: "14px 14px 8px", background: "var(--bg-page)", overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                maxWidth: "82%",
                padding: "10px 14px",
                borderRadius: 14,
                fontSize: 13.5,
                lineHeight: 1.5,
                background: m.role === "user" ? "var(--brand)" : "#fff",
                color: m.role === "user" ? "#fff" : "var(--olea-ink)",
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                borderBottomLeftRadius: m.role === "user" ? 14 : 4,
                borderBottomRightRadius: m.role === "user" ? 4 : 14,
                boxShadow: m.role === "user" ? "none" : "var(--shadow-sm)",
                wordBreak: "break-word",
              }}
            >
              {m.content || (loading && i === messages.length - 1 ? (
                <span style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.7 }}>
                  <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> Thinking…
                </span>
              ) : "")}
            </div>
          ))}

          {/* Typing indicator when loading and no streaming yet */}
          {loading && messages[messages.length - 1]?.role !== "assistant" && (
            <div style={{ alignSelf: "flex-start", background: "#fff", borderRadius: 14, borderBottomLeftRadius: 4, padding: "12px 16px", boxShadow: "var(--shadow-sm)" }}>
              <span style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} style={{ width: 7, height: 7, borderRadius: 9999, background: "var(--olea-green-600)", animation: `bounce 1.2s ${d * 0.2}s infinite` }} />
                ))}
              </span>
            </div>
          )}
        </div>

        {/* Suggestion chips */}
        {showSuggestions && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "6px 14px 4px", background: "var(--bg-page)" }}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                style={{ fontSize: 11.5, padding: "5px 11px", borderRadius: 9999, background: "#fff", border: "1px solid var(--border-subtle)", color: "var(--brand)", cursor: "pointer", fontFamily: "var(--font-sans)", transition: "var(--t-fast)" }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          style={{ display: "flex", gap: 8, padding: "10px 12px", background: "#fff", borderTop: "1px solid var(--border-subtle)", flexShrink: 0 }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message…"
            disabled={loading}
            style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: "var(--font-sans)", background: "transparent", color: "var(--olea-ink)" }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{ width: 34, height: 34, borderRadius: 9999, background: loading || !input.trim() ? "var(--olea-gray-200)" : "var(--accent)", color: "var(--olea-ink)", border: "none", cursor: loading || !input.trim() ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--t-base)", flexShrink: 0 }}
          >
            <ArrowUp size={15} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes oleaPulse {
          0%   { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-5px); }
        }
        @media (max-width: 420px) {
          .olea-chat-win { width: calc(100vw - 24px) !important; right: 12px !important; }
        }
      `}</style>
    </>
  );
}
