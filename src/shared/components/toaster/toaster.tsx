"use client";

import { CheckCircleFilledIcon, CrossCircleFilledIcon, CrossIcon } from "@/shared/components/icons";
import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

export function Toaster() {
  return (
    <Portal>
      <ChakraToaster insetInline={{ mdDown: "4" }} toaster={toaster}>
        {(toast) => (
          <Toast.Root data-status={toast.type}>
            {toast.type === "loading" ? (
              <Spinner color="blue.solid" size="sm" />
            ) : toast.type === "success" ? (
              <CheckCircleFilledIcon />
            ) : toast.type === "error" ? (
              <CrossCircleFilledIcon />
            ) : (
              <Toast.Indicator />
            )}
            <Stack flex="1" gap="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
            </Stack>
            {toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}

            <Toast.CloseTrigger>
              <CrossIcon />
            </Toast.CloseTrigger>
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
}
