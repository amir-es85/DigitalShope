import { getProducts } from '@/modules/products/services';
import ProductList from './../../../modules/products/components/Productlist';
import ProductsPagination from './../../../modules/products/components/ProductsPagination';
import CategoryFilter from './../../../modules/products/components/CategoryFilter';
import ProductSearch from './../../../modules/products/components/ProductSearch';
import ProductSort from './../../../modules/products/components/ProductSort';

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  }>;
};

async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? '1');
  const search = params.search ?? '';
  const category = params.category ?? 'All';
  const sort = params.sort ?? 'default';
  const { products, totalPages, currentPage } = await getProducts({ page, search, category, sort });

  return (
    <div className="space-y-8 mb-2">
      <div className="flex flex-col gap-3 rounded-xl   p-4 sm:flex-row sm:items-center sm:justify-between">
        <ProductSearch />

        <div className="flex flex-col gap-3 sm:flex-row">
          <CategoryFilter />
          <ProductSort />
        </div>
      </div>

      <ProductList products={products} />

      <ProductsPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default Page;
