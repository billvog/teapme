"use client";

import { PHProvider } from "@/app/_analytics/PostHogProvider";
import { AuthProvider } from "@/app/_contexts/AuthContext";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const PostHogPageView = dynamic(() => import("./_analytics/PostHogPageView"), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PHProvider>
          <PostHogPageView />
          {children}
        </PHProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
