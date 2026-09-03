"use client";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "@/shared/styles/theme";

import { EmotionRegistry } from "./emotion-registry.provider";

export function ChakraUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ChakraProvider value={theme}>{children}</ChakraProvider>
    </EmotionRegistry>
  );
}
