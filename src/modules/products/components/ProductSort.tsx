"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductSort } from './../../../hooks/useProductSort';

function ProductSort() {
  const { setSort,currentSort } = useProductSort();

  return (
    <Select  value={currentSort} onValueChange={setSort}>
      <SelectTrigger className="h-10 w-full sm:w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="default">
          Default
        </SelectItem>

        <SelectItem value="price-asc">
          Lowest Price
        </SelectItem>

        <SelectItem value="price-desc">
          Highest Price
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default ProductSort;