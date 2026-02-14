"use client";

import { useState } from "react";
import Link from "next/link";

export default function WhatsAppPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleJoin = () => {
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Temporary frontend-only success
    setMessage("You're on the early access list. We'll notify you soon.");
    setEmail("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-2xl font-semibold mb-2">
          WhatsApp Auto-Reply
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Connect ReplyWise with your WhatsApp Business to send instant,
          human-quality replies — text and voice.
        </p>

        {/* Features */}
        <div className="border rounded-lg p-4 mb-6 text-sm space-y-2">
          <p>✅ Auto text replies to incoming messages</p>
          <p>✅ Optional voice replies (MP3)</p>
          <p>✅ Professional, friendly, or sales tone</p>
          <p>✅ WhatsApp-ready formatting</p>
          <p>✅ Brand-safe, business-friendly responses</p>
        </div>

        {/* Business notice */}
        <div className="border rounded-lg p-4 mb-6 text-sm">
          <strong>🔒 Available on Business plan</strong>
          <p className="text-gray-500 mt-1">
            Early users get priority access.
          </p>
        </div>

        {/* Join */}
        <label className="block text-sm font-medium mb-2">
          Join WhatsApp early access
        </label>

        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md p-3 mb-4"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-black text-white py-3 rounded-lg mb-2"
        >
          Join waitlist
        </button>

        {message && (
          <p className="text-sm text-center text-gray-600 mb-4">
            {message}
          </p>
        )}

        <p className="text-xs text-center text-gray-400 mb-6">
          No spam · Priority onboarding
        </p>

        {/* Bottom buttons */}
        <div className="flex gap-4">
          <Link
            href="/pricing"
            className="flex-1 bg-black text-white text-center py-3 rounded-lg"
          >
            View Business Pricing
          </Link>

          <a
            href="mailto:sales@replywise.ai"
            className="flex-1 border text-center py-3 rounded-lg"
          >
            Talk to Sales
          </a>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          Secure · No data stored · GDPR-friendly · Business-safe
        </p>
      </div>
    </main>
  );
}
