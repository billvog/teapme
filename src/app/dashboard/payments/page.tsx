import SetupStripe from "@/app/dashboard/payments/_components/setup-stripe";
import useUser from "@/hooks/useUser";

export default async function Page() {
  const user = await useUser();
  if (!user) return null;

  return <SetupStripe user={user} />;
}
