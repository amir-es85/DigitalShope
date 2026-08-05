
import { getProducts } from '@/modules/products/services';
import ProductList from './../../../modules/products/components/Productlist';
import ProductsPagination from './../../../modules/products/components/ProductsPagination';
import CategoryFilter from './../../../modules/products/components/CategoryFilter';


type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  category?: string;
  }>;
};

 async function Page({ searchParams }: Props) {

 const params = await searchParams;

  const page = Number(params.page ?? "1");
  const search = params.search ?? "";
const category = params.category ?? "All";
  const { products, totalPages, currentPage } = await getProducts({page,search,category});
  
  return (
    <div className="space-y-8">
      <CategoryFilter />
      <ProductList products={products} />

      <ProductsPagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default Page