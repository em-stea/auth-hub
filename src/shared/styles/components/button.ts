import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    borderRadius: "xl",
  },
  defaultVariants: {
    size: "md",
  },

  variants: {
    size: {
      sm: {
        px: "4",
        py: "1.5",
        h: 7,
        textStyle: "button.3",
      },
      md: {
        px: "5",
        py: "2.5",
        h: 10,
        textStyle: "button.2",
      },
      xl: {
        width: "full",
      },
    },
    variant: {
      primary: {
        cursor: "pointer",
        color: "neutral.100",
        bg: "blue.500",
        _hover: {
          bg: "blue.600",
        },
        _disabled: {
          color: "neutral.500",
          bg: "neutral.200",
          opacity: 1,
          cursor: "not-allowed",
        },
      },
      secondary: {
        bg: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "gray.300",
        _hover: {
          bg: "gray.100",
        },
      },
      ghost: {
        bg: "transparent",
        color: "accent.500",
        minW: "auto",
        p: "0",
        _hover: {
          bg: "transparent",
          color: "accent.600",
        },
        _focus: {
          bg: "transparent",
          color: "accent.600",
          outline: "none",
          boxShadow: "none",
        },

        _disabled: {
          color: "neutral.600",
        },
      },
    },
  },
});
