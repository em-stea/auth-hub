import { signIn } from "next-auth/react";

import { ActionResult } from "@/shared/types/action-result";

interface LoginFormData {
  email: string;
  password: string;
}

export const doLogin = async (data: LoginFormData): Promise<ActionResult<null>> => {
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  if (result?.error || !result?.ok) {
    return {
      success: false,
      error: "Email o contraseña incorrectos",
    };
  }

  return {
    success: true,
    data: null,
  };
};
