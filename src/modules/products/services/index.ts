'use server';

import { prisma } from '@/lib/prisma';
import type { ProductWithImages, ProductCreateInput } from '@/types';
import type { Prisma } from '@/generated/client';
import { revalidatePath } from 'next/cache';
import { Category } from '@/generated/client';

export const getProductById = async (id: string): Promise<ProductWithImages | null> => {
  const res = await prisma.product.findUnique({
    include: { images: true },
    where: {
      id,
    },
  });
  return res;
};

type GetProductsParams = {
  page?: number;
  search?: string;
  category?: string;
  sort?: string;
};

const PAGE_SIZE = 10;
export const getProducts = async ({ page = 1, category, search, sort }: GetProductsParams) => {
  const skip = (page - 1) * PAGE_SIZE;

  const orderBy =
    sort === 'price-asc'
      ? { price: 'asc' as const }
      : sort === 'price-desc'
        ? { price: 'desc' as const }
        : undefined;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: PAGE_SIZE,
      where: {
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }),
        ...(category &&
          category !== 'All' && {
            category: category as Category,
          }),
      },

      orderBy,

      include: {
        images: true,
      },
    }),
    prisma.product.count({
      where: {
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }),

        ...(category &&
          category !== 'All' && {
            category: category as Category,
          }),
      },
    }),
  ]);

  return {
    products,
    totalPages: Math.ceil(total / PAGE_SIZE),
    currentPage: page,
  };
};

export const ubsertProduct = async (
  product: ProductCreateInput & { id?: string }
) => {
  try {
    const { id, ...data } = product;

    let result;

    if (id) {
      result = await prisma.product.update({
        where: { id },
        data: data as Prisma.ProductUncheckedUpdateInput,
      });
    } else {
      result = await prisma.product.create({
        data,
      });
    }

    revalidatePath('/dashboard/products');

    return {
      success: true,
      message: id
        ? 'Product updated successfully'
        : 'Product created successfully',
      data: result,
    };
  } catch (error) {
    console.error('Error in ubsertProduct:', error);

    return {
      success: false,
      message: 'Failed to save product',
    };
  }
};

export const deleteProducts = async (id: string) => {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/dashboard/products');

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    console.error('Error in deleteProducts:', error);

    return {
      success: false,
      message: 'Failed to delete product',
    };
  }
};
