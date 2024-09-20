import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserAvatarFallback } from "@/lib/user-profile";
import { User } from "@prisma/client";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const avatarVariants = cva(undefined, {
  variants: {
    size: {
      default: "h-9 w-9",
      lg: "h-20 w-20",
    },
  },
});

type UserAvatarProps = VariantProps<typeof avatarVariants> & {
  user: User;
};

export const UserAvatar = ({ user, size }: UserAvatarProps) => {
  return (
    <Avatar className={avatarVariants({ size })}>
      <AvatarImage src={user.image ?? undefined} />
      <AvatarFallback>{getUserAvatarFallback(user)}</AvatarFallback>
    </Avatar>
  );
};
