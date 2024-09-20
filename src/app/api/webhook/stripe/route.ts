import { env } from "@/env";
import * as Handlers from "@/lib/stripe";
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

  try {
    switch (event.type) {
      case "account.updated":
        Handlers.onAccountUpdated(event.data.object as Stripe.Account);
        break;
      case "checkout.session.completed":
        Handlers.onCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case "checkout.session.expired":
        Handlers.onCheckoutSessionExpired(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case "checkout.session.async_payment_failed":
        Handlers.onCheckoutSessionAsyncPaymentFailed(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      default:
        // Unhandled event type
        break;
    }
  } catch (error) {
    console.error("Error handling webhook event", error);
    return NextResponse.json(
      { message: "Error handling webhook event" },
      { status: 500 },
    );
  }

  return NextResponse.json({ result: event, ok: true });
}
