"use client";

import { stripeAccountLinkAction } from "@/actions/stripe/account-link";
import { stripeCreateAccountAction } from "@/actions/stripe/create-account";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

export default function CreateAccount() {
  const createAccount = async () => {
    const { ok, accountId } = await stripeCreateAccountAction();
    if (ok && accountId) {
      toast.success("Account created successfully!");
    }
  };

  const accountLink = async () => {
    const { ok, accountLink } = await stripeAccountLinkAction();
    if (ok && accountLink) {
      window.location.href = accountLink;
    } else {
      toast.error("Failed to create account link.");
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button onClick={createAccount}>Create Account</Button>
      <Button onClick={accountLink}>Account Link</Button>
    </div>
  );
}
