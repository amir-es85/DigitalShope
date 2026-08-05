// فایل جداگانه برای client-side API calls
// این فایل prisma را import نمی‌کند
import type { ProductWithImages } from '@/types'

export const getProductsApi = async (): Promise<ProductWithImages[]> => {
  try {
    const result = await fetch("/api/product")
    
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`)
    }
    
    const response = await result.json()
    
    // بررسی ساختار response
    if (response.data && Array.isArray(response.data)) {
      return response.data
    }
    
    // اگر response مستقیماً array است
    if (Array.isArray(response)) {
      return response
    }
    
    return []
  } catch (error) {
    console.error('Error in getProductsApi:', error)
    throw error
  }
}

