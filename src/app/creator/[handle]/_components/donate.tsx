"use client";

import { stripeCreateCheckoutSessionAction } from "@/actions/stripe/create-checkout-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

const teapEmojiLevels: Array<{ emoji: string; max: number }> = [
  { emoji: "☕️", max: 2 },
  { emoji: "🍵", max: 3 },
  { emoji: "🫖", max: 4 },
  { emoji: "🫣", max: 5 },
  { emoji: "🫨", max: 100 },
  { emoji: "⭐️", max: Infinity },
];

type DonateProps = {
  userId: string;
};

export default function Donate({ userId }: DonateProps) {
  const options = [1, 2, 3];
  const unitPrice = 3;

  const [isLoading, startTransition] = React.useTransition();

  const [selected, setSelected] = React.useState<number | null>(
    options[0] || 1,
  );

  const [message, setMessage] = React.useState<string>(String());

  const teapEmoji = React.useMemo(() => {
    if (!selected || selected === 0) {
      return null;
    }

    const level = teapEmojiLevels.find((level) => selected < level.max);
    return level?.emoji ?? "☕️";
  }, [selected]);

  const onSubmit = async () => {
    startTransition(async () => {
      if (!selected) {
        return;
      }

      const { ok, checkoutUrl } = await stripeCreateCheckoutSessionAction(
        userId,
        message,
        selected,
      );

      if (ok && checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }

      toast.error("Failed to create a checkout session");
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <span className="text-xl font-bold">
        Get them a cup of tea.. <br />
        Teap 'em! <span className="ml-1">☕️</span>
      </span>
      <div className="flex space-x-2">
        {options.map((option) => (
          <div
            key={option}
            className={cn(
              "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-4",
              selected === option ? "border-blue-500" : "border-gray-300",
            )}
            onClick={() => setSelected(option)}
          >
            <span className="text-xl font-bold">{option}</span>
          </div>
        ))}
        <Input
          type="number"
          placeholder="Pick a number"
          className={cn(
            "border-gray h-12 flex-1 rounded-xl border-4 text-center text-xl font-bold shadow-none",
            options.includes(selected ?? -1)
              ? "border-gray-300"
              : "border-blue-500",
          )}
          value={selected ?? ""}
          onChange={(e) => {
            const targetValue = e.target.value;
            if (targetValue.length === 0) {
              setSelected(null);
              return;
            }

            const value = parseInt(targetValue, 10);
            if (value >= 0 && value <= 100) {
              setSelected(value);
            }
          }}
        />
      </div>
      <div>
        <Textarea
          placeholder="Say something nice.."
          className="border-gray h-12 max-h-32 flex-1 rounded-xl border-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        {!selected ? (
          <span className="text-base">Select a number of cups to Teap!</span>
        ) : (
          <Button
            size="xl"
            onClick={onSubmit}
            loading={isLoading}
            className="w-full text-lg font-extrabold"
          >
            <span className="mr-2">{teapEmoji}</span>
            <span>Teap ${selected * unitPrice}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
