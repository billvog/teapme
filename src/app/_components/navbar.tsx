"use server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import React from "react";

export default async function Navbar() {
  const user = await useUser();

  return (
    <header className="flex w-full justify-center border-b-4 border-gray-200 bg-white p-8">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <div>
          <Link href="/" className="text-4xl font-extrabold">
            Teapme
          </Link>
        </div>
        <div className="flex items-center gap-10">
          {user ? (
            <>
              <Link href={`/@${user.handle}`}>Your page</Link>
              <Link href="/dashboard/profile">
                <Avatar>
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>VV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <Link href="/auth/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
