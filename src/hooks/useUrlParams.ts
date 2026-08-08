"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useUrlParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const push = () => {
    router.push(`/products?${params.toString()}`);
  };

  return {
    params,
    push,
    searchParams
  };
}