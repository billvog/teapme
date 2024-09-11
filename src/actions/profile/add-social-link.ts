"use server";

import { socialLinkSchema } from "@/schemas/profile.schema";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { z } from "zod";

export default async function profileAddSocialLink(
  values: z.infer<typeof socialLinkSchema>,
) {
  const validated = socialLinkSchema.safeParse(values);

  if (validated.error) {
    return {
      ok: false,
    };
  }

  const session = await auth();
  if (!session) {
    return {
      ok: false,
    };
  }

  await db.socialLink.create({
    data: {
      title: values.title,
      url: values.url,
      profile: {
        connect: {
          userId: session.user.id,
        },
      },
    },
  });

  return {
    ok: true,
  };
}
