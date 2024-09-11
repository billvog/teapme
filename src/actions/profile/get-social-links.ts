"use server";

import { db } from "@/server/db";

export async function profileGetSocialLinks(profileId: string) {
  const socialLinks = await db.socialLink.findMany({
    where: {
      profileId,
    },
  });

  return socialLinks;
}
