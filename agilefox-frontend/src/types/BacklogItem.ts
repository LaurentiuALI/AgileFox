import { z } from "zod";

// export type BacklogItem = {
//   id: number;
//   uid: string;
//   projectId: string;
//   typeName: string;
//   stateName: string;
//   title: string;
//   description: string;
// };

export const BacklogItem = z.object({
  id: z.number(),
  uid: z.string(),
  projectId: z.string(),
  typeName: z.string(),
  stateName: z.string(),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string(),
});

// export const backlogItemSchema = z.object({
//   title: z.string().min(3, {
//     message: "Title must be at least 3 characters.",
//   }),
//   description: z.string(),
//   type: z.string(),
//   state: z.string(),
// });
