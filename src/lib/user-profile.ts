import { User } from "@prisma/client";

export function getUserAvatarFallback(user: User) {
  const name = user.name!;

  if (name.includes(" ")) {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

    return initials;
  }

  return name.substring(0, 2);
}
