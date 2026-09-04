"use client";

import { Button, ClientOnly, Dialog, Portal, Text, VStack } from "@chakra-ui/react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

import { PasskeyButton } from "./passkey-button";

const STORAGE_KEY = "passkey-prompt-snooze-until";
const SNOOZE_MS = 30 * 60 * 1000; // 30 minutes

export function AddPasskeyModal() {
  return (
    <ClientOnly>
      <AddPasskeyModalContent />
    </ClientOnly>
  );
}

function AddPasskeyModalContent() {
  const [snoozeUntil, setSnoozeUntil] = useLocalStorage<number | null>(STORAGE_KEY, null);
  const [open, setOpen] = useState(
    () => snoozeUntil === null || Date.now() >= snoozeUntil,
  );

  const handleDismiss = () => {
    setSnoozeUntil(Date.now() + SNOOZE_MS);
    setOpen(false);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) handleDismiss();
      }}
      placement="center"
      size="sm"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="3xl" p="3">
            <Dialog.Header pb="1.5">
              <Dialog.Title textStyle="title.4" color="neutral.1000">
                Add a passkey
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body pb="3">
              <Text textStyle="body.2" color="gray.500">
                Save a passkey on this device so you can sign in without a password next time.
              </Text>
            </Dialog.Body>

            <Dialog.Footer>
              <VStack w="full" gap="3" align="stretch">
                <PasskeyButton action="register" label="Add passkey" size="md" w="full" />
                <Button
                  variant="ghost"
                  size="md"
                  w="full"
                  color="blue.800"
                  _hover={{ color: "blue.900" }}
                  _focus={{ color: "blue.900" }}
                  onClick={handleDismiss}
                >
                  Remind me later
                </Button>
              </VStack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
