import { z } from "zod";

export const onboardUserSchema = z.object({
  handle: z
    .string()
    .min(2, "Must be at least 2 characters")
    .max(20, "Must be at most 20 characters")
    .regex(/^[a-z0-9_]+$/, "Must be lowercase alphanumeric or underscore"),
});
