"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema,RegisterSchemaType } from "@/lib/validations/auth";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { registerAction } from "../../modules/auth/actions/register.action";


export default function RegisterForm(){
    const {register,handleSubmit,formState}=useForm<RegisterSchemaType>({
      

        resolver:zodResolver(RegisterSchema),
        mode:"onChange"
    })

     async function onSubmit(data: RegisterSchemaType) {
    await registerAction(data)
  }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
        <Input
          type="text"
          placeholder="Name"
          {...register("name")}
        />

        {formState.errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {formState.errors.name.message}
          </p>
        )}
      </div>

            <div>
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
        />

        {formState.errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        {formState.errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {formState.errors.password.message}
          </p>
        )}
      </div>

      <Button
  type="submit"
  className="w-full"
  disabled={
    !formState.isValid ||
    formState.isSubmitting
  }
>
  {formState.isSubmitting
    ? "Loading..."
    : "Register"}
</Button>

        </form>
    )
}