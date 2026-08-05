import cloudinary from "@/lib/cloudinary";
import { prisma } from '@/lib/prisma';

export async function updateImageService(
  userId: string,
  file: File
) {
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const base64 = buffer.toString("base64");

  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${base64}`,
    {
      folder: "users",
    }
  );

  await prisma.user.update({
  where: {
    id: userId,
  },
  data: {
    image: result.secure_url,
    imagePublicId: result.public_id,
  },
});

  return {
  imageUrl: result.secure_url,
  publicId: result.public_id,
};
}