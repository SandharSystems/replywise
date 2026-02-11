import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message, tone } = await req.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ result: "" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { result: "Service configuration error." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

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

Rules you MUST follow:
- Never mention AI, models, or automation
- Vary sentence length naturally
- Avoid repeating phrases or structures
- Use polite business fillers where appropriate
- Sound human, thoughtful, and experienced
- Keep replies concise but complete
- Close naturally (no forced endings)

Tone guidance:
${toneMap[tone] || toneMap.professional}
    `.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 180,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const result =
      completion.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { result: "Unable to generate a reply at the moment." },
      { status: 500 }
    );
  }
}
