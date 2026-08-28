'use server';

import { prisma } from '@/lib/prisma';
import type { ProductCreateInput } from '@/types';
import type { Prisma } from '@/generated/client';
import { revalidatePath, revalidateTag } from 'next/cache';

export const ubsertProduct = async (product: ProductCreateInput & { id?: string }) => {
  try {
    const { id, ...data } = product;

    const result = id
      ? await prisma.product.update({
          where: { id },
          data: data as Prisma.ProductUncheckedUpdateInput,
        })
      : await prisma.product.create({ data });

    revalidatePath('/dashbord/products');
    revalidateTag('products', 'max');

    return {
      success: true,
      message: id ? 'Product updated successfully' : 'Product created successfully',
      data: result,
    };
  } catch (error) {
    console.error('Error in ubsertProduct:', error);
    return { success: false, message: 'Failed to save product' };
  }
};

export const deleteProducts = async (id: string) => {
  try {
    await prisma.product.delete({ where: { id } });

    revalidatePath('/dashbord/products');
    revalidateTag('products', 'max');

    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    console.error('Error in deleteProducts:', error);
    return { success: false, message: 'Failed to delete product' };
  }
};
