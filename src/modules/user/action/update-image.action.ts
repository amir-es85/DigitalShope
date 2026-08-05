"use server";


import { auth } from "../../../../auth";
import { updateImageService } from "../services/update-image.service";


export async function updateImageAction(formData: FormData) {
  
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  const image = formData.get("image") as File;

const result = await updateImageService(
  session.user.id,
  image
);





 
}