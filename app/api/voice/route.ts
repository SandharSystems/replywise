import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "No text provided" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Initialize OpenAI at runtime (NOT build time)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await speech.arrayBuffer());
    const fileName = `reply-${Date.now()}-${crypto.randomUUID()}.mp3`;

    const dir = path.join(process.cwd(), "public", "voice");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      audioUrl: `/voice/${fileName}`,
    });
  } catch (err) {
    console.error("Voice API error:", err);

    return NextResponse.json(
      { error: "Voice generation failed" },
      { status: 500 }
    );
  }
}
