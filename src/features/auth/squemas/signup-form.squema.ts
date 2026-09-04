import z from "zod";

export const signupFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
    confirmPassword: z.string().min(5, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupFormSchema>;
