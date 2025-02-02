import { z } from "zod";
import { TypeSchema } from "./Type";
import { StateSchema } from "./State";
import { BacklogItemSchema } from "./BacklogItem";

export const CardSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  type: TypeSchema,
  state: StateSchema,
  backlogItem: z.optional(z.nullable(BacklogItemSchema)),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  purpose: z.string(),
});
export type Card = z.infer<typeof CardSchema>;
