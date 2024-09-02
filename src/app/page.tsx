import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center bg-lime-200">
      <Link href="/auth/login">Login</Link>
    </main>
  );
}
