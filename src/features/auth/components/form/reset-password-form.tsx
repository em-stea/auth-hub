"use client";

import { Link, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { toaster } from "@/shared/components/toaster/toaster";

import { resetPassword } from "../../service/password-recovery-action";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "../../squemas/password-recovery.squema";
import { Form } from "./form";
import { InputPasswordField } from "./input.password.form";
import { SubmitForm } from "./submit.form";

interface ResetPasswordFormProps {
  token?: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token ?? "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  if (!token) {
    return (
      <VStack gap="5" textAlign="center">
        <Text color="gray.700" textStyle="body.2">
          This recovery link is invalid.
        </Text>
        <Link asChild color="blue.500" textStyle="body.2.semibold">
          <NextLink href="/auth/forgot-password">Request a new link</NextLink>
        </Link>
      </VStack>
    );
  }

  return (
    <Form
      form={form}
      onSubmit={resetPassword}
      onSuccess={() => {
        toaster.success({
          description: "Your password has been updated. You can now log in.",
          closable: true,
        });
        router.push("/auth/login");
      }}
      onError={(error) => toaster.error({ description: error, closable: true })}
    >
      <VStack gap="4" mb="6">
        <InputPasswordField name="password" placeholder="Enter new password" label="New password" />
        <InputPasswordField
          name="confirmPassword"
          placeholder="Confirm new password"
          label="Confirm password"
        />
      </VStack>

      <SubmitForm w="full">Reset password</SubmitForm>
    </Form>
  );
}
