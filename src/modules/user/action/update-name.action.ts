import { prisma } from '@/lib/prisma';

export async function updateNameService(userId: string, name: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });
}
