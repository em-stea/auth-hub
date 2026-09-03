import { defineTextStyles } from "@chakra-ui/react";

export const textStyles = defineTextStyles({
  "title.4": {
    description: "Title 4",
    value: {
      fontFamily: "var(--fontfamily-primary)",
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
  },
  "body.2": {
    description: "Body 2",
    value: {
      fontFamily: "var(--fontfamily-primary)",
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      letterSpacing: "0.018rem",
    },
  },
  "body.2.semibold": {
    description: "Body 2 Semibold",
    value: {
      fontFamily: "var(--fontfamily-primary)",
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
    },
  },
  "button.2": {
    description: "Button 2",
    value: {
      fontFamily: "var(--fontfamily-primary)",
      fontWeight: 600,
      fontSize: { base: "1rem", desktop: "0.875rem" },
      lineHeight: { base: "1.5rem", desktop: "1.375rem" },
    },
  },
  "button.3": {
    description: "Button 3",
    value: {
      fontFamily: "var(--fontfamily-primary)",
      fontWeight: 600,
      fontSize: { base: "0.875rem", desktop: "0.75rem" },
      lineHeight: { base: "1.125rem", desktop: "1rem" },
    },
  },
});
