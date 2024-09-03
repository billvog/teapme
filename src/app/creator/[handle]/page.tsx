import UserProfile from "@/app/creator/[handle]/_components/user-profile";
import { db } from "@/server/db";
import React from "react";

export default async function Page({ params }: { params: { handle: string } }) {
  const user = await db.user.findUnique({
    where: {
      handle: params.handle,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return (
      <div>
        <span className="font-bold text-red-500">User not found!</span>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center space-x-4 p-10">
      <UserProfile user={user as any} />
    </div>
  );
}
