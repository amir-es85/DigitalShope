'use client';

import { useUrlParams } from './useUrlParams';

export function useProductSearch() {
  const { params, push } = useUrlParams();

  const setSearch = (search: string) => {
    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }

    params.set('page', '1');

    push();
  };

  return {
    setSearch,
  };
}
