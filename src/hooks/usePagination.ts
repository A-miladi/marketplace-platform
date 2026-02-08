import { ResponseWithPaginationType } from "@/types";
import { useCallback, useState } from "react";

interface UsePaginationProps<T> {
  perPage?: number | T;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  data: T[];
  page: number;
  loading: boolean;
  hasMore: boolean;
  total: number;
  loadMore: () => void;
  setData: (data: ResponseWithPaginationType<T[]>) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
  lastPage: number;
}

export function usePagination<T>({
  // perPage = 5,
  initialPage = 1,
}: UsePaginationProps<T> = {}): UsePaginationReturn<T> {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const setPaginationData = useCallback(
    (response: ResponseWithPaginationType<T[]>) => {
      setTotal(response.meta.total || 0);
      setLastPage(response.meta.lastPage || 0);

      if (page === 1) {
        setData(response.data);
      } else {
        setData((prevData) => {
          // Create a Set of existing IDs to check for duplicates
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const existingIds = new Set(prevData.map((item) => (item as any).id));

          // Filter out duplicates from new data
          const newData = response.data.filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item) => !existingIds.has((item as any).id),
          );

          return [...prevData, ...newData];
        });
      }
    },
    [page],
  );

  const loadMore = useCallback(() => {
    if (!loading && page < lastPage) {
      setPage((prev) => prev + 1);
    }
  }, [loading, page, lastPage]);

  const reset = useCallback(() => {
    setPage(initialPage);
    setData([]);
    setLoading(false);
    setTotal(0);
    setLastPage(0);
  }, [initialPage]);

  return {
    data,
    page,
    loading,
    hasMore: page < lastPage,
    total,
    loadMore,
    setData: setPaginationData,
    setLoading,
    reset,
    lastPage,
  };
}
