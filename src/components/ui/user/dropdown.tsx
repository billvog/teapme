"use client";

import { useAuth } from "@/app/_contexts/AuthContext";
import DropdownBuilder, {
  DropdownOptionGroup,
} from "@/components/ui/dropdown-builder";
import { UserAvatar } from "@/components/ui/user/avatar";
import { useRouter } from "next/navigation";
import React from "react";

const Options: DropdownOptionGroup[] = [
  {
    label: "Account",
    options: [
      {
        label: "Profile",
        href: "/dashboard/settings",
      },
      {
        label: "Donations",
        href: "/dashboard/settings/donations",
      },
      {
        type: "seperator",
      },
      {
        label: "Payments",
        href: "/dashboard/settings/payments",
      },
    ],
  },
];

export const UserDropdown = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <DropdownBuilder options={Options}>
      <UserAvatar user={user} />
    </DropdownBuilder>
  );
};
