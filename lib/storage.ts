/**
 * Local storage helpers for saved searches, bookmarks, assumptions
 */

const PREFIX = "housecost_";

export const STORAGE_KEYS = {
  SAVED_SEARCHES: `${PREFIX}saved_searches`,
  BOOKMARKS: `${PREFIX}bookmarks`,
  ASSUMPTIONS: `${PREFIX}assumptions`,
} as const;

function safeParse<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or disabled
  }
}

export interface StoredSearch {
  id: string;
  query: string;
  intent: "rent" | "buy";
  filters: Record<string, unknown>;
  createdAt: string;
}

export interface StoredBookmark {
  id: string;
  listingId: string;
  listing: unknown;
  addedAt: string;
}

export function getSavedSearches(): StoredSearch[] {
  return safeParse(STORAGE_KEYS.SAVED_SEARCHES, []);
}

export function saveSearch(search: Omit<StoredSearch, "id" | "createdAt">): void {
  const searches = getSavedSearches();
  const newSearch: StoredSearch = {
    ...search,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  safeSet(STORAGE_KEYS.SAVED_SEARCHES, [newSearch, ...searches].slice(0, 20));
}

export function removeSavedSearch(id: string): void {
  const searches = getSavedSearches().filter((s) => s.id !== id);
  safeSet(STORAGE_KEYS.SAVED_SEARCHES, searches);
}

export function getBookmarks(): StoredBookmark[] {
  return safeParse(STORAGE_KEYS.BOOKMARKS, []);
}

export const BOOKMARKS_UPDATE = "housecost-bookmarks-update";

export function addBookmark(listingId: string, listing: unknown): void {
  const bookmarks = getBookmarks();
  if (bookmarks.some((b) => b.listingId === listingId)) return;
  bookmarks.unshift({
    id: crypto.randomUUID(),
    listingId,
    listing,
    addedAt: new Date().toISOString(),
  });
  safeSet(STORAGE_KEYS.BOOKMARKS, bookmarks.slice(0, 50));
  if (typeof window !== "undefined") window.dispatchEvent(new Event(BOOKMARKS_UPDATE));
}

export function removeBookmark(listingId: string): void {
  const bookmarks = getBookmarks().filter((b) => b.listingId !== listingId);
  safeSet(STORAGE_KEYS.BOOKMARKS, bookmarks);
  if (typeof window !== "undefined") window.dispatchEvent(new Event(BOOKMARKS_UPDATE));
}

export function isBookmarked(listingId: string): boolean {
  return getBookmarks().some((b) => b.listingId === listingId);
}

/** Max properties in compare list */
export const COMPARE_MAX = 5;

const COMPARE_KEY = `${PREFIX}compare_list`;

export function getCompareList(): string[] {
  return safeParse(COMPARE_KEY, []);
}

/** Notify listeners that compare list changed */
export function notifyCompareUpdate(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("housecost-compare-update"));
  }
}

export function addToCompare(listingId: string): { added: boolean; atLimit: boolean } {
  const list = getCompareList();
  if (list.includes(listingId)) return { added: false, atLimit: false };
  if (list.length >= COMPARE_MAX) return { added: false, atLimit: true };
  list.unshift(listingId);
  safeSet(COMPARE_KEY, list);
  notifyCompareUpdate();
  return { added: true, atLimit: false };
}

export function removeFromCompare(listingId: string): void {
  const list = getCompareList().filter((id) => id !== listingId);
  safeSet(COMPARE_KEY, list);
  notifyCompareUpdate();
}

/** Reorder compare list */
export function reorderCompare(newOrder: string[]): void {
  if (newOrder.length > COMPARE_MAX) return;
  safeSet(COMPARE_KEY, newOrder);
  notifyCompareUpdate();
}

export function getCompareListFull(): string[] {
  return getCompareList();
}
