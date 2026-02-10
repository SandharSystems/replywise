import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="max-w-5xl w-full">

        <h1 className="text-3xl font-semibold text-center mb-2">
          Simple, transparent pricing
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Start free. Upgrade only when it saves you real time.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {/* FREE */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-1">Free</h2>
            <p className="text-gray-500 mb-4">Try ReplyWise risk-free</p>
            <p className="text-3xl font-bold mb-4">$0</p>

            <ul className="text-sm space-y-2 mb-6">
              <li>✓ 5 replies per day</li>
              <li>✓ Professional tone</li>
              <li>✓ Human-quality replies</li>
              <li className="text-gray-400">✕ Voice replies</li>
              <li className="text-gray-400">✕ WhatsApp auto-reply</li>
            </ul>

            <Link
              href="/"
              className="block text-center border py-2 rounded-lg"
            >
              Continue Free
            </Link>
          </div>

          {/* PRO */}
          <div className="bg-white rounded-xl border p-6 relative">
            <span className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
              Most Popular
            </span>

            <h2 className="text-xl font-semibold mb-1">Pro</h2>
            <p className="text-gray-500 mb-4">For daily business communication</p>
            <p className="text-3xl font-bold mb-4">$19</p>

            <ul className="text-sm space-y-2 mb-6">
              <li>✓ Unlimited replies</li>
              <li>✓ All tones</li>
              <li>✓ Voice replies (MP3)</li>
              <li>✓ WhatsApp-ready formatting</li>
              <li>✓ Priority generation</li>
            </ul>

            <a
              href="mailto:support@replywise.ai"
              className="block w-full bg-black text-white text-center py-3 rounded-lg"
            >
              Upgrade to Pro
            </a>
            <p className="text-xs text-gray-500 text-center mt-2">
              Early access · Limited slots
            </p>
          </div>

          {/* BUSINESS */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-1">Business</h2>
            <p className="text-gray-500 mb-4">For teams & high-volume support</p>
            <p className="text-3xl font-bold mb-4">From $89+</p>

            <ul className="text-sm space-y-2 mb-6">
              <li>✓ Everything in Pro</li>
              <li>✓ Multiple WhatsApp numbers</li>
              <li>✓ Brand voice memory</li>
              <li>✓ Auto-reply mode</li>
              <li>✓ Team access</li>
            </ul>

            <a
              href="mailto:sales@replywise.ai"
              className="block w-full border text-center py-3 rounded-lg"
            >
              Talk to Sales
            </a>
            <p className="text-xs text-gray-500 text-center mt-2">
              Custom plans · Priority onboarding
            </p>
          </div>

        </div>

        <p className="text-xs text-gray-400 text-center mt-10">
          Secure · No data stored · GDPR-friendly · Business-safe
        </p>
      </div>
    </main>
  );
}
