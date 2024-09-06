import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <Link href="/auth/login">Login</Link>
    </main>
  );
}
