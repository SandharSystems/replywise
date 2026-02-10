import Link from "next/link";

export default function WhatsAppPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8">

        <h1 className="text-2xl font-semibold mb-2">WhatsApp Auto-Reply</h1>
        <p className="text-gray-500 mb-6">
          Connect ReplyWise with your WhatsApp Business to send instant,
          human-quality replies — text and voice.
        </p>

        <ul className="border rounded-lg p-4 mb-4 text-sm space-y-2">
          <li>✅ Auto text replies to incoming messages</li>
          <li>✅ Optional voice replies (MP3)</li>
          <li>✅ Professional, friendly, or sales tone</li>
          <li>✅ WhatsApp-ready formatting</li>
          <li>✅ Brand-safe, business-friendly responses</li>
        </ul>

        <div className="border rounded-lg p-4 mb-6 bg-gray-50 text-sm">
          🔒 <strong>Available on Business plan</strong>
          <p className="text-gray-500 mt-1">
            Early users get priority access.
          </p>
        </div>

        <label className="block text-sm font-medium mb-1">
          Join WhatsApp early access
        </label>
        <input
          type="email"
          placeholder="you@company.com"
          className="w-full border rounded-md p-2 mb-4"
        />

        <button className="w-full bg-black text-white py-3 rounded-lg mb-4">
          Join waitlist
        </button>

        <p className="text-xs text-gray-500 text-center mb-6">
          No spam · Priority onboarding
        </p>

        <div className="flex gap-3">
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

        <p className="text-xs text-gray-400 text-center mt-8">
          Secure · No data stored · GDPR-friendly · Business-safe
        </p>
      </div>
    </main>
  );
}
