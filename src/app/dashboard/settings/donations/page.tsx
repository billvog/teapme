"use client";

import { profileEditThanksMessage } from "@/actions/profile/edit-thanks-message";
import { ContextUser, useAuth } from "@/app/_contexts/AuthContext";
import Tab from "@/app/dashboard/settings/_components/tab";
import DonateThanksMessage from "@/components/ui/donate-thanks-message";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { profileThanksMessageSchema } from "@/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThumbsUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Page() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof profileThanksMessageSchema>>({
    resolver: zodResolver(profileThanksMessageSchema),
    defaultValues: {
      thankYouMessage: user?.profile?.thankYouMessage ?? "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: profileEditThanksMessage,
  });

  async function onSubmit(values: z.infer<typeof profileThanksMessageSchema>) {
    mutate(values, {
      onSuccess(data) {
        if (!data.ok) {
          toast.error("Something went wrong 😔");
          return;
        }

        toast.success("Message updated!", { icon: <ThumbsUp size={20} /> });

        // Update cache
        queryClient.setQueryData<ContextUser>(["user", "me"], (old) =>
          old
            ? {
                ...old,
                profile: {
                  ...old.profile!,
                  thankYouMessage: values.thankYouMessage,
                },
              }
            : old,
        );
      },
      onError() {
        toast.error("Something went wrong 😔");
      },
    });
  }

  if (!user) return null;

  return (
    <Tab>
      <Tab.Header>
        <Tab.Title>🥰 Donations</Tab.Title>
        <Tab.Subtitle>Customize your fan's experience</Tab.Subtitle>
      </Tab.Header>
      <Tab.Content>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="thankYouMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thanks Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Say thanks to your fans!"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This message will be displayed to your fans after they
                    donate to you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h2 className="mb-2 text-xl">Preview</h2>
              <div className="flex justify-center rounded border">
                <DonateThanksMessage
                  handle={user.handle ?? ""}
                  message={form.watch("thankYouMessage")}
                />
              </div>
            </div>
            <Button type="submit" loading={isPending}>
              Seems fine! 👌
            </Button>
          </form>
        </Form>
      </Tab.Content>
    </Tab>
  );
}
