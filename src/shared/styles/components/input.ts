import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    textStyle: "body.2",
    borderRadius: "xl",
    border: "1px solid",
    borderColor: "gray.300",
    color: "neutral.900",
    bg: "transparent",
    gap: "1.5",
    _placeholder: {
      color: "gray.500",
    },
    _hover: {
      cursor: "text",
    },
    _focus: {
      bg: "transparent",
      outline: "2px solid",
      outlineColor: "gray.100",
    },
    _active: {
      bg: "transparent",
    },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "gray.100",
      transition: "outline 0.2s ease-in-out",
    },
    _selection: {
      backgroundColor: "accent.200",
      color: "neutral.900",
    },
    _disabled: {
      opacity: 1,
      color: "neutral.500",
      borderColor: "neutral.300",
      cursor: "not-allowed",
    },
  },

  variants: {
    variant: {
      default: {
        px: "4",
      },
    },
    size: {
      md: { h: "10" },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
