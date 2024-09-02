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
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginCard() {
  const handleLogin = (provider: "google") => {
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔐 Login</CardTitle>
        <CardDescription>
          Connect with one of the supported providers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => handleLogin("google")}
          className="w-full"
          size={"lg"}
        >
          <FcGoogle size={20} />
        </Button>
      </CardContent>
    </Card>
  );
}
