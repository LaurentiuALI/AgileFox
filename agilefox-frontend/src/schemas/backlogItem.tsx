import { z } from "zod";

export const backlogItemSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string(),
  type: z.string(),
  assignee: z.string().optional(),
});
