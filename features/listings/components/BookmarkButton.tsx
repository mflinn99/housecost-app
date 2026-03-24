"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { addBookmark, removeBookmark, isBookmarked, BOOKMARKS_UPDATE } from "@/lib/storage";
import type { PropertyListing } from "@/types";

interface BookmarkButtonProps {
  listing: PropertyListing;
  onToggle?: (bookmarked: boolean) => void;
}

export function BookmarkButton({ listing, onToggle }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  const sync = () => setBookmarked(isBookmarked(listing.id));
  useEffect(() => {
    sync();
    window.addEventListener(BOOKMARKS_UPDATE, sync);
    return () => window.removeEventListener(BOOKMARKS_UPDATE, sync);
  }, [listing.id]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(listing.id);
      setBookmarked(false);
      onToggle?.(false);
    } else {
      addBookmark(listing.id, listing);
      setBookmarked(true);
      onToggle?.(true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-rose-500"
      title={bookmarked ? "Remove bookmark" : "Bookmark"}
    >
      <Heart
        className={`h-5 w-5 ${bookmarked ? "fill-rose-500 text-rose-500" : ""}`}
      />
    </button>
  );
}
