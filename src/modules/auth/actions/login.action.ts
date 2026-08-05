import { signIn } from "next-auth/react";
import { LoginSchemaType } from "@/lib/validations/auth";


export async function loginAction(
  data: LoginSchemaType
) {
    
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  if (result?.error) {
  console.log("SIGN IN ERROR:", result.error);
  return result;
}
  

  return result;
  console.log(result);
}