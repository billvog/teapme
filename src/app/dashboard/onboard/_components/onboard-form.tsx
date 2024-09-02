"use client";

import { onboardUserAction } from "@/actions/onboard-user";
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
import { PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function OnboardForm() {
  const [isLoading, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof onboardUserSchema>>({
    resolver: zodResolver(onboardUserSchema),
    defaultValues: {
      handle: "",
    },
  });

  async function onSubmit(values: z.infer<typeof onboardUserSchema>) {
    startTransition(async () => {
      const response = await onboardUserAction(values);
      if (response.ok) {
        router.replace("/dashboard");
        toast.success("You're all set!", { icon: <PartyPopper size={20} /> });
        return;
      }

      toast.error("You entered an invalid handle!");
    });
  }

  return (
    <Card className="flex w-full max-w-lg flex-col items-center justify-center p-8">
      <CardHeader className="text-center">
        <CardTitle>🥳 Welcome!</CardTitle>
        <CardDescription>
          It's great to have you! <br />
          Now you can pick your handle:
        </CardDescription>
      </CardHeader>
      <CardContent className="flex w-full justify-center">
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
            <Button type="submit" loading={isLoading}>
              Let's Go!
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
