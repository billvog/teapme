"use client";

import { useAuth } from "@/app/_contexts/AuthContext";
import { UserDropdown } from "@/components/ui/user/dropdown";
import Link from "next/link";

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
              <Link
                href={`/@${user.handle}`}
                className="decoration-lime-600 decoration-wavy hover:underline"
              >
                Your page
              </Link>
              <UserDropdown />
            </>
          ) : (
            <Link href="/auth/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
