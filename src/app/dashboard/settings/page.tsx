import SettingsTabs from "@/app/dashboard/settings/_components/settings-tabs";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
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
    include: {
      profile: true,
    },
  });

  if (!user) {
    return null;
  }

  return <SettingsTabs user={user as any} />;
}
