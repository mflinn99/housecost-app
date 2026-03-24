"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

/** Minimal badge: moustache (1970s handlebar) + magnifying glass hint */
function Logomark() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-8 w-8"
      aria-hidden
    >
      {/* Circular badge */}
      <circle cx="20" cy="20" r="18" fill="currentColor" className="text-stone-700" />
      {/* Moustache — clean handlebar shape */}
      <path
        d="M12 22 Q16 18 20 20 Q24 18 28 22"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Magnifying glass handle */}
      <circle cx="26" cy="14" r="4" stroke="white" strokeWidth="1.2" fill="none" />
      <line x1="28.5" y1="16.5" x2="32" y2="20" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 font-medium tracking-tight text-stone-800 no-underline hover:text-stone-600",
        className
      )}
    >
      <Logomark />
      {showWordmark && <span className="text-sm">Mattsnoop</span>}
    </Link>
  );
}
