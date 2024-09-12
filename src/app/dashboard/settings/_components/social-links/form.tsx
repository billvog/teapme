"use client";

import profileAddSocialLink from "@/actions/profile/add-social-link";
import { profileGetSocialLinks } from "@/actions/profile/get-social-links";
import { useAuth } from "@/app/_contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSocialPlatform, SocialLink } from "@/lib/social-links";
import { socialLinkSchema } from "@/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialLink as SocialLinkModel } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Link2, Plus, Trash2, X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type SocialLinkFormProps = {
  link?: SocialLinkModel; // to edit
  onClose?: () => void;
};

export default function SocialLinkForm({ link, onClose }: SocialLinkFormProps) {
  const { user } = useAuth();

  const [platform, setPlatform] = React.useState<SocialLink | null>(null);
  const PlatformIcon = platform?.icon;

  const SubmitIcon = link ? Check : Plus;
  const CancelButton = link ? X : Trash2;

  const form = useForm<z.infer<typeof socialLinkSchema>>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      title: link ? link.title : "",
      url: link ? link.url : "",
    },
  });

  const watchUrl = form.watch("url");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: profileAddSocialLink,
  });

  React.useEffect(() => {
    if (!watchUrl) {
      setPlatform(null);
      return;
    }

    setPlatform(getSocialPlatform(watchUrl));
  }, [watchUrl]);

  const onSubmit = async (values: z.infer<typeof socialLinkSchema>) => {
    mutation.mutate(
      { id: link ? link.id : undefined, values },
      {
        onSuccess(data) {
          if (!data.ok || !data.link) {
            toast.error("Something went wrong 😔");
            return;
          }

          toast.success(
            (link ? "Social link updated" : "Social link added") + "!",
          );

          onClose?.();

          // Update cache
          queryClient.setQueryData<
            Awaited<ReturnType<typeof profileGetSocialLinks>>
          >(["profile", user!.profile!.id, "social-links"], (old) => {
            if (!old) return old;

            if (link) {
              return old.map((l) => (l.id === link.id ? data.link : l));
            }

            return [...old, data.link];
          });
        },
        onError() {
          toast.error("Something went wrong 😔");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-row items-center gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-8 items-center justify-center">
          {PlatformIcon ? <PlatformIcon size={20} /> : <Link2 size={16} />}
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="My teapme ☕️" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder={`https://teapme.com/@${user?.handle ?? "someone"}`}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.formState.isValid && (
          <Button
            size="icon"
            variant="outline"
            type="submit"
            loading={mutation.isPending}
          >
            <SubmitIcon size={16} />
          </Button>
        )}
        <Button
          size="icon"
          type="button"
          variant={link ? "outline" : "destructive"}
          onClick={onClose}
        >
          <CancelButton size={16} color={link ? "red" : "white"} />
        </Button>
      </form>
    </Form>
  );
}
