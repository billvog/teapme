import Link from "next/link";
import React from "react";

type DonateThanksMessageProps = {
  userHandle?: string;
  message: string;
};

export default function DonateThanksMessage({
  userHandle,
  message,
}: DonateThanksMessageProps) {
  return (
    <div className="flex h-full min-h-[100px] w-full flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-xl font-bold">Thanks for your Teap! ❤️</h1>
      <span className="whitespace-pre text-center">{message}</span>
      {userHandle && (
        <Link
          href={`/@${userHandle}`}
          className="text-blue-500 underline-offset-4 hover:underline"
        >
          👈 Return to my page
        </Link>
      )}
    </div>
  );
}
