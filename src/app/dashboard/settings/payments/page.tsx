"use client";

import { createStripeAccountLink } from "@/actions/stripe/account-link";
import { useAuth } from "@/app/_contexts/AuthContext";
import Tab from "@/app/dashboard/settings/_components/tab";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const { user } = useAuth();

  const [canSubmit, setCanSubmit] = React.useState(true);

  const { mutate, isPending } = useMutation({
    mutationFn: createStripeAccountLink,
  });

  const setupPayments = async () => {
    mutate(undefined, {
      onSuccess(data) {
        if (data.ok && data.accountLink) {
          setCanSubmit(false);
          window.location.href = data.accountLink;
          return;
        }

        toast.error("Something went wrong! Please try again.");
      },
    });
  };

  if (!user) return null;

  return (
    <Tab>
      <Tab.Header>
        <Tab.Title>💰 Payments</Tab.Title>
        <Tab.Subtitle>
          We handle payments through Stripe.
          {!user.hasFinishedStripeOnboarding && (
            <>
              <br />
              You can create an account or link an existing account.
            </>
          )}
        </Tab.Subtitle>
      </Tab.Header>
      <Tab.Content>
        {user.hasFinishedStripeOnboarding ? (
          <div className="mx-auto w-fit rounded bg-green-100 px-10 py-6 text-center font-semibold text-green-700">
            You've successfully set up payments with Stripe! 🎉 <br />
            You can now start receiving payments ☕️
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-4">
            <Button
              className="text-base font-bold"
              onClick={setupPayments}
              loading={isPending}
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
