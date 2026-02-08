"use client";

import AdvertisementCard from "@/components/AdvertisementCard";
import { AdvertisementCardSkeleton } from "@/components/Skeletons";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { ResponseWithPaginationType } from "@/types";
import { GetBookmarkAdvertisement } from "@/types/advertisement";
import NoAdsMessage from "../advertisement/NoAdsMessage";

const Favorites = () => {
  const { data, loading, refetch } = useFetch<
    ResponseWithPaginationType<GetBookmarkAdvertisement[]>
  >(`${API_URL.User.Bookmark}`, {});

  return (
    <div className="flex justify-center">
      <div className="mt-12 flex w-full max-w-[1224px] flex-wrap items-center justify-center gap-5 xl:justify-between">
        {/* <Breadcrumbs /> */}
        {loading ? (
          <AdvertisementCardSkeleton />
        ) : data?.data.length ? (
          <div className="flex w-full flex-wrap gap-4 px-5 md:max-w-[1224px] md:gap-8 md:px-4 xl:px-0">
            {data.data.map((item, idx) => (
              <AdvertisementCard refetch={refetch} item={item.ad} key={idx} />
            ))}
          </div>
        ) : (
          <NoAdsMessage />
        )}
      </div>
    </div>
  );
};

export default Favorites;
