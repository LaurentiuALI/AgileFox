import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string(),
  estimation_type: z.enum(["story_points", "days"], {
    message: "Estimation type must be either story points or days.",
  }),
  abbreviation: z.string().max(5, {
    message: "Abbreviation must be at most 5 characters.",
  }),
});
