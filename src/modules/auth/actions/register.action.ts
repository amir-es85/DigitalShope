import { signIn } from "next-auth/react";

import { RegisterSchemaType } from "@/lib/validations/auth";
import { registerUser } from "../services/auth.service";

export async function registerAction(
  data: RegisterSchemaType
) {
  await registerUser(data);

  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  if (result?.error) {
    throw new Error("Login failed");
  }

  return result;
}