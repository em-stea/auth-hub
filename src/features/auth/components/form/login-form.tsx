"use client";

import { HStack, Separator, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toaster } from "@/shared/components/toaster/toaster";

import { loginFormSchema } from "../../squemas/login-form.squema";
import { Form } from "./form";
import { InputField } from "./input.form";
import { InputPasswordField } from "./input.password.form";
import { SubmitForm } from "./submit.form";
import { useRouter } from "next/navigation";
import { doLogin } from "../../service/login-action";
import { SOCIAL_ICONS_DATA } from "../../data/social-icons.data";
import { SocialButton } from "@/shared/components/social-button/social.button";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return (
    <Form
      form={form}
      onSubmit={(values) => {
        return doLogin(values);
      }}
      onSuccess={() => {
        router.push("/");
      }}
      onError={(error) => {
        toaster.error({ description: error, closable: true });
      }}
    >
      <VStack gap="4" mb="9">
        <InputField name="email" placeholder="Enter email" label="Email" />
        <InputPasswordField name="password" placeholder="Enter password" label="Password" />
      </VStack>

      <SubmitForm w="full">Log in</SubmitForm>

      <HStack justifyContent="center" my="6">
        <Separator color="gray.500" w="full" />
        <Text textStyle="button.3" color="gray.500" whiteSpace="nowrap">
          or continue with
        </Text>
        <Separator color="gray.500" w="full" />
      </HStack>

      <VStack gap="3">
        {SOCIAL_ICONS_DATA.map((social) => (
          <SocialButton
            key={social.type}
            icon={social.icon}
            color={social.color}
            name={social.name}
            provider={social.provider}
          />
        ))}
      </VStack>
    </Form>
  );
};
