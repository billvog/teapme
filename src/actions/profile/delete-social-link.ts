"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

export async function profileDeleteSocialLink(socialLinkId: number) {
  const session = await auth();
  if (!session) {
    return { ok: false };
  }

  await db.socialLink.delete({
    where: {
      id: socialLinkId,
      AND: {
        profile: {
          userId: session.user.id,
        },
      },
    },
  });

  return { ok: true };
}
