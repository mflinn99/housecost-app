"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSavedSearches, getBookmarks, removeSavedSearch, removeBookmark } from "@/lib/storage";
import { Card } from "@/components/ui/Card";
import { CompareButton } from "@/features/listings/components/CompareButton";
import type { PropertyListing } from "@/types";

export function SavedClient() {
  const [searches, setSearches] = useState<ReturnType<typeof getSavedSearches>>([]);
  const [bookmarks, setBookmarks] = useState<ReturnType<typeof getBookmarks>>([]);

  const refresh = () => {
    setSearches(getSavedSearches());
    setBookmarks(getBookmarks());
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="mt-6 space-y-8">
      <section>
        <h2 className="text-lg font-medium">Saved searches</h2>
        {searches.length === 0 ? (
          <p className="mt-2 text-stone-500">No saved searches yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {searches.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-3">
                <Link
                  href={`/search?q=${encodeURIComponent(s.query)}&intent=${s.intent}`}
                  className="font-medium text-stone-900 hover:underline"
                >
                  {s.query} — {s.intent}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    removeSavedSearch(s.id);
                    refresh();
                  }}
                  className="text-sm text-stone-500 hover:text-rose-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-medium">Bookmarked properties</h2>
        {bookmarks.length === 0 ? (
          <p className="mt-2 text-stone-500">No bookmarked properties.</p>
        ) : (
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {bookmarks.map((b) => {
              const listing = b.listing as PropertyListing;
              return (
                <Card key={b.id} padding="sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/property/${listing.id}`}
                        className="font-medium text-stone-900 hover:underline"
                      >
                        {listing.displayPrice}
                      </Link>
                      <p className="mt-1 text-sm text-stone-600">{listing.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CompareButton listing={listing} />
                      <button
                        type="button"
                        onClick={() => {
                          removeBookmark(listing.id);
                          refresh();
                        }}
                        className="text-sm text-stone-500 hover:text-rose-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
