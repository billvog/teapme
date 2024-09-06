"use client";

import { convertCentsToDollars } from "@/lib/currency";
import { Teap } from "@prisma/client";
import React from "react";

type TeapCardProps = {
  teap: Teap;
};

export default function TeapCard({ teap }: TeapCardProps) {
  const convertedPrice = convertCentsToDollars(teap.price);

  return (
    <div className="flex w-full flex-col">
      <span>Received {convertedPrice} teap!</span>
      <span>
        Their message: <b>{teap.message}</b>
      </span>
    </div>
  );
}
