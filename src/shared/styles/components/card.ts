import { defineSlotRecipe } from "@chakra-ui/react";

export const cardSlotRecipe = defineSlotRecipe({
  slots: ["root", "header", "body", "footer", "title", "description"],
  base: {},
  variants: {
    variant: {
      auth: {
        root: {
          bg: "white",
          borderRadius: "3xl",
          p: "8",
          w: "28rem",
          flexDirection: "column",
          boxShadow: "0 0 25px 0 rgba(255, 255, 255, 0.2)",
        },
        header: {
          pt: "0",
          pb: "6",
          alignItems: "center",
        },
        body: {
          p: "0",
        },
      },
      home: {
        root: {
          bg: "white",
          borderRadius: "xl",
          overflow: "hidden",
          h: "full",
          boxShadow: "0 0 25px 0 rgba(255, 255, 255, 0.2)",
        },
      },
    },
  },
  defaultVariants: {
    variant: "auth",
  },
});
