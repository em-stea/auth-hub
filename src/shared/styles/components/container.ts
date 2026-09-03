import { defineRecipe } from "@chakra-ui/react";

export const containerRecipe = defineRecipe({
  variants: {
    variant: {
      auth: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDir: "column",
        bg: "neutral.1000/40",
        h: "vh",
        w: "vw",
        maxW: "none",
      },
    },
  },
});
