"use server";

import { TEAP_PRICE_IN_CENTS } from "@/constants";
import { donateSchema } from "@/schemas/donate.schema";
import { db } from "@/server/db";
import { stripe } from "@/server/stripe";
import { headers } from "next/headers";
import { z } from "zod";

export async function createStripeCheckoutSession(
  userId: string,
  values: z.infer<typeof donateSchema>,
) {
  const validated = donateSchema.safeParse(values);
  if (!validated.success) {
    return {
      ok: false,
    };
  }

  const { message, senderName, cupsAmount } = validated.data;

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
      senderName,
      price: cupsAmount * TEAP_PRICE_IN_CENTS,
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
            unit_amount: TEAP_PRICE_IN_CENTS,
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
