import { env } from "@/env";
import { stripe } from "@/server/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook signature verification failed.", error);
    return NextResponse.json(
      { message: "Webhook signature verification failed" },
      { status: 400 },
    );
  }

  let session;

  switch (event.type) {
    case "checkout.session.async_payment_succeeded":
      session = event.data.object as Stripe.Checkout.Session;
      if (!session.metadata || !session.metadata.userId) {
        return NextResponse.json(
          { message: "Missing userId in metadata" },
          { status: 400 },
        );
      }

      console.log("Payment was successful!", session);
      break;
    case "checkout.session.async_payment_failed":
      session = event.data.object as Stripe.Checkout.Session;
      console.log("Payment failed!", session);
      break;
    default:
      // Unhandled event type
      break;
  }

  return NextResponse.json({ result: event, ok: true });
}
