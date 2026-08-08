import { getProducts } from '../services';
import ProductsTable from './../components/ProductsTable';

async function ProductDashbordViews() {
  const prodacts = await getProducts();
  return (
    <div>
      <ProductsTable products={prodacts} />
    </div>
  );
}

export default ProductDashbordViews;
