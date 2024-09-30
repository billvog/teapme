"use client";

import { getUserProfile } from "@/actions/profile/get-profile";
import Donate from "@/app/creator/[handle]/_components/donate";
import CreatorNotFound from "@/app/creator/[handle]/_components/not-found";
import TopTeapers from "@/app/creator/[handle]/_components/top-teapers";
import { Card } from "@/components/ui/card";
import Link from "@/components/ui/social-link";
import { UserAvatar } from "@/components/ui/user/avatar";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type UserProfileProps = {
  userHandle: string;
};

export default function UserProfile({ userHandle }: UserProfileProps) {
  const { data: userData } = useQuery({
    queryKey: ["user", userHandle, "profile"],
    queryFn: () => getUserProfile(userHandle),
  });

  if (!userData) return <CreatorNotFound handle={userHandle} />;

  return (
    <div className="flex flex-col items-center gap-4 px-4 xl:p-0">
      <div className="w-full">
        <Image
          alt="banner"
          src={userData.profile?.banner ?? ""}
          width={0}
          height={0}
          priority
          sizes="100vw"
          className="h-[250px] w-full rounded-2xl object-cover"
        />
      </div>
      <div className="flex w-full flex-col-reverse justify-center gap-4 xl:flex-row">
        <div className="flex w-full flex-1 flex-col space-y-4">
          <Card className="flex-col items-start space-y-6 p-10">
            <div className="flex flex-row items-center space-x-4">
              <UserAvatar user={userData} size="lg" />
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold sm:text-3xl">
                  {userData.name}
                </span>
                <span className="text-base font-bold text-lime-600 sm:text-lg">
                  @{userData.handle}
                </span>
              </div>
            </div>
            <div>
              <span className="w-full whitespace-pre-wrap text-sm sm:text-base">
                {userData.profile?.bio}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {userData.profile?.socialLinks.map((link) => (
                <Link key={link.id} link={link} />
              ))}
            </div>
          </Card>
          <Card className="flex-col items-start space-y-6 px-0 pb-0 pt-10">
            <h1 className="self-center px-10 text-xl font-extrabold sm:text-2xl">
              Top Teappers ✨
            </h1>
            <TopTeapers teaps={userData.teaps} />
          </Card>
        </div>
        <Card className="flex h-full w-full flex-col space-y-6 p-10 xl:max-w-sm">
          <Donate userId={userData.id} />
        </Card>
      </div>
    </div>
  );
}
