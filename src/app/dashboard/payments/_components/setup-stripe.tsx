"use client";

import { stripeAccountLinkAction } from "@/actions/stripe/account-link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import { toast } from "sonner";

type SetupStripeProps = {
  user: {
    hasFinishedStripeOnboarding: boolean | null;
  };
};

export default function SetupStripe({ user }: SetupStripeProps) {
  const [isLoading, startTransition] = React.useTransition();

  const setupPayments = async () => {
    startTransition(async () => {
      const { ok, accountLink } = await stripeAccountLinkAction();
      if (ok && accountLink) {
        window.location.href = accountLink;
        return;
      }

      toast.error("Something went wrong! Please try again.");
    });
  };

  return (
    <Card className="h-[300px] p-0">
      <CardHeader className="text-center">
        <CardTitle>💰 Payments</CardTitle>
        <CardDescription>
          We handle payments through Stripe. <br />
          You can create an account or link an existing account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user.hasFinishedStripeOnboarding ? (
          <span className="font-semibold">
            You've successfully set up payments with Stripe. 🎉
          </span>
        ) : (
          <Button
            className="text-base font-bold"
            onClick={setupPayments}
            loading={isLoading}
            size="lg"
          >
            Set it up❗️
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
