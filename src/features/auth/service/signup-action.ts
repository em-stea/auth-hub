"use server";

import { hashPassword } from "@/shared/lib/password";
import { prisma } from "@/shared/lib/prisma";
import { ActionResult } from "@/shared/types/action-result";

import { signupFormSchema } from "../squemas/signup-form.squema";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const doSignup = async (data: SignupFormData): Promise<ActionResult<null>> => {
  const parsed = signupFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return {
      success: false,
      error: "An account with this email already exists",
    };
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    data: null,
  };
};
