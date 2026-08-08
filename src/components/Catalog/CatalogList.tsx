'use client';
import { Data } from '@/modules/products/mock/Products';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchproductimages } from '@/modules/products/services/image';
import { TImage } from '@/types';
import Spinner from '../spiner';
import { product } from '@/generated/prisma';

function CatalogList() {
  const searchparams = useSearchParams();
  const id = searchparams.get('id');

  const [images, setimages] = useState<TImage[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fechdata = async () => {
      setloading(true);
      const data = await fetchproductimages(id as string);
      setimages(data);
      setloading(false);
    };
    fechdata();
  }, [id]);

  return (
    <>
      {loading && <Spinner />}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {images.map((image: TImage) => (
          <Card
            key={image.id}
            className="rounded-xl shadow hover:scale-105 transition-transform duration-200"
          >
            <CardContent className="relative h-32 sm:h-40 md:h-48 p-2">
              <Image
                fill
                src={image.image}
                alt={`catalog-${image.id}`}
                className="object-contain rounded-md"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default CatalogList;
