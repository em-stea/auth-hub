"use client";

import { HStack, Link, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { toaster } from "@/shared/components/toaster/toaster";
import { ActionResult } from "@/shared/types/action-result";

import { doLogin } from "../../service/login-action";
import { doSignup } from "../../service/signup-action";
import { signupFormSchema } from "../../squemas/signup-form.squema";
import { Form } from "./form";
import { InputField } from "./input.form";
import { InputPasswordField } from "./input.password.form";
import { SubmitForm } from "./submit.form";

export const SignupForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return (
    <Form
      form={form}
      onSubmit={async (values): Promise<ActionResult<null>> => {
        const created = await doSignup(values);

        if (!created.success) {
          return created;
        }

        return doLogin({
          email: values.email,
          password: values.password,
        });
      }}
      onSuccess={() => {
        router.push("/auth/setup-passkey");
      }}
      onError={(error) => {
        toaster.error({ description: error, closable: true });
      }}
    >
      <VStack gap="4" mb="9">
        <InputField name="name" placeholder="Enter your name" label="Name" />
        <InputField name="email" placeholder="Enter email" label="Email" />
        <InputPasswordField name="password" placeholder="Create password" label="Password" />
        <InputPasswordField
          name="confirmPassword"
          placeholder="Confirm password"
          label="Confirm password"
        />
      </VStack>

      <SubmitForm w="full">Create account</SubmitForm>

      <HStack justifyContent="center" mt="6" gap="1">
        <Text textStyle="body.2" color="gray.500">
          Already have an account?
        </Text>
        <Link asChild color="blue.500" textStyle="body.2.semibold">
          <NextLink href="/auth/login">Log in</NextLink>
        </Link>
      </HStack>
    </Form>
  );
};
