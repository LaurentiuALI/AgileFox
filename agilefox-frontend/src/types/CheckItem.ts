import { z } from "zod";

export const CheckItemSchema = z.object({
  id: z.number(),
  cardId: z.number(),
  checked: z.boolean(),
  information: z.string(),
});
export type CheckItem = z.infer<typeof CheckItemSchema>;
