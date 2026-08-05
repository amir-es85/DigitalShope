
import CatalogList from './../../../../components/Catalog/CatalogList';
import { Button } from '@/components/ui/button';
import  Link  from 'next/link';

function Page() {
  return (
    <div><CatalogList />
    <div className='flex items-center justify-center mt-7'><Button asChild><Link href="/products">Back to product</Link></Button></div>
    </div>
  )
}

export default Page