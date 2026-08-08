import { Skeleton } from '@/components/ui/skeleton';

function ProductsLoading() {
  return (
    <div className="space-y-8">
      {/* Filter */}
      <Skeleton className="h-10 w-[180px]" />

      {/* Products */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-xl" />

            <Skeleton className="h-5 w-3/4" />

            <Skeleton className="h-5 w-1/2" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    </div>
  );
}

export default ProductsLoading;
