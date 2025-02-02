// Type.ts
import { z } from "zod";

export const TypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

export type Type = z.infer<typeof TypeSchema>;
