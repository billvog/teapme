import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserAvatarFallback } from "@/lib/user-profile";
import { User } from "@prisma/client";
import React from "react";

type UserAvatarProps = {
  user: User;
};

export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={user.image ?? undefined} />
      <AvatarFallback>{getUserAvatarFallback(user)}</AvatarFallback>
    </Avatar>
  );
};
