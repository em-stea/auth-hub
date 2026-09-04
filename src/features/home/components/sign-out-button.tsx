"use client";

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <Button
      variant="primary"
      size="md"
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
    >
      Sign out
    </Button>
  );
}
