import { SearchResultsClient } from "@/features/search/components/SearchResultsClient";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; intent?: string; mode?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const intent = (params.intent === "rent" ? "rent" : "buy") as "rent" | "buy";
  const mode = params.mode === "nearby" ? "nearby" : "search";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SearchResultsClient
        initialQuery={query}
        initialIntent={intent}
        initialMode={mode}
      />
    </div>
  );
}
