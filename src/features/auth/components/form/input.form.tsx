"use client";

import { Input, Field } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label?: string;
  placeholder: string;
  helperText?: string;
}

export const InputField = ({ name, label, placeholder, helperText }: InputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field.Root invalid={fieldState.invalid} data-invalid={fieldState.invalid}>
          {label && (
            <Field.Label color="neutral.900" textStyle="body.2.semibold">
              {label} <Field.RequiredIndicator />
            </Field.Label>
          )}
          <Input {...field} aria-invalid={fieldState.invalid} placeholder={placeholder} />
          {helperText && <Field.HelperText>{helperText}</Field.HelperText>}

          {fieldState.invalid && (
            <Field.ErrorText color="red.700">{fieldState.error?.message}</Field.ErrorText>
          )}
        </Field.Root>
      )}
    />
  );
};
