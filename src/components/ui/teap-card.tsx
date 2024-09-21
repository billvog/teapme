"use client";

import { TEAP_PRICE_IN_CENTS } from "@/constants";
import { convertCentsToDollars } from "@/lib/currency";
import { getEmojiForDonation } from "@/lib/donate";
import { Teap } from "@prisma/client";
import React from "react";

type TeapCardProps = {
  teap: Teap;
};

export default function TeapCard({ teap }: TeapCardProps) {
  const convertedPrice = convertCentsToDollars(teap.price);
  const cupsAmount = teap.price / TEAP_PRICE_IN_CENTS;

  const teapEmoji = React.useMemo(
    () => getEmojiForDonation(cupsAmount),
    [cupsAmount],
  );

  return (
    <div className="flex w-full flex-col space-y-1 px-10 py-5">
      <div className="text-sm sm:text-base">
        <span className="font-extrabold">{teap.senderName ?? "Anonymous"}</span>
        <span className="text-gray-500"> teaped </span>
        <span className="font-extrabold">
          {convertedPrice} {teapEmoji}
        </span>
      </div>
      {!!teap.message && (
        <div className="whitespace-pre-wrap text-xs sm:text-sm">
          {teap.message}
        </div>
      )}
    </div>
  );
}
