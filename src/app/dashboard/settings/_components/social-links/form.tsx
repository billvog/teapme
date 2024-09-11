"use client";

import profileAddSocialLink from "@/actions/profile/add-social-link";
import { useAuth } from "@/app/_contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSocialPlatform, SocialLink } from "@/lib/social-links";
import { socialLinkSchema } from "@/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link2, Plus, Trash2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type CreateSocialLinkFormProps = {
  onClose: () => void;
};

export default function CreateSocialLinkForm({
  onClose,
}: CreateSocialLinkFormProps) {
  const { user } = useAuth();

  const [platform, setPlatform] = React.useState<SocialLink | null>(null);
  const PlatformIcon = platform?.icon;

  const form = useForm<z.infer<typeof socialLinkSchema>>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const watchUrl = form.watch("url");

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
    mutation.mutate(values, {
      onSuccess(data) {
        if (!data.ok) {
          toast.error("Something went wrong 😔");
          return;
        }

        toast.success("Social link added!");
        onClose();
      },
      onError() {
        toast.error("Something went wrong 😔");
      },
    });
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
            <Plus size={16} />
          </Button>
        )}
        <Button
          size="icon"
          type="button"
          variant="destructive"
          onClick={onClose}
        >
          <Trash2 size={16} />
        </Button>
      </form>
    </Form>
  );
}
