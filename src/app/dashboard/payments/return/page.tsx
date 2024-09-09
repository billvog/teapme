import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-10 text-center">
      <h1 className="text-2xl font-bold">Everything went well ✅</h1>
      <p>
        If you filled all the required information, you should be able to
        receive payments now!
      </p>
      <p>
        Head over to{" "}
        <Link href="/dashboard/settings?tab=payments.stripe" className="link">
          ⚙️ Settings
        </Link>
      </p>
    </div>
  );
}
