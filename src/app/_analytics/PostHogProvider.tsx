"use client";

import { useAuth } from "@/app/_contexts/AuthContext";
import { env } from "@/env";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React from "react";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false, // we will manually track page views
  });
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    if (user) {
      posthog.identify(user.id, {
        name: user.name,
        email: user.email,
      });

      return;
    }

    posthog.reset();
  }, [isLoading, user]);

  return children;
}
