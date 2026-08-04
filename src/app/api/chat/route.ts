import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase/admin";

// .trim() guards against a trailing newline/space from copy-pasting the key
// into Vercel's env var UI — that alone is enough to make it an invalid
// HTTP header value and silently break every request.
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY?.trim() });

async function logMessage(sessionId: string, role: "user" | "assistant", content: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabaseAdmin.from("chat_messages") as any).insert({ session_id: sessionId, role, content });
  } catch (err) {
    console.error("Chat log insert failed:", err);
  }
}

const SYSTEM_PROMPT = `You are Olea AI, the intelligent energy assistant for Olea Technologies — a premium African clean-energy company based in Nigeria.

Your role is to help visitors understand their energy needs, recommend the right products and systems, and guide them toward booking a free assessment or making a purchase.

## About Olea Technologies
- Clean energy infrastructure company serving homes, businesses, and industrial facilities across Nigeria
- Services: Clean Energy Infrastructure, Smart Energy Systems, Industrial Energy Solutions, Energy Consulting, Maintenance & Support, Energy Academy
- Currently serving Lagos, Abuja, Port Harcourt, Enugu, Kano and expanding across Nigeria
- Headquarters: Owerri, Imo State

## Products we sell
- Solar Panels: 450W Mono (₦95,000), 300W Poly (₦62,000)
- Inverters: 5KVA Hybrid (₦280,000), 7.5KVA Hybrid (₦520,000), 10KVA Industrial (₦980,000)
- Batteries: 200Ah Lithium LiFePO4 (₦620,000)
- Charge Controllers: MPPT 60A (₦78,000)
- Complete Systems: 3.5KVA Home System fully installed (₦1,450,000)
- Accessories: Aluminum Mounting Rail Kit (₦35,000)

## Common system sizing guidance
- 1-2 bedroom apartment: 3KVA inverter, 2-4 panels, 100Ah battery → ~₦800k–₦1.1M
- 3-4 bedroom home: 5KVA inverter, 6 panels, 200Ah battery → ~₦1.4M–₦1.8M installed
- Small business/office: 7.5KVA inverter, 8-10 panels, 2× 200Ah batteries → ~₦2.5M–₦3.5M
- Factory/industrial: 10KVA+ systems, custom quote required

## Conversation guidelines
- Be warm, knowledgeable, and concise. Max 3 sentences per reply unless asked for detail.
- Always recommend a free assessment for complex needs
- If asked about pricing, give ranges and explain it depends on load profile
- Never make up product specs — only quote what's listed above
- If asked something outside energy/Olea scope, politely redirect
- Always end with a clear next step: "Want me to help you get a free assessment?" or "Would you like to see our products?"
- Use ₦ for Nigerian Naira, not NGN
- Be proud of being African-made and designed for Nigerian conditions`;

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    // Validate message structure
    const validMessages = messages
      .filter((m: any) => m.role && m.content && typeof m.content === "string")
      .map((m: any) => ({ role: m.role as "user" | "assistant", content: m.content as string }));

    if (validMessages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const sid = typeof sessionId === "string" && sessionId ? sessionId : "unknown";
    const lastUserMessage = validMessages[validMessages.length - 1];
    if (lastUserMessage?.role === "user") {
      await logMessage(sid, "user", lastUserMessage.content);
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("Chat API error: ANTHROPIC_API_KEY is not set");
      return NextResponse.json({ error: "AI chat is not configured on the server yet." }, { status: 503 });
    }

    // Return a readable stream to the client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let assistantText = "";
        try {
          const stream = await client.messages.stream({
            model: "claude-sonnet-5",
            max_tokens: 400,
            system: SYSTEM_PROMPT,
            messages: validMessages,
          });

          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              assistantText += chunk.delta.text;
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } catch (err) {
          console.error("Chat stream error:", err);
          if (!assistantText) {
            // TEMP DEBUG — safe: type/status only, never the raw message.
            let safeDetail = err instanceof Error ? err.constructor.name : "unknown error";
            if (err instanceof Anthropic.APIError) {
              safeDetail = `${err.constructor.name} status=${err.status} type=${err.type ?? "n/a"}`;
            }
            const fallback = `[DEBUG] ${safeDetail}`;
            controller.enqueue(encoder.encode(fallback));
            assistantText = fallback;
          }
        } finally {
          controller.close();
          if (assistantText) await logMessage(sid, "assistant", assistantText);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
