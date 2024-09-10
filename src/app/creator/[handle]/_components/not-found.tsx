import React from "react";

export default function CreatorNotFound({ handle }: { handle: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-2xl font-extrabold text-red-600">
        Creator <span className="underline underline-offset-2">@{handle}</span>{" "}
        not found.
      </h1>
      <p>Please check the handle in the URL and try again.</p>
    </div>
  );
}
