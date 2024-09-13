"use client";

import { getUserProfile } from "@/actions/profile/get-profile";
import Donate from "@/app/creator/[handle]/_components/donate";
import CreatorNotFound from "@/app/creator/[handle]/_components/not-found";
import TopTeapers from "@/app/creator/[handle]/_components/top-teapers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Link from "@/components/ui/social-link";
import { getUserAvatarFallback } from "@/lib/user-profile";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type UserProfileProps = {
  userHandle: string;
};

export default function UserProfile({ userHandle }: UserProfileProps) {
  const { data: userData } = useQuery({
    queryKey: ["user", userHandle],
    queryFn: () => getUserProfile(userHandle),
  });

  if (!userData) return <CreatorNotFound handle={userHandle} />;

  return (
    <div className="flex flex-col items-center">
      <div className="group w-[calc(100%+30px)]">
        <Image
          alt="banner"
          src={userData.profile?.banner ?? ""}
          width={0}
          height={0}
          sizes="100vw"
          className="h-[250px] w-full rounded-t-3xl object-cover"
        />
      </div>
      <div className="flex w-full -translate-y-10 justify-center space-x-4">
        <div className="flex w-full flex-1 flex-col space-y-4">
          <Card className="flex-col items-start space-y-6 p-10">
            <div className="flex flex-row items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userData.image ?? ""} />
                <AvatarFallback>
                  {getUserAvatarFallback(userData)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold">{userData.name}</span>
                <span className="text-lg font-bold text-lime-600">
                  @{userData.handle}
                </span>
              </div>
            </div>
            <div>
              <span className="whitespace-pre">{userData.profile?.bio}</span>
            </div>
            <div className="flex flex-col gap-4">
              {userData.profile?.socialLinks.map((link) => (
                <Link key={link.id} link={link} />
              ))}
            </div>
          </Card>
          <Card className="flex-col items-start space-y-6 px-0 pb-0 pt-10">
            <h1 className="self-center px-10 text-2xl font-extrabold">
              Top Teappers ✨
            </h1>
            <TopTeapers teaps={userData.teaps} />
          </Card>
        </div>
        <Card className="flex h-full max-w-sm flex-col space-y-6 p-10">
          <Donate userId={userData.id} />
        </Card>
      </div>
    </div>
  );
}
