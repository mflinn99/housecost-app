"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scale } from "lucide-react";
import { getCompareList, COMPARE_MAX } from "@/lib/storage";
import { Toast } from "@/components/ui/Toast";

const LIMIT_MESSAGE = `Compare list is full (${COMPARE_MAX} properties). Remove one to add another.`;

export function CompareTray() {
  const [count, setCount] = useState(0);
  const [showLimitToast, setShowLimitToast] = useState(false);

  const refresh = () => setCount(getCompareList().length);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("housecost-compare-update", handler);
    return () => window.removeEventListener("housecost-compare-update", handler);
  }, []);

  useEffect(() => {
    const handler = () => setShowLimitToast(true);
    window.addEventListener("housecost-compare-limit", handler);
    return () => window.removeEventListener("housecost-compare-limit", handler);
  }, []);

  return (
    <>
      {count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-white">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-stone-900">
                  {count} {count === 1 ? "property" : "properties"} selected
                </p>
                <p className="text-sm text-stone-500">
                  Compare side by side or download a report
                </p>
              </div>
            </div>
            <Link
              href="/compare"
              className="shrink-0 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              View comparison
            </Link>
          </div>
        </div>
      )}
      {showLimitToast && (
        <Toast message={LIMIT_MESSAGE} onClose={() => setShowLimitToast(false)} />
      )}
    </>
  );
}
