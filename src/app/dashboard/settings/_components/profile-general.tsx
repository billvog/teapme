"use client";

import { editProfileAction } from "@/actions/profile/edit-profile";
import Tab from "@/app/dashboard/settings/_components/tab";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema } from "@/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThumbsUp } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ProfileGeneralProps = {
  initialValues: z.infer<typeof profileSchema>;
};

export default function ProfileGeneral({ initialValues }: ProfileGeneralProps) {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    startTransition(async () => {
      const response = await editProfileAction(values);
      if (response.ok) {
        toast.success("Profile updated!", { icon: <ThumbsUp size={20} /> });
        return;
      }

      toast.error("Something went wrong 😔");
    });
  }

  return (
    <Tab>
      <Tab.Header>
        <Tab.Title>✍️ Edit Your Profile</Tab.Title>
        <Tab.Subtitle>
          Customize your profile, and make it feel more like you.
        </Tab.Subtitle>
      </Tab.Header>
      <Tab.Content>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be shown on your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell your audience a little bit about yourself..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" loading={isLoading}>
              Seems fine! 👌
            </Button>
          </form>
        </Form>
      </Tab.Content>
    </Tab>
  );
}
