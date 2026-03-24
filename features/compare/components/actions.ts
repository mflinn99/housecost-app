"use server";

import { MockListingsProvider } from "@/services/providers/mock-listings";
import type { PropertyListing } from "@/types";

const provider = new MockListingsProvider();

export async function getCompareListings(ids: string[]): Promise<PropertyListing[]> {
  const results = await Promise.all(ids.map((id) => provider.getById(id)));
  return results.filter((l): l is PropertyListing => l != null);
}
