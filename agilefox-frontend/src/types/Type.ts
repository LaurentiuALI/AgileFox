// Type.ts
import { z } from "zod";

export const TypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  projectId: z.number(),
});

export type Type = z.infer<typeof TypeSchema>;
