import OnboardForm from "@/app/dashboard/onboard/_components/onboard-form";
import useUser from "@/hooks/useUser";
import { permanentRedirect } from "next/navigation";

export default async function Page() {
  const user = await useUser();
  if (user && user.handle) {
    permanentRedirect("/dashboard");
  }

  return <OnboardForm />;
}
