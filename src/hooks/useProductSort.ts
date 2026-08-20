'use client';

import { useUrlParams } from './useUrlParams';

export function useProductSort() {
  const { params, push, searchParams } = useUrlParams();
  const currentSort = searchParams.get('sort') ?? 'default';

  const setSort = (sort: string) => {
    if (sort === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }

    params.set('page', '1');

    push();
  };

  return {
    setSort,
    currentSort,
  };
}
