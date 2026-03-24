"use client";

import Link from "next/link";

export default function SellersPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">For Sellers</p>
          <h1 className="mt-2 text-xl font-medium tracking-tight text-stone-800">
            See what agents would offer — before you commit
          </h1>
          <p className="mt-3 text-sm text-stone-600 leading-relaxed">
            Create a private brief and compare proposals anonymously
          </p>
        </header>

        <div className="space-y-4">
          <Link
            href="/sellers/start"
            className="block w-full rounded-sm border border-stone-800 bg-stone-800 px-4 py-3 text-center text-sm font-medium text-stone-50 transition-colors hover:bg-stone-700"
          >
            Start anonymously
          </Link>
          <Link
            href="/sellers/how-it-works"
            className="block w-full rounded-sm border border-stone-200/90 bg-transparent px-4 py-3 text-center text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
          >
            Learn how it works
          </Link>
        </div>

        <section className="mt-10 rounded-sm border border-stone-200/90 bg-white/70 p-4">
          <p className="text-xs font-medium text-stone-600">Fully anonymous</p>
          <p className="mt-1 text-sm text-stone-600 leading-relaxed">
            No name, no address, no commitment. Explore agent interest and compare proposals on your terms. Reveal your identity only when you choose.
          </p>
        </section>
      </main>
    </div>
  );
}
