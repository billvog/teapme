"use client";

import { editThanksMessageAction } from "@/actions/profile/edit-thanks-message";
import Tab from "@/app/dashboard/settings/_components/tab";
import DonateThanksMessage from "@/components/donate-thanks-message";
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
import { ThumbsUp } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ProfileDonationsProps = {
  initialValues: z.infer<typeof profileThanksMessageSchema>;
  userHandle: string;
};

export default function ProfileDonations({
  initialValues,
  userHandle,
}: ProfileDonationsProps) {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof profileThanksMessageSchema>>({
    resolver: zodResolver(profileThanksMessageSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof profileThanksMessageSchema>) {
    startTransition(async () => {
      const response = await editThanksMessageAction(values);
      if (response.ok) {
        toast.success("Message updated!", { icon: <ThumbsUp size={20} /> });
        return;
      }

      toast.error("Something went wrong 😔");
    });
  }

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
              <div className="rounded border">
                <DonateThanksMessage
                  userHandle={userHandle}
                  message={form.watch("thankYouMessage")}
                />
              </div>
            </div>
            <Button type="submit" loading={isLoading}>
              Seems fine! 👌
            </Button>
          </form>
        </Form>
      </Tab.Content>
    </Tab>
  );
}
