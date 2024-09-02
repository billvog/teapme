import { auth } from "@/server/auth";
import React from "react";

export default async function Page() {
  const session = await auth();

  console.log(session);

  if (!session) {
    return <div>Redirecting...</div>;
  }

  return <div>Welcome back, {session.user.name}</div>;
}
