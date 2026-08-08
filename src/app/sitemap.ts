import { getProducts } from '@/modules/products/services';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  if (products.length < 1) return [];
  const sitemaplink = products.map((item) => {
    return {
      url: `http://localhost:3000/products/${item.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });
  return sitemaplink;
}
