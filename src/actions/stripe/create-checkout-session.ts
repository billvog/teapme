"use server";

import { TEA_PRICE } from "@/constants";
import { db } from "@/server/db";
import { stripe } from "@/server/stripe";
import { headers } from "next/headers";

export async function stripeCreateCheckoutSessionAction(
  userId: string,
  message: string,
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

  const teap = await db.teap.create({
    data: {
      message,
      price: cupsAmount * TEA_PRICE,
      receiverId: userId,
    },
  });

  const session = await stripe.checkout.sessions.create(
    {
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Cup of Tea",
            },
            unit_amount: TEA_PRICE,
          },
          quantity: cupsAmount,
        },
      ],
      metadata: {
        teapId: teap.id,
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
