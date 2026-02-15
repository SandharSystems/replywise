import { NextResponse } from "next/server";
import OpenAI from "openai";
import { redis } from "@/lib/redis";

export const runtime = "nodejs";

const FREE_LIMIT = 5;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const { message, tone } = await req.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ result: "" });
    }

    // ===============================
    // 1️⃣ Identify user (IP-based)
    // ===============================

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    const today = new Date().toISOString().split("T")[0];
    const redisKey = `usage:${ip}:${today}`;

    // ===============================
    // 2️⃣ Check current usage
    // ===============================

    const currentUsage = (await redis.get<number>(redisKey)) || 0;

    if (currentUsage >= FREE_LIMIT) {
      return NextResponse.json(
        {
          error: "LIMIT_REACHED",
          upgradeRequired: true,
        },
        { status: 403 }
      );
    }

    // ===============================
    // 3️⃣ Generate AI reply
    // ===============================

    const toneMap: Record<string, string> = {
      professional:
        "Write a calm, respectful, business-ready reply. Sound experienced and composed.",
      friendly:
        "Write a warm, polite reply that feels natural and approachable.",
      sales:
        "Write a confident, persuasive reply without pressure or hype.",
      urgent:
        "Write a clear, time-sensitive reply that feels responsible, not alarming.",
    };

    const systemPrompt = `
You are a professional business communicator.

Rules:
- Never mention AI
- Avoid repetition
- Keep it concise
- Sound experienced
- Human tone only

Tone:
${toneMap[tone] || toneMap.professional}
    `.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 200,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const result =
      completion.choices?.[0]?.message?.content?.trim() || "";

    // ===============================
    // 4️⃣ Increment usage
    // ===============================

    await redis.set(redisKey, currentUsage + 1, {
      ex: 60 * 60 * 24, // 24 hours expiry
    });

    return NextResponse.json({
      result,
      remaining: FREE_LIMIT - (currentUsage + 1),
    });
  } catch (error) {
    console.error("Generate API Error:", error);
    return NextResponse.json(
      { error: "Unable to generate reply." },
      { status: 500 }
    );
  }
}
