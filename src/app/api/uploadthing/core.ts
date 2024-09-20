import profileUpdateAvatar from "@/actions/profile/update-avatar";
import profileUpdateBanner from "@/actions/profile/update-banner";
import { auth } from "@/server/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  // Upload user avatar
  userProfileAvatar: f({
    image: { maxFileSize: "4MB", minFileCount: 1, maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) =>
      profileUpdateAvatar(file, metadata),
    ),
  // Upload user banner
  userProfileBanner: f({
    image: { maxFileSize: "4MB", minFileCount: 1, maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) =>
      profileUpdateBanner(file, metadata),
    ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
