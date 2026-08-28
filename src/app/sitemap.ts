import { MetadataRoute } from 'next';
import { getAllProducts } from './../modules/products/services/index';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const products = await getAllProducts();
    if (products.length < 1) return [];

    return products.map((item) => ({
      url: `http://localhost:3000/products/${item.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}
