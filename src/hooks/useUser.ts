import { auth } from "@/server/auth";
import { db } from "@/server/db";

export default async function useUser() {
  const session = await auth();
  if (!session) return null;

  const user = db.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
}
