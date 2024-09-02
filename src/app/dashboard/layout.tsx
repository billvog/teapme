import Navbar from "@/app/dashboard/_components/Navbar";
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
    <div className="h-screen bg-lime-100">
      <Navbar avatar={session.user.image ?? undefined} />
      <div>{children}</div>
    </div>
  );
}
