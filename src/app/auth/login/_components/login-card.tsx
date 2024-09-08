"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function LoginCard() {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (searchParams.get("error")) {
      toast.error("An error occurred while signing in.");
    }
  }, [searchParams]);

  const handleLogin = (provider: "google") => {
    setIsLoading(true);
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <Card className="h-[300px] p-10">
      <CardHeader className="text-center">
        <CardTitle>🔐 Login</CardTitle>
        <CardDescription>
          Create, or connect, to your Teapme account. <br />
          Use one of the following providers to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => handleLogin("google")}
          loading={isLoading}
          size="lg"
        >
          <FcGoogle size={20} />
          <span className="ml-2">Sign in with Google</span>
        </Button>
      </CardContent>
    </Card>
  );
}
