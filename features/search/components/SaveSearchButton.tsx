"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { saveSearch } from "@/lib/storage";
import type { SearchIntent } from "@/types";

interface SaveSearchButtonProps {
  query: string;
  intent: SearchIntent;
  onSaved?: () => void;
}

export function SaveSearchButton({
  query,
  intent,
  onSaved,
}: SaveSearchButtonProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveSearch({ query, intent, filters: {} });
    setSaved(true);
    onSaved?.();
  };

  if (!query.trim()) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSave}
      disabled={saved}
    >
      <Bookmark className={`mr-2 h-4 w-4 ${saved ? "fill-current" : ""}`} />
      {saved ? "Saved" : "Save search"}
    </Button>
  );
}
