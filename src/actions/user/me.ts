"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

export async function getMyUser() {
  const session = await auth();
  if (!session) return null;

  const user = db.user.findUnique({
    where: { id: session.user.id },
    include: { profile: true },
  });

  return user;
}
