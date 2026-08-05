import ProductForm from "../components/ProductForm"
import { getProductById } from "../services"



async function ProductDeatileView({id}:{id:string}) {
    const product = await getProductById(id)
  return (
    <div><ProductForm product={product} /></div>
  )
}

export default ProductDeatileView