import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Must be at least two characters")
    .max(50, "Must be at most 50 characters"),
  bio: z.string().max(160, "Must be at most 160 characters"),
});

export const profileThanksMessageSchema = z.object({
  thankYouMessage: z.string().max(160, "Must be at most 160 characters"),
});

export const socialLinkSchema = z.object({
  title: z
    .string({ required_error: "Please describe what this link is" })
    .max(50, "Must be at most 50 characters"),
  url: z
    .string()
    .url({ message: "Invalid URL" })
    .trim()
    .max(255, "Must be at most 255 characters"),
});
