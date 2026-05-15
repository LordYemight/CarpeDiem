import { z } from "zod";

export const scheduleCuttingSchema = z.object({
  workstation: z.string().min(1, "Workstation is required"),
  hours: z.string().min(1, "Hours are required").regex(/^\d+$/, "Must be a number"),
  date: z.string().min(1, "Schedule date is required"),
  operator: z.string().min(1, "Operator is required"),
});

export type ScheduleCuttingFormValues = z.infer<typeof scheduleCuttingSchema>;
