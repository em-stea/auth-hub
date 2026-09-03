"use client";

import { IconButton } from "@/shared/components/icon-button/icon-button";
import { EyeClosedIcon, EyeIcon } from "@/shared/components/icons";
import { Input, Field, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label?: string;
  placeholder: string;
  helperText?: string;
}

export const InputPasswordField = ({ name, label, placeholder, helperText }: InputProps) => {
  const { control } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
          <InputGroup
            endElement={
              showPassword ? (
                <IconButton
                  aria-label="Hide password"
                  icon={<EyeClosedIcon boxSize="4" color="gray.600" />}
                  variant="ghost"
                  mr="1"
                  onClick={handleShowPassword}
                />
              ) : (
                <IconButton
                  aria-label="Show password"
                  icon={<EyeIcon boxSize="4" color="gray.600" />}
                  variant="ghost"
                  mr="1"
                  onClick={handleShowPassword}
                />
              )
            }
          >
            <Input
              {...field}
              type={showPassword ? "text" : "password"}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
            />
          </InputGroup>

          {fieldState.invalid && (
            <Field.ErrorText color="red.700">{fieldState.error?.message}</Field.ErrorText>
          )}
        </Field.Root>
      )}
    />
  );
};
