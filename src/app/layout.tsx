import type { Metadata } from "next";

import { ChakraUIProvider } from "@/shared/config/providers/chakra-ui.provider";

import { NextAuthProvider } from "@/shared/config/providers/session.provider";
import { variablesForHtml } from "@/shared/styles/fonts";

export const metadata: Metadata = {
  title: "Auth Hub",
  description: "Next 16 and React 19 auth hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={variablesForHtml}>
      <body suppressHydrationWarning>
        <NextAuthProvider>
          <ChakraUIProvider>{children}</ChakraUIProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
