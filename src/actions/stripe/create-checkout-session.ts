"use server";

import { db } from "@/server/db";
import { stripe } from "@/server/stripe";
import { headers } from "next/headers";

export async function stripeCreateCheckoutSessionAction(
  userId: string,
  cupsAmount: number,
) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || !user.stripeAccountId) {
    return {
      ok: false,
    };
  }

  const origin = headers().get("origin");
  const successUrl = `${origin}/creator/${user.handle}/teaped?session_id={CHECKOUT_SESSION_ID}`;

  const session = await stripe.checkout.sessions.create(
    {
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Cup of Tea",
            },
            unit_amount: 300, // $3 per cup
          },
          quantity: cupsAmount,
        },
      ],
      payment_intent_data: {
        application_fee_amount: 10,
      },
      mode: "payment",
      success_url: successUrl,
    },
    {
      stripeAccount: user.stripeAccountId,
    },
  );

  return {
    ok: true,
    checkoutUrl: session.url,
  };
}
