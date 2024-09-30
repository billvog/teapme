"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

export async function profileClickSocialLink(socialLinkId: number) {
  const session = await auth();
  const profileId = session?.user.profileId;

  try {
    await db.socialLink.update({
      data: {
        clickCount: {
          increment: 1,
        },
      },
      where: {
        id: socialLinkId,
        NOT: {
          profileId,
        },
      },
    });
  } catch (error) {
    return {
      ok: false,
    };
  }

  return {
    ok: true,
  };
}
