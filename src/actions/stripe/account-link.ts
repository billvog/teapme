"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { stripe } from "@/server/stripe";
import { headers } from "next/headers";

export async function stripeAccountLinkAction() {
  const origin = headers().get("origin");
  const url = `${origin}/dashboard/payments`;

  const session = await auth();
  if (!session) {
    return {
      ok: false,
    };
  }

  let user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return {
      ok: false,
    };
  }

  try {
    // If the user doesn't have a Stripe account, create one
    if (!user.stripeAccountId) {
      const account = await stripe.accounts.create({
        email: user.email || undefined,
      });

      // Save the Stripe account ID to the user
      user = await db.user.update({
        data: {
          stripeAccountId: account.id,
        },
        where: {
          id: session.user.id,
        },
      });
    }

    // Create an account link
    const accountLink = await stripe.accountLinks.create({
      account: user.stripeAccountId!,
      refresh_url: `${url}/refresh/${user.stripeAccountId}`,
      return_url: `${url}/return/${user.stripeAccountId}`,
      type: "account_onboarding",
    });

    return {
      ok: true,
      accountLink: accountLink.url,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
}
