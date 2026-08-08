'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useUrlParams } from './useUrlParams';

export function useProductFilters() {
  const { params, push } = useUrlParams();
  

  const setCategory = (category: string) => {

    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    params.set('page', '1');

    push()
  };

  return {
    setCategory,
  };
}
