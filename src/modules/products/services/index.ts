import { prisma } from '@/lib/prisma';
import type { ProductWithImages } from '@/types';
import { cacheLife, cacheTag } from 'next/cache';
import { connection } from 'next/server';
import { Category } from '@/generated/client';

export const getAllProducts = async () => {
  return prisma.product.findMany({
    select: { id: true },
  });
};

export const getProductById = async (id: string): Promise<ProductWithImages | null> => {
  return prisma.product.findUnique({
    include: { images: true },
    where: { id },
  });
};

/** Dashboard: no cache — fresh data, does not block prerender. */
export const getDashboardProducts = async () => {
  await connection();
  return prisma.product.findMany({
    include: { images: true },
  });
};

type GetProductsParams = {
  page?: number;
  search?: string;
  category?: string;
  sort?: string;
};

const PAGE_SIZE = 10;

export const getProducts = async ({
  page = 1,
  category,
  search,
  sort,
}: GetProductsParams) => {
  'use cache';
  cacheLife('hours');
  cacheTag('products');

  const skip = (page - 1) * PAGE_SIZE;

  const orderBy =
    sort === 'price-asc'
      ? { price: 'asc' as const }
      : sort === 'price-desc'
        ? { price: 'desc' as const }
        : undefined;

  const where = {
    ...(search && {
      name: {
        contains: search,
        mode: 'insensitive' as const,
      },
    }),
    ...(category &&
      category !== 'All' && {
        category: category as Category,
      }),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: PAGE_SIZE,
      where,
      orderBy,
      include: { images: true },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    totalPages: Math.ceil(total / PAGE_SIZE),
    currentPage: page,
  };
};
