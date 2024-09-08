import SetupPaymentsNotice from "@/app/dashboard/_components/setup-payments-notice";
import useUser from "@/hooks/useUser";

export default async function Page() {
  const user = await useUser();
  if (!user) return null;

  return (
    <main>{!user.hasFinishedStripeOnboarding && <SetupPaymentsNotice />}</main>
  );
}
