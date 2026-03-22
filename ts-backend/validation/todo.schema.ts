import { z } from "zod";

export const todoValidationSchema = z.object({
  id: z.string().describe("ID of the todo"),
  title: z.string().describe("title of the todo"),
  description: z.string().optional().describe("description"),
  isCompleted: z.boolean().default(false).describe("if completed"),
});
