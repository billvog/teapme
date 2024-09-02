"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

type NavbarProps = {
  avatar?: string;
};

export default function Navbar({ avatar }: NavbarProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="m-10 flex w-full max-w-2xl justify-between rounded-xl bg-lime-300 bg-opacity-40 px-8 py-4 text-lg font-bold backdrop-blur backdrop-filter">
        <div className="flex items-center gap-8">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="#">Supporters</Link>
        </div>
        <div>
          <Link href="/dashboard/profile">
            <Avatar>
              <AvatarImage src={avatar} />
            </Avatar>
          </Link>
        </div>
      </div>
    </div>
  );
}
