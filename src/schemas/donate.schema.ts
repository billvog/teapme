import { z } from "zod";

export const donateSchema = z.object({
  senderName: z.string().optional(),
  message: z.string().optional(),
  cupsAmount: z.number().int().positive(),
});
