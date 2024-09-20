"use server";

import { db } from "@/server/db";
import { utapi } from "@/server/uploadthing";
import { UploadedFileData } from "uploadthing/types";

export default async function profileUpdateAvatar(
  file: UploadedFileData,
  metadata: { userId: string },
) {
  let user = await db.user.findUnique({
    where: { id: metadata.userId },
    select: { image: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Save old image to delete it later
  const oldImage = user.image;

  user = await db.user.update({
    data: {
      image: file.url,
    },
    where: {
      id: metadata.userId,
    },
  });

  if (oldImage) {
    const imageKey = oldImage.split("/").pop()!;
    utapi.deleteFiles(imageKey); // delete image async
  }

  return { image: user.image };
}
