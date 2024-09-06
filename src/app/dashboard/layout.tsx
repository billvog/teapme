import Navbar from "@/app/dashboard/_components/navbar";
import { auth } from "@/server/auth";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return null;
  }

  return (
    <div>
      <Navbar avatar={session.user.image ?? undefined} />
      <div className="flex w-full items-center justify-center">{children}</div>
    </div>
  );
}
