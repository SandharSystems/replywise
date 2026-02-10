import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await speech.arrayBuffer());
    const fileName = `reply-${Date.now()}-${crypto.randomUUID()}.mp3`;

    const dir = path.join(process.cwd(), "public", "voice");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      audioUrl: `/voice/${fileName}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Voice generation failed" },
      { status: 500 }
    );
  }
}
