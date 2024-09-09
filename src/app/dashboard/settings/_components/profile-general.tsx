"use client";

import { editProfileAction } from "@/actions/profile/edit-profile";
import EditAvatarDialog from "@/app/dashboard/settings/_components/dialogs/edit-avatar";
import Tab from "@/app/dashboard/settings/_components/tab";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { Profile, User } from "@prisma/client";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ProfileGeneralProps = {
  initialValues: z.infer<typeof profileSchema>;
  user: User & {
    profile: Profile;
  };
};

export default function ProfileGeneral({
  initialValues,
  user,
}: ProfileGeneralProps) {
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
      <Tab.Content className="flex flex-col gap-10">
        <div className="group relative">
          <Image
            alt="banner"
            src={user.profile.banner ?? ""}
            width={0}
            height={0}
            sizes="100vw"
            className="h-[200px] w-full object-cover"
          />
          <div className="absolute -bottom-4 left-5 flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20 cursor-pointer self-center">
              <AvatarImage src={user.image!} />
              <EditAvatarDialog />
            </Avatar>
            <div className="cursor-pointer rounded-xl bg-black bg-opacity-50 px-3 py-1 text-sm text-white opacity-0 group-hover:opacity-100">
              Change Banner
            </div>
          </div>
        </div>
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
