import { SavedClient } from "@/features/saved/components/SavedClient";

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">Saved searches & bookmarks</h1>
      <SavedClient />
    </div>
  );
}
