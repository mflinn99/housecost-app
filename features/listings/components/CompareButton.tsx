"use client";

import { useState, useEffect } from "react";
import { Scale } from "lucide-react";
import { addToCompare, removeFromCompare, getCompareList } from "@/lib/storage";
import type { PropertyListing } from "@/types";

interface CompareButtonProps {
  listing: PropertyListing;
  onToggle?: (inCompare: boolean) => void;
}

export function CompareButton({ listing, onToggle }: CompareButtonProps) {
  const [inCompare, setInCompare] = useState(false);

  const sync = () => setInCompare(getCompareList().includes(listing.id));
  useEffect(() => {
    sync();
    window.addEventListener("housecost-compare-update", sync);
    return () => window.removeEventListener("housecost-compare-update", sync);
  }, [listing.id]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(listing.id);
      setInCompare(false);
      onToggle?.(false);
    } else {
      const { added, atLimit } = addToCompare(listing.id);
      if (added) {
        setInCompare(true);
        onToggle?.(true);
      } else if (atLimit) {
        window.dispatchEvent(new Event("housecost-compare-limit"));
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
      title={inCompare ? "Remove from compare" : "Add to compare"}
    >
      <Scale className={`h-5 w-5 ${inCompare ? "text-stone-700" : ""}`} />
    </button>
  );
}
