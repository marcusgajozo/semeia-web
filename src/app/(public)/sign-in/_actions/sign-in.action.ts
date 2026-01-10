"use server";

import { z } from "zod";
import { signIn } from "@/lib/auth";
import { signInSchema } from "../_schemas/sign-in.schema";

export type LoginState = {
  error?: string;
  success?: boolean;
};

export async function signInAction(
  data: z.infer<typeof signInSchema>
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
    });

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao fazer login";
    console.error("Sign in error:", errorMessage);

    return {
      error: "Email ou senha incorretos. Tente novamente.",
    };
  }
}
