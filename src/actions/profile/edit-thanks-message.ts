"use server";

import { profileThanksMessageSchema } from "@/schemas/profile.schema";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { z } from "zod";

export async function profileEditThanksMessage(
  values: z.infer<typeof profileThanksMessageSchema>,
) {
  const validated = profileThanksMessageSchema.safeParse(values);
  if (!validated.success) {
    return { ok: false };
  }

  const session = await auth();
  if (!session) {
    return { ok: false };
  }

  await db.profile.update({
    data: {
      thankYouMessage: validated.data.thankYouMessage,
    },
    where: {
      userId: session.user.id,
    },
  });

  return { ok: true };
}
