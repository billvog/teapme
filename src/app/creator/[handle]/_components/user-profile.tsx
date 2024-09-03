import TeaSelect from "@/app/creator/[handle]/_components/tea-select";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Profile, User } from "@prisma/client";
import React from "react";

type UserProfileProps = {
  user: User & {
    profile: Profile;
  };
};

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <>
      <div className="flex h-full w-full max-w-2xl flex-col space-y-4 rounded-xl bg-white p-10 shadow-sm">
        <div className="flex flex-row items-center space-x-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user.image ?? ""} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold">{user.name}</span>
            <span className="font-bold text-gray-400">@{user.handle}</span>
          </div>
        </div>
        <div>
          <span>{user.profile.bio}</span>
        </div>
      </div>
      <div className="h-full w-full max-w-sm rounded-xl bg-white p-10 shadow-sm">
        <TeaSelect />
      </div>
    </>
  );
}
