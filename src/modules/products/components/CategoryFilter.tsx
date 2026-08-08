'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Category } from '@/generated/client';
import { useProductFilters } from './../../../hooks/useProductFilters';
import { useSearchParams } from 'next/navigation';

function CategoryFilter() {
  const { setCategory } = useProductFilters();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';

  const categories = ['All', ...Object.values(Category)];

  return (
    <Select onValueChange={setCategory} value={currentCategory}>
      <SelectTrigger className="h-10 w-full sm:w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>

      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CategoryFilter;
