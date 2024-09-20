"use client";

import { getUserProfile } from "@/actions/profile/get-profile";
import CreatorNotFound from "@/app/creator/[handle]/_components/not-found";
import DonateThanksMessage from "@/components/ui/donate-thanks-message";
import { useQuery } from "@tanstack/react-query";

export default function Thanks({ userHandle }: { userHandle: string }) {
  const { data: user } = useQuery({
    queryKey: ["user", userHandle, "profile"],
    queryFn: () => getUserProfile(userHandle),
  });

  if (!user || !user.profile) {
    return <CreatorNotFound handle={userHandle} />;
  }

  return (
    <main className="flex flex-col items-center gap-4">
      <video id="banner-video" autoPlay muted playsInline loop>
        <source src="/tea-animation.webm" type="video/webm" />
        Your browser does not support the video tag. 😔
      </video>
      <DonateThanksMessage
        handle={user.handle || ""}
        message={user.profile.thankYouMessage}
      />
    </main>
  );
}
