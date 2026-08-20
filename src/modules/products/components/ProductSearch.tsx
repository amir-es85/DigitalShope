'use client';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useProductSearch } from './../../../hooks/useProductSearch';

function ProductSearch() {
  const { setSearch } = useProductSearch();

  const [search, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <Input
      className="h-10 w-full sm:w-[280px]"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
}

export default ProductSearch;
