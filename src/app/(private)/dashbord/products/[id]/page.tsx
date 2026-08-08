import ProductDeatileView from '@/modules/products/views/ProductDeatileView';

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <ProductDeatileView id={id} />
    </div>
  );
}

export default page;
