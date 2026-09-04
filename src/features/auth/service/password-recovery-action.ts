"use server";

import { createHash, randomBytes } from "node:crypto";

import { sendPasswordResetEmail } from "@/shared/lib/mail";
import { hashPassword } from "@/shared/lib/password";
import { prisma } from "@/shared/lib/prisma";
import { ActionResult } from "@/shared/types/action-result";

import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ForgotPasswordValues,
  type ResetPasswordValues,
} from "../squemas/password-recovery.squema";

const TOKEN_TTL_MS = 60 * 60 * 1000;
const SUCCESS_MESSAGE = "If an account exists for that email, a recovery link has been sent.";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function requestPasswordReset(
  data: ForgotPasswordValues,
): Promise<ActionResult<{ message: string }>> {
  const parsed = forgotPasswordSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: parsed.data.email.trim(),
        mode: "insensitive",
      },
    },
    select: { id: true, email: true },
  });

  if (!user?.email) {
    return { success: true, data: { message: SUCCESS_MESSAGE } };
  }

  const token = randomBytes(32).toString("hex");
  const hashedToken = hashToken(token);
  const identifier = `password-reset:${user.id}`;

  await prisma.$transaction([
    prisma.verificationToken.deleteMany({ where: { identifier } }),
    prisma.verificationToken.create({
      data: {
        identifier,
        token: hashedToken,
        expires: new Date(Date.now() + TOKEN_TTL_MS),
      },
    }),
  ]);

  const appUrl = process.env.AUTH_URL ?? "http://localhost:3000";
  const resetUrl = new URL("/auth/reset-password", appUrl);
  resetUrl.searchParams.set("token", token);

  try {
    await sendPasswordResetEmail(user.email, resetUrl.toString());
  } catch {
    await prisma.verificationToken.deleteMany({
      where: { identifier, token: hashedToken },
    });

    return {
      success: false,
      error: "The recovery email could not be sent. Please try again later.",
    };
  }

  return { success: true, data: { message: SUCCESS_MESSAGE } };
}

export async function resetPassword(data: ResetPasswordValues): Promise<ActionResult<null>> {
  const parsed = resetPasswordSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const storedToken = await prisma.verificationToken.findFirst({
    where: { token: hashToken(parsed.data.token) },
  });

  if (
    !storedToken ||
    !storedToken.identifier.startsWith("password-reset:") ||
    storedToken.expires <= new Date()
  ) {
    if (storedToken?.identifier.startsWith("password-reset:")) {
      await prisma.verificationToken.deleteMany({
        where: {
          identifier: storedToken.identifier,
          token: storedToken.token,
        },
      });
    }

    return {
      success: false,
      error: "This recovery link is invalid or has expired.",
    };
  }

  const userId = storedToken.identifier.replace("password-reset:", "");
  const password = await hashPassword(parsed.data.password);

  const consumed = await prisma.$transaction(async (transaction) => {
    const deleted = await transaction.verificationToken.deleteMany({
      where: {
        identifier: storedToken.identifier,
        token: storedToken.token,
        expires: { gt: new Date() },
      },
    });

    if (deleted.count !== 1) return false;

    await transaction.user.update({
      where: { id: userId },
      data: { password },
    });

    return true;
  });

  if (!consumed) {
    return {
      success: false,
      error: "This recovery link is invalid or has expired.",
    };
  }

  return { success: true, data: null };
}
