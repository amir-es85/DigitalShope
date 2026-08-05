import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import type { ProductWithImages } from '@/types';

export async function GET() {
    try {
        const result: ProductWithImages[] = await prisma.product.findMany({ 
            include: { images: true } 
        })
        
        return NextResponse.json({
            data: result
        }, { status: 200 })
    } catch (error) {
        console.error('Error in /api/product:', error)
        
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        const errorStack = error instanceof Error ? error.stack : String(error)
        
        // بررسی نوع خطا
        const isDatabaseError = errorMessage.includes('DATABASE_URL') || 
                               errorMessage.includes('connection') ||
                               errorMessage.includes('P1001') ||
                               errorMessage.includes('P1000') ||
                               errorMessage.includes('Can\'t reach database server')
        
        return NextResponse.json({
            error: isDatabaseError ? 'خطا در اتصال به دیتابیس' : 'خطا در دریافت محصولات',
            message: errorMessage,
            details: process.env.NODE_ENV === 'development' ? errorStack : undefined
        }, { status: 500 })
    }
}