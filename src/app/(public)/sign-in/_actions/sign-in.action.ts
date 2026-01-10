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
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        redirectTo: "/",
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
        throw error;
      }

      return {
        error: "Email ou senha incorretos. Tente novamente.",
      };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      error: "Email ou senha incorretos. Tente novamente.",
    };
  }
}
