"use server";

import { getUserProfile } from "@/actions/profile/get-profile";
import UserProfile from "@/app/creator/[handle]/_components/user-profile";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { handle: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user", params.handle],
    queryFn: () => getUserProfile(params.handle),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProfile userHandle={params.handle} />
    </HydrationBoundary>
  );
}
