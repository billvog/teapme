"use server";

import { onboardUserSchema } from "@/schemas/onboard-user.schema";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { z } from "zod";

export async function userOnboard(values: z.infer<typeof onboardUserSchema>) {
  const validated = onboardUserSchema.safeParse(values);

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

  const { handle } = validated.data;

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      handle,
    },
  });

  return {
    ok: true,
  };
}
