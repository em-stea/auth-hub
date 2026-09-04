"use client";

import { Link, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { toaster } from "@/shared/components/toaster/toaster";

import { requestPasswordReset } from "../../service/password-recovery-action";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "../../squemas/password-recovery.squema";
import { Form } from "./form";
import { InputField } from "./input.form";
import { SubmitForm } from "./submit.form";

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  if (message) {
    return (
      <VStack gap="5" textAlign="center">
        <Text color="gray.700" textStyle="body.2">
          {message}
        </Text>
        <Link asChild color="blue.500" textStyle="body.2.semibold">
          <NextLink href="/auth/login">Back to log in</NextLink>
        </Link>
      </VStack>
    );
  }

  return (
    <Form
      form={form}
      onSubmit={requestPasswordReset}
      onSuccess={({ message: successMessage }) => setMessage(successMessage)}
      onError={(error) => toaster.error({ description: error, closable: true })}
    >
      <VStack gap="4" mb="6">
        <InputField name="email" placeholder="Enter email" label="Email" />
      </VStack>

      <SubmitForm w="full">Send recovery link</SubmitForm>

      <VStack mt="6">
        <Link asChild color="blue.500" textStyle="body.2.semibold">
          <NextLink href="/auth/login">Back to log in</NextLink>
        </Link>
      </VStack>
    </Form>
  );
}
