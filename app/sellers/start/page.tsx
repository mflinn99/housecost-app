"use client";

import Link from "next/link";
import { SellerIntakeFlow } from "@/features/sellers/SellerIntakeFlow";

export default function SellersStartPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/sellers" className="text-xs text-stone-500 hover:text-stone-700">
          ← Back to For Sellers
        </Link>
        <div className="mt-6">
          <h1 className="text-lg font-medium text-stone-800">Create your private brief</h1>
          <p className="mt-1 text-sm text-stone-600">All information stays anonymous until you choose to reveal it.</p>
        </div>
        <div className="mt-8">
          <SellerIntakeFlow />
        </div>
      </main>
    </div>
  );
}
