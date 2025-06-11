import { z } from "zod";
import { TypeSchema } from "./Type";
import { StateSchema } from "./State";

export const BacklogItemSchema = z.object({
  id: z.number(),
  uid: z.string(),
  projectId: z.number(),
  type: TypeSchema,
  state: StateSchema,
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string(),
  username: z.string().optional().nullable(),
  totalScore: z.number(),
  actualScore: z.number(),
});
export type BacklogItem = z.infer<typeof BacklogItemSchema>;
