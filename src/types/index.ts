import type { Prisma } from '@/generated/client'
import type { Image } from '@/generated/client'

// تایپ‌های پایه از Prisma
export type { Product, Category, Cart ,Role,User} from '@/generated/client'
export type TImage = Image

// Product با images
export type ProductWithImages = Prisma.ProductGetPayload<{
  include: {
    images: true
  }
}>
export type ProductWithCart = Prisma.CartGetPayload<{
  include: {
    product: true
    images: true
  }
}>
export type CartWithProduct = Prisma.CartGetPayload<{
  include:{
    product:true
  }
}>


// تایپ‌های مفید دیگر
export type ProductCreateInput = Prisma.ProductCreateInput
export type ProductUpdateInput = Prisma.ProductUpdateInput
export type ProductWhereInput = Prisma.ProductWhereInput
export type ProductWhereUniqueInput = Prisma.ProductWhereUniqueInput

// اطمینان از اینکه فایل به عنوان module شناخته می‌شود
export {}
