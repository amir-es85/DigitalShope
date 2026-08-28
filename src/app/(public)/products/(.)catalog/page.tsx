import { Suspense } from 'react';
import CatalogList from './../../../../components/Catalog/CatalogList';

function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CatalogList />
      </Suspense>
    </div>
  );
}

export default Page;
