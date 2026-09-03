import localFont from "next/font/local";

export const PlusJakartaSans = localFont({
  src: [
    {
      path: "../../../public/fonts/PlusJakartaSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PlusJakartaSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/PlusJakartaSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PlusJakartaSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--fontfamily-primary",
});

export const variablesForHtml = PlusJakartaSans.variable;
