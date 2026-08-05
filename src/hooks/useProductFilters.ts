"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    
 if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  return {
    setCategory,
  };
}