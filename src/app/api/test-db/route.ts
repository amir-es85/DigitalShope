import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // بررسی DATABASE_URL
    const hasDbUrl = !!process.env.DATABASE_URL;

    // تست اتصال
    await prisma.$queryRaw`SELECT 1`;

    // تست خواندن از جدول
    const productCount = await prisma.product.count();

    return NextResponse.json(
      {
        success: true,
        hasDatabaseUrl: hasDbUrl,
        databaseUrl: hasDbUrl ? process.env.DATABASE_URL?.substring(0, 20) + '...' : 'NOT SET',
        connected: true,
        productCount: productCount,
        message: 'اتصال به دیتابیس موفق بود',
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : String(error);

    return NextResponse.json(
      {
        success: false,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrl: process.env.DATABASE_URL
          ? process.env.DATABASE_URL.substring(0, 20) + '...'
          : 'NOT SET',
        connected: false,
        error: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
      },
      { status: 500 }
    );
  }
}
