// src/types/db.d.ts
import type { Product, Image, Prisma } from '@/generated/client';

declare global {
  // اینا فقط تایپ‌های اضافه یا ترکیبی هستن
  type Category = 'Mobile' | 'Laptop' | 'Tablet';
  type ProductCreateInput = Prisma.ProductCreateInput;
  type ProductUpdateInput = Prisma.ProductUpdateInput;
  type ProductWithImags = Product & { images: Image[] };
}

export {};
