import customMetadataGenerator from '@/lib/metadata';
import Productdetailes from './../../../../modules/products/components/Productdetailes';
import { getProductById } from '@/modules/products/services';
import { ProductWithImages } from '@/types';

export async function generateMetadata({ params }: Productdetailesprop) {
  const { id } = await params;
  const product = (await getProductById(id)) as ProductWithImages;
  if (!product) {
    return customMetadataGenerator({ title: 'not found' });
  }
  return customMetadataGenerator({
    title: product.name,
    description: product.description,
    images: product.images,
  });
}

type Productdetailesprop = {
  params: Promise<{ id: string }>;
};
async function Page({ params }: Productdetailesprop) {
  const { id } = await params;
  const product = (await getProductById(id)) as ProductWithImages;
  const jsonld = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.length && product.images[0].image,
    description: product.description,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      <Productdetailes product={product} />
    </section>
  );
}

export default Page;
