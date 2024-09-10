"use server";

import { db } from "@/server/db";

export async function getUserProfile(handle: string) {
  const user = await db.user.findUnique({
    where: {
      handle,
    },
    include: {
      profile: true,
      teaps: {
        where: {
          isCompleted: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
    },
  });

  return user;
}
