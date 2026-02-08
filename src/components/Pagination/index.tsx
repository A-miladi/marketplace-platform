import { cn } from "@/utils";
import { FC } from "react";
import { Button } from "../ui";
import { ArrowDown } from "../icons";

interface IPagination {
  currentPage: number | undefined;
  totalPages?: number;
  className?: string;
  onPageChange: (page: number) => void;
}

const Pagination: FC<IPagination> = ({
  currentPage = 1,
  totalPages,
  onPageChange,
  className,
}) => {
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min((totalPages ? totalPages : 0) - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < (totalPages ? totalPages : 0) - 2) {
      range.push("...");
    }

    return [...range, totalPages];
  };

  return (
    <div
      className={cn(`flex w-full items-center justify-center gap-1`, className)}
    >
      {currentPage === 1 ? null : (
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-8 w-8 items-center justify-center bg-primary-700"
        >
          <ArrowDown color="#fff" className="rotate-90" size={20} />
        </Button>
      )}

      {getPageNumbers().map((page, index) =>
        typeof page === "string" ? (
          <span
            key={index}
            className="flex h-6 w-6 items-center justify-center text-xs font-medium text-gray-700"
          >
            {page}
          </span>
        ) : (
          <Button
            key={index}
            onClick={() => onPageChange(page ? page : 0)}
            className={`flex h-8 w-8 items-center justify-center text-xs font-medium ${
              currentPage === page
                ? "rounded-lg bg-primary-600 font-bold text-white"
                : "border border-neutral-800 bg-transparent text-neutral-400 hover:bg-neutral-200"
            } rounded border`}
          >
            {page}
          </Button>
        ),
      )}
      {currentPage === totalPages ? null : (
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-8 w-8 items-center justify-center bg-primary-700"
        >
          <ArrowDown color="#fff" className="-rotate-90" size={20} />
        </Button>
      )}
    </div>
  );
};
export default Pagination;
