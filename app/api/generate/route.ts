import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("Missing OPENAI_API_KEY");
      return NextResponse.json(
        { result: "Server configuration error." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const { message, tone } = await req.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ result: "" });
    }

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
- Avoid repeating phrases
- Keep replies concise but complete
- Sound thoughtful and experienced

Tone guidance:
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

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Generate API Error:", error);
    return NextResponse.json(
      { result: "Unable to generate a reply at the moment." },
      { status: 500 }
    );
  }
}
