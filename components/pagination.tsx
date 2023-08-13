"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PaginationProps {
  pagination: {
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export default function Pagination({ pagination }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    const queryParams = new URLSearchParams(searchParams as any);

    if (newPage === 1) {
      router.push(pathname);
    } else {
      queryParams.set("page", newPage.toString());
      router.push(pathname + "?" + queryParams.toString());
    }
  };

  const handlePreviousClick = () => {
    if (pagination.hasPreviousPage) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (pagination.hasNextPage) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(currentPage * 10, pagination.total)}
          </span>{" "}
          of <span className="font-medium">{pagination.total}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href="#"
          onClick={handlePreviousClick}
          className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold ${
            !pagination.hasPreviousPage
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-900 hover:bg-gray-50"
          } ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0`}
        >
          Previous
        </a>
        <a
          href="#"
          onClick={handleNextClick}
          className={`relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold ${
            !pagination.hasNextPage
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-900 hover:bg-gray-50"
          } ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0`}
        >
          Next
        </a>
      </div>
    </nav>
  );
}
