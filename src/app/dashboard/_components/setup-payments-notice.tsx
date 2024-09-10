import Link from "next/link";
import React from "react";

export default function SetupPaymentsNotice() {
  return (
    <div className="w-fit rounded-lg bg-white px-6 py-4">
      <span>
        You need to{" "}
        <Link
          href="/dashboard/payments"
          className="font-bold text-blue-500 underline-offset-2 hover:underline"
        >
          setup payments
        </Link>
        , in order to receive teaps!
      </span>
    </div>
  );
}
