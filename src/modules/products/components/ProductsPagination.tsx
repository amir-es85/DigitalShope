import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function ProductsPagination({ currentPage, totalPages }: Props) {
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;

          return (
            <PaginationItem key={page}>
              <PaginationLink asChild isActive={page === currentPage}>
                <Link href={`?page=${page}`}>{page}</Link>
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`?page=${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
