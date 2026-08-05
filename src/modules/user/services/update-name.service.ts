"use server";

import { EditNameSchemaType } from "@/lib/validations/editname";
import { updateNameService } from "../action/update-name.action";
import { auth } from "../../../../auth";


export async function updateNameAction(
  data: EditNameSchemaType
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await updateNameService(session.user.id, data.name);
}