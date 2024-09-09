import { stripeAccountLinkAction } from "@/actions/stripe/account-link";
import React from "react";

export default async function Page() {
  const { ok, accountLink } = await stripeAccountLinkAction();
  if (ok && accountLink) {
    window.location.href = accountLink;
  } else {
    <span className="text-xl font-bold text-red-500">
      Couldn't refresh link!
    </span>;
  }

  return <div>Creating new account link...</div>;
}
