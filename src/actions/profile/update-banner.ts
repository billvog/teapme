"use server";

import { db } from "@/server/db";
import { utapi } from "@/server/uploadthing";
import { UploadedFileData } from "uploadthing/types";

export default async function profileUpdateBanner(
  file: UploadedFileData,
  metadata: { userId: string },
) {
  let profile = await db.profile.findUnique({
    where: { userId: metadata.userId },
    select: { banner: true },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  // Save old image to delete it later
  const oldImage = profile.banner;

  profile = await db.profile.update({
    data: {
      banner: file.url,
    },
    where: {
      userId: metadata.userId,
    },
    select: { banner: true },
  });

  if (oldImage) {
    const imageKey = oldImage.split("/").pop()!;
    utapi.deleteFiles(imageKey); // delete image async
  }

  return { image: profile.banner };
}
