import { getUserProfile } from "@/actions/profile/get-profile";
import Thanks from "@/app/creator/[handle]/teaped/_components/Thanks";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page({ params }: { params: { handle: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user", params.handle, "profile"],
    queryFn: () => getUserProfile(params.handle),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Thanks userHandle={params.handle} />
    </HydrationBoundary>
  );
}
