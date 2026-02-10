"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("professional");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [remaining, setRemaining] = useState(5);

  const generateReply = async () => {
    if (!input.trim() || remaining <= 0) return;

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          tone,
          voice: voiceEnabled,
        }),
      });

      const data = await res.json();
      setOutput(data.result || "No reply generated.");
      setInput("");
      setRemaining((r) => r - 1);
    } catch (e) {
      setOutput("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Image
            src="/replywise-logo.svg"
            alt="ReplyWise"
            width={42}
            height={42}
            priority
          />
          <h1 className="text-2xl font-semibold">ReplyWise</h1>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-500 mb-4">
          Human-quality replies for modern business communication
        </p>

        {/* Plan info */}
        <p className="text-sm text-gray-600">
          Free plan — <strong>{remaining} replies remaining today</strong>
          <span className="text-gray-400"> · Usage resets daily</span>
        </p>

        {/* Links */}
        <div className="mt-1 mb-6 space-y-1">
          <Link
            href="/pricing"
            className="block text-sm text-gray-500 hover:underline"
          >
            View pricing
          </Link>
          <Link
            href="/whatsapp"
            className="block text-sm text-gray-500 hover:underline"
          >
            WhatsApp auto-reply
          </Link>
        </div>

        {/* Tone */}
        <label className="block text-sm font-medium mb-1">Reply Tone</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
        >
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="sales">Sales</option>
          <option value="urgent">Urgent</option>
          <option disabled>Brand Voice (Business)</option>
        </select>

        {/* Message */}
        <label className="block text-sm font-medium mb-1">
          Customer Message
        </label>
        <textarea
          rows={5}
          placeholder="Paste the customer’s message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-md p-3 mb-4"
        />

        {/* Voice */}
        <label className="flex items-start gap-2 text-sm mb-6">
          <input
            type="checkbox"
            checked={voiceEnabled}
            onChange={(e) => setVoiceEnabled(e.target.checked)}
            className="mt-1"
          />
          <span>
            Generate voice reply (optional)
            <br />
            <span className="text-gray-500">
              Ideal for WhatsApp & voice-first customers
            </span>
          </span>
        </label>

        {/* Button */}
        <button
          onClick={generateReply}
          disabled={loading || remaining <= 0}
          className="w-full bg-black text-white py-3 rounded-lg mb-6 disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate Reply"}
        </button>

        {/* Output */}
        {output && (
          <div className="border rounded-lg p-4 mb-6">
            <strong className="block mb-2">ReplyWise</strong>
            <p className="whitespace-pre-line text-sm">{output}</p>
          </div>
        )}

        {/* Business placeholders */}
        <div className="space-y-4 mb-6">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-1">
              <strong>Saved replies</strong>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                Business
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Save and reuse high-performing replies across your team.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Coming soon · Business plan
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-1">
              <strong>Team access</strong>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                Business
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Collaborate with your team and manage shared communication.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Coming soon · Business plan
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <strong>Usage insights</strong>
            <p className="text-sm text-gray-500">
              Track reply volume, response efficiency, and engagement.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Lightweight analytics coming soon
            </p>
          </div>
        </div>

        {/* Trust */}
        <p className="text-xs text-gray-400 text-center">
          Secure · No data stored · GDPR-friendly · Business-safe
        </p>
      </div>
    </main>
  );
}
