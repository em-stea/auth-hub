"use client";

import { createIcon } from "@chakra-ui/react";

export const KeyIcon = createIcon({
  displayName: "KeyIcon",
  viewBox: "0 0 24 24",
  path: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="7.5" cy="12" r="3.5" />
      <path d="M11 12h10" />
      <path d="M17 12v3" />
      <path d="M20 12v2" />
    </svg>
  ),
});
