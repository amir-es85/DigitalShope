import Productitem from "./Productitem"
import type { ProductWithImages } from "@/types"

function ProductList(props: { products: ProductWithImages[] }) {
  const { products } = props
  
  
  return (
    <div className="grid grid-cols-2 gap-5 md:gap-7 md:grid-cols-4">
      {products.map((item) => (
        <Productitem key={item.id} product={item} />
      ))}
    </div>
  )
}

export default ProductList