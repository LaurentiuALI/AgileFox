import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  created: z.date(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});
export type User = z.infer<typeof UserSchema>;
