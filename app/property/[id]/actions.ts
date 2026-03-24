"use server";

import { MockListingsProvider } from "@/services/providers/mock-listings";

const provider = new MockListingsProvider();

export async function getListingById(id: string) {
  return await provider.getById(id);
}
