// src/lib/prisma.ts
import { PrismaClient } from '@/generated/client';
import { withAccelerate } from '@prisma/extension-accelerate';
/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createClient() {
  // بررسی وجود DATABASE_URL
  if (!process.env.DATABASE_URL) {
    return;
  }

  const dbUrl = process.env.DATABASE_URL;

  // بررسی اینکه آیا از Accelerate استفاده می‌شود
  const isAccelerate =
    dbUrl.includes('prisma-data.net') ||
    dbUrl.startsWith('prisma://') ||
    dbUrl.startsWith('prisma+');

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn'] : ['error'],
    // برای Accelerate، باید accelerateUrl را تنظیم کنیم
    ...(isAccelerate && { accelerateUrl: dbUrl }),
  });

  // اگر Accelerate داری، extension را اضافه کن
  if (isAccelerate) {
    return client.$extends(withAccelerate());
  }

  return client;
}

// استفاده از globalThis برای سازگاری با Next.js و Turbopack
const globalForPrisma =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof global !== 'undefined' && global) ||
  (typeof window !== 'undefined' && window) ||
  ({} as any);

// Lazy initialization برای جلوگیری از خطا در زمان import
let prismaInstance: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (prismaInstance) {
    return prismaInstance as PrismaClient;
  }

  if ((globalForPrisma as any).prisma) {
    prismaInstance = (globalForPrisma as any).prisma as PrismaClient;
    return prismaInstance;
  }

  try {
    prismaInstance = createClient() as PrismaClient;

    // در development برای جلوگیری از چندین instance
    if (process.env.NODE_ENV !== 'production') {
      (globalForPrisma as any).prisma = prismaInstance;
    }

    return prismaInstance;
  } catch (error) {
    console.error('Failed to create Prisma client:', error);
    throw error;
  }
}

export const prisma = getPrisma();

export default prisma;
