import { auth } from "@/server/auth";
import React from "react";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return null;
  }

  return <div>Welcome back, {session.user.name}!</div>;
}
