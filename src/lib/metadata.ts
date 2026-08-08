import { Image } from '@/generated/client';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

type ProductMetadata = {
  title?: string;
  description?: string;
  keywords?: string[];
  images?: Image[];
};
export default function customMetadataGenerator({
  title = 'Digital Shop',
  description = 'digital shop to buy digital stuff',
  keywords = ['digital', 'mobile', 'laptop', 'watch'],
  images = undefined,
}: ProductMetadata): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      type: 'website',
      images,
    } as OpenGraph,
  };
}
