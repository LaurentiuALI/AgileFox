import { z } from "zod";

export const StateSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  projectId: z.number(),
});

export type State = z.infer<typeof StateSchema>;
