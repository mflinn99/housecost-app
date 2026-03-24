"use client";

import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[var(--background)]/98 backdrop-blur-sm">
      <div className="mx-auto flex h-11 max-w-2xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-5">
          <Link
            href="/sellers"
            className="text-xs font-medium text-stone-500 transition-colors hover:text-stone-700"
          >
            For Sellers
          </Link>
          <Link
            href="/saved"
            className="text-xs font-medium text-stone-500 transition-colors hover:text-stone-700"
          >
            Saved
          </Link>
          <Link
            href="/compare"
            className="text-xs font-medium text-stone-500 transition-colors hover:text-stone-700"
          >
            Compare
          </Link>
        </nav>
      </div>
    </header>
  );
}
