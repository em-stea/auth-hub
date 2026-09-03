import z from "zod";

export const loginFormSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
});
