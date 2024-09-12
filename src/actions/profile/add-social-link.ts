"use server";

import { socialLinkSchema } from "@/schemas/profile.schema";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { z } from "zod";

type Input = {
  id?: number;
  values: z.infer<typeof socialLinkSchema>;
};

export default async function profileAddSocialLink({ id, values }: Input) {
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

  let link;

  if (id) {
    link = await db.socialLink.update({
      data: {
        title: values.title,
        url: values.url,
      },
      where: {
        id,
        profile: {
          userId: session.user.id,
        },
      },
    });
  } else {
    link = await db.socialLink.create({
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
  }

  return {
    ok: true,
    link,
  };
}
