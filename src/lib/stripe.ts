import { db } from "@/server/db";
import Stripe from "stripe";

export async function onAccountUpdated(account: Stripe.Account) {
  const user = await db.user.findUnique({
    where: { stripeAccountId: account.id },
  });

  if (!user) {
    throw new Error("User not found for account ID");
  }

  // Update the user's account status
  await db.user.update({
    data: {
      hasFinishedStripeOnboarding: account.details_submitted,
    },
    where: { id: user.id },
  });

  // Todo: Track the user's stripe account update
}

export async function onCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  if (!session.metadata || !session.metadata.teapId) {
    throw new Error("Missing teapId in metadata");
  }

  await db.teap.update({
    where: { id: session.metadata.teapId },
    data: {
      isCompleted: session.payment_status === "paid",
    },
  });

  // Todo: Track the checkout session completion
}

export async function onCheckoutSessionExpired(
  session: Stripe.Checkout.Session,
) {
  if (!session.metadata || !session.metadata.teapId) {
    throw new Error("Missing teapId in metadata");
  }

  await db.teap.delete({
    where: { id: session.metadata.teapId },
  });
}

export async function onCheckoutSessionAsyncPaymentFailed(
  session: Stripe.Checkout.Session,
) {
  if (!session.metadata || !session.metadata.teapId) {
    throw new Error("Missing teapId in metadata");
  }

  // Todo: Handle the async payment failure
  console.log("Payment failed!", session);

  // await db.teap.update({
  //   where: { id: session.metadata.teapId },
  //   data: {
  //     paymentStatus: "failed",
  //   },
  // });
}
