"use client";

import { createStripeCheckoutSession } from "@/actions/stripe/create-checkout-session";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TEA_PRICE } from "@/constants";
import { getEmojiForDonation } from "@/lib/donate";
import { cn } from "@/lib/utils";
import { donateSchema } from "@/schemas/donate.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostHog } from "posthog-js/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const DonateOptions = [1, 2, 3];

type DonateProps = {
  userId: string;
};

export default function Donate({ userId }: DonateProps) {
  const posthog = usePostHog();

  const [isLoading, startTransition] = React.useTransition();
  const [canSubmit, setCanSubmit] = React.useState(true);

  const form = useForm<z.infer<typeof donateSchema>>({
    resolver: zodResolver(donateSchema),
    defaultValues: {
      senderName: "",
      message: "",
      cupsAmount: 1,
    },
  });

  const selectedCupsAmount = form.watch("cupsAmount");

  const teapEmoji = React.useMemo(
    () => getEmojiForDonation(selectedCupsAmount),
    [selectedCupsAmount],
  );

  const onCupsAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;

    if (targetValue.length === 0) {
      form.setValue("cupsAmount", 0);
      return;
    }

    const value = parseInt(targetValue, 10);
    if (value >= 0 && value <= 100) {
      form.setValue("cupsAmount", value);
    }
  };

  const onSuccess = (checkoutUrl: string) => {
    // Track the donation
    posthog.capture("donation", {
      receiver: { userId },
      cupsAmount: selectedCupsAmount,
      price: selectedCupsAmount * TEA_PRICE,
    });

    // Redirect to the checkout page
    window.location.href = checkoutUrl;
  };

  const onSubmit = async (values: z.infer<typeof donateSchema>) => {
    startTransition(async () => {
      const { ok, checkoutUrl } = await createStripeCheckoutSession(
        userId,
        values,
      );

      if (ok && checkoutUrl) {
        setCanSubmit(false);
        onSuccess(checkoutUrl);
        return;
      }

      toast.error("Failed to create a checkout session!");
    });
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      <span className="text-lg font-bold sm:text-xl">
        Get them a cup of tea.. <br />
        Teap 'em! <span className="ml-1">☕️</span>
      </span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="flex gap-3 sm:gap-2">
            {DonateOptions.map((option) => (
              <div
                key={option}
                className={cn(
                  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-4 sm:h-12 sm:w-12",
                  selectedCupsAmount === option
                    ? "border-blue-500"
                    : "border-gray-300",
                )}
                onClick={() => form.setValue("cupsAmount", option)}
              >
                <span className="text-lg font-bold sm:text-xl">{option}</span>
              </div>
            ))}
            <Input
              type="number"
              placeholder="Pick a number"
              className={cn(
                "border-gray h-12 max-w-36 flex-1 rounded-xl border-4 text-center text-xl font-bold shadow-none",
                DonateOptions.includes(selectedCupsAmount ?? -1)
                  ? "border-gray-300"
                  : "border-blue-500",
              )}
              value={selectedCupsAmount ?? ""}
              onChange={onCupsAmountChange}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="senderName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Say something nice 😊"
                      className="h-12 max-h-32"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            {selectedCupsAmount === 0 ? (
              <span className="text-sm sm:text-base">
                Select a number of cups to Teap!
              </span>
            ) : (
              <Button
                size="xl"
                type="submit"
                loading={isLoading}
                disabled={!canSubmit}
                className="w-full font-extrabold sm:w-max xl:w-full"
              >
                <span className="mr-2">{teapEmoji}</span>
                <span>Teap ${selectedCupsAmount * TEA_PRICE}</span>
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
