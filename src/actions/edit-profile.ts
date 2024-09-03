"use server";

import { profileSchema } from "@/schemas/profile.schema";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { z } from "zod";

export async function editProfileAction(values: z.infer<typeof profileSchema>) {
  const validated = profileSchema.safeParse(values);

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

  await db.user.update({
    data: {
      name: values.name,
      profile: {
        update: {
          bio: values.bio,
        },
      },
    },
    where: {
      id: session.user.id,
    },
  });

  return {
    ok: true,
  };
}
