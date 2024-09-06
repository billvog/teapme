"use client";

import { editProfileAction } from "@/actions/edit-profile";
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
import { Textarea } from "@/components/ui/textarea";
import { profileSchema } from "@/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ProfileFormProps = {
  initialValues: z.infer<typeof profileSchema>;
};

export default function ProfileForm({ initialValues }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    startTransition(async () => {
      const response = await editProfileAction(values);
      if (response.ok) {
        router.replace("/dashboard");
        toast.success("You're all ready!", { icon: <ThumbsUp size={20} /> });
        return;
      }

      toast.error("Something went wrong 😔");
    });
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>✍️ Edit Your Profile</CardTitle>
        <CardDescription>
          Customize your profile, and make it feel more like you.
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
      </CardContent>
    </Card>
  );
}
