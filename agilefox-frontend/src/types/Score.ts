import { z } from "zod";

export const ScoreSchema = z.object({
  totalScore: z.number(),
  actualScore: z.number(),
});
export type Score = z.infer<typeof ScoreSchema>;
