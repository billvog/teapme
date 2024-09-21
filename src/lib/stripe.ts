import { db } from "@/server/db";
import { WithPostHogClient } from "@/server/posthog";
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

  // Track
  await WithPostHogClient((posthog) => {
    posthog.capture({
      distinctId: user.id,
      event: "stripe account updated",
      properties: {
        accountId: account.id,
        detailsSubmitted: account.details_submitted,
      },
    });
  });
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

  // Track
  await WithPostHogClient((posthog) => {
    posthog.capture({
      distinctId: session.metadata?.teapId as string,
      event: "stripe checkout session completed",
      properties: {
        sessionId: session.id,
        paymentStatus: session.payment_status,
      },
    });
  });
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

  // Track
  await WithPostHogClient((posthog) => {
    posthog.capture({
      distinctId: session.metadata?.teapId as string,
      event: "stripe checkout session expired",
      properties: {
        sessionId: session.id,
      },
    });
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

  // Track
  await WithPostHogClient((posthog) => {
    posthog.capture({
      distinctId: session.metadata?.teapId as string,
      event: "stripe checkout session payment failed",
      properties: {
        sessionId: session.id,
      },
    });
  });
}
