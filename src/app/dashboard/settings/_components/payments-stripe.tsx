"use client";

import { stripeAccountLinkAction } from "@/actions/stripe/account-link";
import Tab from "@/app/dashboard/settings/_components/tab";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

type PaymentsStripeProps = {
  hasUserFinishedStripeOnboarding: boolean | null;
};

export default function PaymentsStripe({
  hasUserFinishedStripeOnboarding,
}: PaymentsStripeProps) {
  const [canSubmit, setCanSubmit] = React.useState(true);
  const [isLoading, startTransition] = React.useTransition();

  const setupPayments = async () => {
    startTransition(async () => {
      const { ok, accountLink } = await stripeAccountLinkAction();
      if (ok && accountLink) {
        setCanSubmit(false);
        window.location.href = accountLink;
        return;
      }

      toast.error("Something went wrong! Please try again.");
    });
  };

  return (
    <Tab>
      <Tab.Header>
        <Tab.Title>💰 Payments</Tab.Title>
        <Tab.Subtitle>
          We handle payments through Stripe.
          {!hasUserFinishedStripeOnboarding && (
            <>
              <br />
              You can create an account or link an existing account.
            </>
          )}
        </Tab.Subtitle>
      </Tab.Header>
      <Tab.Content>
        {hasUserFinishedStripeOnboarding ? (
          <div className="mx-auto w-fit rounded bg-green-100 px-10 py-6 text-center font-semibold text-green-700">
            You've successfully set up payments with Stripe! 🎉 <br />
            You can now start receiving payments ☕️
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-4">
            <Button
              className="text-base font-bold"
              onClick={setupPayments}
              loading={isLoading}
              disabled={!canSubmit}
              size="lg"
            >
              Set it up❗️
            </Button>
            <p className="max-w-lg text-center text-sm text-gray-500">
              Clicking this button will take you to Stripe to create an account
              and fill in the necessary information, so you can start receiving
              payments!
            </p>
          </div>
        )}
      </Tab.Content>
    </Tab>
  );
}
