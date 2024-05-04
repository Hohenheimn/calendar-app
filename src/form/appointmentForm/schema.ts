import { z } from "zod";

const appointmentSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  date: z.string().min(1, { message: "Date is required" }),
  status: z.string({ required_error: "Status is required" }).min(1, {
    message: "Status is required",
  }),
});

export default appointmentSchema;
