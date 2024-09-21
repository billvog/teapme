"use client";

import { profileEdit } from "@/actions/profile/edit-profile";
import { ContextUser, useAuth } from "@/app/_contexts/AuthContext";
import SocialLinks from "@/app/dashboard/settings/_components/social-links";
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
import { UserAvatar } from "@/components/ui/user/avatar";
import EditAvatarModal from "@/components/ui/user/edit-avatar-modal";
import EditBannerModal from "@/components/ui/user/edit-banner-modal";
import { profileSchema } from "@/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Page() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      bio: user?.profile?.bio ?? "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: profileEdit,
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    mutate(values, {
      onSuccess(data) {
        if (!data.ok) {
          toast.error("Something went wrong 😔");
          return;
        }

        toast.success("Profile updated!", { icon: <ThumbsUp size={20} /> });

        // Update cache
        queryClient.setQueryData<ContextUser>(["user", "me"], (old) =>
          old
            ? {
                ...old,
                name: values.name,
                profile: {
                  ...old.profile!,
                  bio: values.bio,
                },
              }
            : null,
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
        <Tab.Title>✍️ Edit Your Profile</Tab.Title>
        <Tab.Subtitle>
          Customize your profile, and make it feel more like you.
        </Tab.Subtitle>
      </Tab.Header>
      <Tab.Content className="flex flex-col gap-10">
        {/* Avatar & Banner */}
        <div className="relative">
          <EditBannerModal />
          <div className="absolute -bottom-4 left-5">
            <EditAvatarModal />
          </div>
        </div>
        {/* Name & Bio */}
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
            <Button type="submit" loading={isPending}>
              Seems fine! 👌
            </Button>
          </form>
        </Form>
        {/* Social Links */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-bold sm:text-2xl">Social Links</h2>
            <p className="text-xs text-gray-600 sm:text-sm">
              You can add links to your social media profiles here. They will be
              displayed on your profile.
            </p>
          </div>
          {user.profile && <SocialLinks userProfileId={user.profile.id} />}
        </div>
      </Tab.Content>
    </Tab>
  );
}
