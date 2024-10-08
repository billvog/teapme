"use client";

import { userOnboard } from "@/actions/user/onboard";
import { ContextUser, useAuth } from "@/app/_contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { onboardUserSchema } from "@/schemas/onboard-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function OnboardForm() {
  const router = useRouter();
  const posthog = usePostHog();
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const form = useForm<z.infer<typeof onboardUserSchema>>({
    resolver: zodResolver(onboardUserSchema),
    defaultValues: {
      handle: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: userOnboard,
  });

  async function onSubmit(values: z.infer<typeof onboardUserSchema>) {
    mutate(values, {
      onSuccess(data) {
        if (!data.ok) {
          toast.error("Something went wrong 😔");
          return;
        }

        // Update cache
        queryClient.setQueryData<ContextUser>(["user", "me"], (old) =>
          old
            ? {
                ...old,
                handle: values.handle,
              }
            : null,
        );

        // Track the user onboard
        posthog.capture("user_onboard", {
          userId: user?.id,
          handle: values.handle,
        });

        toast.success("You're all set!", { icon: <PartyPopper size={20} /> });
        router.replace("/dashboard");
      },
      onError() {
        toast.error("You entered an invalid handle!");
      },
    });
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader className="text-center">
        <CardTitle>🥳 Welcome!</CardTitle>
        <CardDescription>
          It's great to have you! <br />
          Now you can pick your handle:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your audience will find you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" loading={isPending}>
              Let's Go!
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
