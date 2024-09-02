import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Must be at least two characters")
    .max(50, "Must be at most 50 characters"),
  bio: z.string().max(160, "Must be at most 160 characters"),
});
