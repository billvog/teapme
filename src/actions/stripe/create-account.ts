"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { stripe } from "@/server/stripe";

export async function stripeCreateAccountAction() {
  const session = await auth();
  if (!session) {
    return {
      ok: false,
    };
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user || user.stripeAccountId) {
    return {
      ok: false,
    };
  }

  try {
    const account = await stripe.accounts.create({});

    // Save the Stripe account ID to the user
    await db.user.update({
      data: {
        stripeAccountId: account.id,
      },
      where: {
        id: session.user.id,
      },
    });

    return {
      ok: true,
      accountId: account.id,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
}
