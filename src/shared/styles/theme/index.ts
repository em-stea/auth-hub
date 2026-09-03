import { createSystem, defaultConfig } from "@chakra-ui/react";
import { containerRecipe } from "../components/container";
import { colors } from "../primitive-tokens/colors";
import { inputRecipe } from "../components/input";
import { textStyles } from "../text-styles/text-styles";
import { buttonRecipe } from "../components/button";
import { cardSlotRecipe } from "../components/card";

const theme = createSystem(defaultConfig, {
  cssVarsRoot: ":where(:root, :host)",
  theme: {
    tokens: {
      fonts: {
        body: {
          value: "var(--fontfamily-primary)",
        },
      },
      colors,
    },
    textStyles,
    recipes: {
      container: containerRecipe,
      input: inputRecipe,
      button: buttonRecipe,
    },
    slotRecipes: {
      card: cardSlotRecipe,
    },
    breakpoints: {
      desktop: "996px",
    },
  },
  globalCss: {
    html: {
      bg: "#07130f",
    },
    body: {
      bg: "#07130f",
      color: "white",
      minH: "100vh",
    },
    "::selection": {
      bg: "blue.500",
      color: "white",
    },
  },
});

export default theme;
