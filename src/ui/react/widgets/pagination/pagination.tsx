import { cn } from "@/lib";
import { PaginationPrimitive } from "@/ui/react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  disablePrevious: boolean;
  disableNext: boolean;
}

export const Pagination = ({
  currentPage,
  disableNext,
  disablePrevious,
  totalPages,
}: PaginationProps) => {
  return (
    <PaginationPrimitive.Pagination>
      <PaginationPrimitive.PaginationContent>
        <PaginationPrimitive.PaginationItem>
          <PaginationPrimitive.PaginationPrevious
            className={cn({
              "opacity-50 pointer-events-none": disablePrevious,
            })}
            href={`/blog?page=${currentPage - 1}`}
          />
        </PaginationPrimitive.PaginationItem>

        {currentPage > 2 && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationLink href={`/blog?page=1`}>
              1
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        )}

        {currentPage > 3 && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationEllipsis />
          </PaginationPrimitive.PaginationItem>
        )}

        {currentPage > 1 && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationLink
              href={`/blog?page=${currentPage - 1}`}
            >
              {currentPage - 1}
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        )}

        <PaginationPrimitive.PaginationItem>
          <PaginationPrimitive.PaginationLink href="#" isActive>
            {currentPage}
          </PaginationPrimitive.PaginationLink>
        </PaginationPrimitive.PaginationItem>

        {currentPage < totalPages && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationLink
              href={`/blog?page=${currentPage + 1}`}
            >
              {currentPage + 1}
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        )}

        {currentPage < totalPages - 2 && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationEllipsis />
          </PaginationPrimitive.PaginationItem>
        )}

        {currentPage < totalPages - 1 && (
          <PaginationPrimitive.PaginationItem>
            <PaginationPrimitive.PaginationLink
              href={`/blog?page=${totalPages}`}
            >
              {totalPages}
            </PaginationPrimitive.PaginationLink>
          </PaginationPrimitive.PaginationItem>
        )}

        <PaginationPrimitive.PaginationItem>
          <PaginationPrimitive.PaginationNext
            className={cn({
              "opacity-50 pointer-events-none": disableNext,
            })}
            href={`/blog?page=${currentPage + 1}`}
          />
        </PaginationPrimitive.PaginationItem>
      </PaginationPrimitive.PaginationContent>
    </PaginationPrimitive.Pagination>
  );
};
