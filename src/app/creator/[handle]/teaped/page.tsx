import Link from "next/link";
import React from "react";

export default async function Page({ params }: { params: { handle: string } }) {
  return (
    <main className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Thanks for your Teap! ❤️</h1>
      <Link href={`/@${params.handle}`}>Return to my page</Link>
    </main>
  );
}
