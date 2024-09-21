import { env } from "@/env";
import { PostHog } from "posthog-node";

export function PostHogClient() {
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });

  return posthogClient;
}

/**
 * Helper that created a client, runs a callback, and then shuts down the client.
 */
export async function WithPostHogClient(callback: (client: PostHog) => void) {
  const posthogClient = PostHogClient();
  callback(posthogClient);
  await posthogClient.shutdown();
}
