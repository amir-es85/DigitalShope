import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { ProductWithImages } from '@/types';

export async function GET() {
  try {
    const result: ProductWithImages[] = await prisma.product.findMany({
      include: { images: true },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Products fetched successfully',
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/product:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
