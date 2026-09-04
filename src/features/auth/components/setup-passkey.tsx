"use client";

import { Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { PasskeyButton } from "./passkey-button";

export function SetupPasskey() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return null;
  }

  return (
    <VStack gap="4" align="stretch">
      <Text textStyle="body.2" color="gray.500" textAlign="center">
        Save a passkey on this device so you can sign in without a password next time.
      </Text>

      <PasskeyButton action="register" label="Save passkey" />

      <Button variant="ghost" size="md" w="full" onClick={() => router.push("/")}>
        Skip for now
      </Button>
    </VStack>
  );
}
