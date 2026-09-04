"use client";

import { Box, Text } from "@chakra-ui/react";
import { createContext, ElementType, useCallback, useContext, useEffect, useRef } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

import { toaster } from "@/shared/components/toaster/toaster";
import { ActionResult } from "@/shared/types/action-result";

const FormSubmitContext = createContext<(() => Promise<void>) | null>(null);

export function useFormSubmit() {
  const submit = useContext(FormSubmitContext);

  if (!submit) {
    throw new Error("useFormSubmit must be used within a Form or ServerActionForm");
  }

  return submit;
}

interface FormProps<TFieldValues extends FieldValues, TData> {
  children: React.ReactNode;
  onSubmit?: (input: TFieldValues) => ActionResult<TData> | Promise<ActionResult<TData>>;
  form: UseFormReturn<TFieldValues>;
  onSuccess?: (data: TData) => void;
  onError?: (error: string) => void;
  as?: ElementType;
  asChild?: boolean;
}

export function Form<TFieldValues extends FieldValues, TData>({
  children,
  onSubmit,
  form,
  onSuccess,
  onError,
  as = "form",
  asChild,
}: FormProps<TFieldValues, TData>) {
  const handleSubmit = async (data: TFieldValues) => {
    if (!onSubmit) return;

    let result: ActionResult<TData>;

    try {
      result = await onSubmit(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado";

      result = { success: false, error: message };
    }

    if (result.success) {
      onSuccess?.(result.data);
    } else {
      if (onError) {
        onError(result.error);
      }

      if (!onError) {
        toaster.error({
          description: <Text textStyle="body.2.semibold">{result.error}</Text>,
          closable: true,
        });
      }
    }

    return result;
  };

  const handleSubmitRef = useRef(handleSubmit);

  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  });

  const triggerSubmit = useCallback(async () => {
    await form.handleSubmit((data) => handleSubmitRef.current(data))();
  }, [form]);

  if (asChild) {
    return (
      <FormProvider {...form}>
        <FormSubmitContext.Provider value={triggerSubmit}>{children}</FormSubmitContext.Provider>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...form}>
      <FormSubmitContext.Provider value={triggerSubmit}>
        <Box w="full">
          <Box as={as} onSubmit={onSubmit ? form.handleSubmit(handleSubmit) : undefined}>
            {children}
          </Box>
        </Box>
      </FormSubmitContext.Provider>
    </FormProvider>
  );
}
