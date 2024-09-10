"use client";

import { useAuth } from "@/app/_contexts/AuthContext";
import SetupPaymentsNotice from "@/app/dashboard/_components/setup-payments-notice";

export default function Page() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <main className="space-y-10">
      {!user.hasFinishedStripeOnboarding && <SetupPaymentsNotice />}
      <h1 className="text-4xl font-extrabold">Dashboard</h1>
    </main>
  );
}
