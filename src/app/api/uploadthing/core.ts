import { auth } from "@/server/auth";
import { db } from "@/server/db";
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
    .onUploadComplete(async ({ metadata, file }) => {
      // TODO -- delete old image
      const user = await db.user.update({
        data: {
          image: file.url,
        },
        where: {
          id: metadata.userId,
        },
      });

      return { image: user.image };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
