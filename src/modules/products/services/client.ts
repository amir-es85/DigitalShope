import type { ProductWithImages } from '@/types';

export const getProductsApi = async (): Promise<ProductWithImages[]> => {
  try {
    const result = await fetch('/api/product');

    const response = await result.json();

    if (!result.ok) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    console.error('Error in getProductsApi:', error);
    throw error;
  }
};