"use client";

import { useAuth } from "@/app/_contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserAvatarFallback } from "@/lib/user-profile";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { user, isLoading } = useAuth();

  return (
    <header className="flex w-full justify-center border-b-4 border-gray-200 bg-white p-8">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <div>
          <Link href="/" className="text-4xl font-extrabold">
            🍃 Teapme
          </Link>
        </div>
        <div className="flex items-center gap-10">
          {isLoading ? null : user ? (
            <>
              <Link href={`/@${user.handle}`}>Your page</Link>
              <Link href="/dashboard/settings">
                <Avatar>
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback>{getUserAvatarFallback(user)}</AvatarFallback>
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
