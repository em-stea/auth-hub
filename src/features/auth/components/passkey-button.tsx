"use client";

import { Button, ButtonProps, Icon, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/webauthn";
import { useState } from "react";

import { KeyIcon } from "@/shared/components/icons";
import { toaster } from "@/shared/components/toaster/toaster";

interface PasskeyButtonProps {
  action?: "authenticate" | "register";
  label?: string;
  size?: ButtonProps["size"];
  w?: ButtonProps["w"];
  variant?: ButtonProps["variant"];
}

export const PasskeyButton = ({
  action = "authenticate",
  label = action === "register" ? "Register passkey" : "Continue with Passkey",
  size = "xl",
  w = "full",
  variant = action === "register" ? "primary" : "secondary",
}: PasskeyButtonProps) => {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const isRegister = action === "register";

  // Auth.js only accepts registration while signed in. Authentication always works.
  if (isRegister && status !== "authenticated") {
    return null;
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      w={w}
      loading={isLoading}
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        try {
          // Without an explicit callbackUrl, next-auth/webauthn returns to the current page.
          await signIn("passkey", { action, callbackUrl: "/" });
        } catch {
          toaster.error({
            description: isRegister
              ? "Could not register passkey"
              : "No passkey available for this device. Sign in and register one first.",
            closable: true,
          });
          setIsLoading(false);
        }
      }}
    >
      <Icon as={KeyIcon} />
      <Text textStyle="button.3">{label}</Text>
    </Button>
  );
};
