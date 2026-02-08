import AdvertisementCard from "@/components/AdvertisementCard";
import { AdvertisementCardSkeleton } from "@/components/Skeletons";
import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { usePagination } from "@/hooks/usePagination";
import { ResponseWithPaginationType } from "@/types";
import { IAdvertisement } from "@/types/advertisement";
import { useEffect } from "react";

interface RelatedAdProps {
  id: string | number;
  isApproved: boolean;
}

const PER_PAGE = 6;
const RelatedAd = ({ id, isApproved }: RelatedAdProps) => {
  const {
    data: relatedAd,
    loading,
    loadMore,
    setData: setRelatedAdData,
    setLoading: setRelatedAdLoading,
    page,
    lastPage,
  } = usePagination<IAdvertisement>();

  const {
    data: AdList,
    loading: AdLoading,
    refetch: refetchRelatedAd,
  } = useFetch<ResponseWithPaginationType<IAdvertisement[]>>(
    `${API_URL.Public.ad}/${id}/related?page=${page}&per_page=${PER_PAGE}`,
    {
      autoFetch: isApproved,
    },
  );

  useEffect(() => {
    if (AdList) {
      setRelatedAdData(AdList);
    }
  }, [AdList, setRelatedAdData]);

  useEffect(() => {
    setRelatedAdLoading(AdLoading);
  }, [AdLoading, setRelatedAdLoading]);

  const showLoadMore =
    relatedAd.length > 0 && lastPage !== page && lastPage > page;

  return (
    <div>
      {AdLoading ? (
        <div>
          <div className="relative mt-8 w-full bg-slate-300 lg:mt-20">
            <hr className="h-1 bg-primary-700" />
            <div className="absolute -top-3 bg-white pr-2">
              <p className="text-xl font-bold">Related Advertisement</p>
            </div>
          </div>

          <div className="mt-8 md:mt-20">
            <AdvertisementCardSkeleton />
          </div>
        </div>
      ) : AdList?.data?.length ? (
        <>
          <div className="relative mt-8 w-full bg-slate-300 lg:mt-20">
            <hr className="h-1 bg-primary-700" />
            <div className="absolute -top-3 bg-white pr-2">
              <p className="text-xl font-bold">Related Advertisement</p>
            </div>
          </div>
          <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-5 lg:mt-12 xl:justify-start">
            {AdList?.data.map((item, idx) => (
              <AdvertisementCard
                refetch={refetchRelatedAd}
                item={item}
                key={idx}
              />
            ))}

            {showLoadMore && (
              <Button
                disabled={loading}
                onClick={loadMore}
                className="h-12 w-1/3"
                variant="outlined"
                color="primary"
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RelatedAd;
