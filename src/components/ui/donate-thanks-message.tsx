import Link from "next/link";
import React from "react";

type DonateThanksMessageProps = {
  handle?: string;
  message: string | null;
};

export default function DonateThanksMessage({
  handle,
  message,
}: DonateThanksMessageProps) {
  return (
    <div className="flex h-full min-h-[100px] w-full max-w-md flex-col items-center justify-center gap-10 p-10">
      <h1 className="text-2xl font-extrabold">Thanks for your Teap! ❤️</h1>
      {typeof message === "string" && (
        <div className="w-full whitespace-pre border-b-2 border-t-2 border-gray-200 py-8 text-center">
          {message}
        </div>
      )}
      {handle && (
        <Link
          href={`/@${handle}`}
          className="text-blue-500 underline-offset-4 hover:underline"
        >
          👈 Return to my page
        </Link>
      )}
    </div>
  );
}
