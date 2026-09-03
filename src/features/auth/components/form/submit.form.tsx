"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import { useFormState } from "react-hook-form";

interface SubmitFormProps extends ButtonProps {
  children: React.ReactNode;
}

export const SubmitForm = ({ children, ...props }: SubmitFormProps) => {
  const { isSubmitting, disabled } = useFormState();

  return (
    <Button type="submit" variant="primary" loading={isSubmitting} disabled={disabled} {...props}>
      {children}
    </Button>
  );
};
