"use client";

import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/sellers" className="text-xs text-stone-500 hover:text-stone-700">
          ← Back to For Sellers
        </Link>
        <h1 className="mt-6 text-lg font-medium text-stone-800">Decision method</h1>
        <div className="mt-6 space-y-4 text-sm text-stone-600 leading-relaxed">
          <p>
            Create a private brief with postcode, type, bedrooms and value range. You do not submit your name or exact address.
          </p>
          <p>
            We calculate likely commission range, pricing posture and negotiation pressure from local market evidence.
          </p>
          <p>
            You review outcomes first, then decide if any agent should see full details.
          </p>
          <p>
            Result: clearer expectations before listing, with less pricing risk.
          </p>
        </div>
        <Link
          href="/sellers/start"
          className="mt-8 block w-full rounded-sm border border-stone-800 bg-stone-800 px-4 py-3 text-center text-sm font-medium text-stone-50 hover:bg-stone-700"
        >
          Start anonymously
        </Link>
      </main>
    </div>
  );
}
