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

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user || !user.stripeAccountId) {
    return {
      ok: false,
    };
  }

  try {
    const accountLink = await stripe.accountLinks.create({
      account: user.stripeAccountId,
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
