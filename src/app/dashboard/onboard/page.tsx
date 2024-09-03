import OnboardForm from "@/app/dashboard/onboard/_components/onboard-form";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (user?.handle) {
    return redirect("/dashboard");
  }

  return <OnboardForm />;
}
