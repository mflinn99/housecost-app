import { notFound } from "next/navigation";
import { PropertyDetailClient } from "@/features/listings/components/PropertyDetailClient";
import { getListingById } from "./actions";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string; intent?: string }>;
}

export default async function PropertyPage({
  params,
  searchParams,
}: PropertyPageProps) {
  const { id } = await params;
  const { q: query, intent } = await searchParams;
  const listing = await getListingById(id);
  if (!listing) notFound();
  const derivedIntent = listing.priceType === "pcm" ? "rent" : "buy";
  return (
    <PropertyDetailClient
      listing={listing}
      searchQuery={query ?? ""}
      searchIntent={(intent === "buy" || intent === "rent" ? intent : derivedIntent) as "rent" | "buy"}
    />
  );
}
