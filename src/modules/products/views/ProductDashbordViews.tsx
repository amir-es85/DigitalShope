import { getDashboardProducts } from '../services';
import ProductsTable from './../components/ProductsTable';

async function ProductDashbordViews() {
  const products = await getDashboardProducts();
  return (
    <div>
      <ProductsTable products={products} />
    </div>
  );
}

export default ProductDashbordViews;
