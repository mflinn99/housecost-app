import { CompareClient } from "@/features/compare/components/CompareClient";

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">Compare properties</h1>
      <CompareClient />
    </div>
  );
}
