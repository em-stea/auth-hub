import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: "Invalid recovery link" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
    confirmPassword: z.string().min(5, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
