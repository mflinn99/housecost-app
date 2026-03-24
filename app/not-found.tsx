import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-stone-600">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <Button className="mt-6">Go home</Button>
      </Link>
    </div>
  );
}
