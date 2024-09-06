"use client";

import Donate from "@/app/creator/[handle]/_components/donate";
import TopTeapers from "@/app/creator/[handle]/_components/top-teapers";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Profile, Teap, User } from "@prisma/client";

type UserProfileProps = {
  user: User & {
    profile: Profile;
    teaps: Teap[];
  };
};

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <>
      <div className="flex h-full w-full max-w-2xl flex-col space-y-4">
        <Card className="flex-col items-start space-y-6 p-10">
          <div className="flex flex-row items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image ?? ""} />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold">{user.name}</span>
              <span className="text-lg font-bold text-lime-600">
                @{user.handle}
              </span>
            </div>
          </div>
          <div>
            <span className="whitespace-pre">{user.profile.bio}</span>
          </div>
        </Card>
        <Card className="flex-col items-start space-y-6 p-10">
          <h1 className="self-center text-2xl font-extrabold">
            Top Teappers ✨
          </h1>
          <TopTeapers teaps={user.teaps} />
        </Card>
      </div>
      <Card className="flex h-full max-w-sm flex-col space-y-6 p-10">
        <Donate userId={user.id} />
      </Card>
    </>
  );
}
