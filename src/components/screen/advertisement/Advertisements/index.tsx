"use client";

import FiltersSideBar from "@/components/screen/advertisement/Filters/FiltersSideBar";
import { SearchBar } from "@/components/SearchBar";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { usePagination } from "@/hooks/usePagination";
import { ResponseWithPaginationType } from "@/types";
import { IAdvertisement } from "@/types/advertisement";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import AdvertisementList from "./AdvertisementList";

const PER_PAGE = 20;

const Advertisements = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString() || "");
  const paramsString = params.toString();

  const {
    data: advertisements,
    loading,
    loadMore,
    setData: setAdvertisementsData,
    setLoading: setLoadingAdvertisements,
    page,
    lastPage,
    reset: resetPagination,
  } = usePagination<IAdvertisement>({ perPage: PER_PAGE });

  const {
    data: adsData,
    loading: fetchingAds,
    refetch: refetchAds,
  } = useFetch<ResponseWithPaginationType<IAdvertisement[]>>(
    `${API_URL.Public.ad}?page=${page}&per_page=${PER_PAGE}&${paramsString}`,
  );

  useEffect(() => {
    resetPagination();
  }, [paramsString, resetPagination]);

  useEffect(() => {
    if (adsData) {
      setAdvertisementsData(adsData);
    }
  }, [adsData, setAdvertisementsData]);

  useEffect(() => {
    setLoadingAdvertisements(fetchingAds);
  }, [fetchingAds, setLoadingAdvertisements]);

  const showLoadMore =
    advertisements.length > 0 && lastPage !== page && lastPage > page;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full items-center justify-center bg-primary-50">
        <div className="hidden h-8 w-[1224px] grid-cols-12 justify-between px-5 md:grid md:h-14 xl:px-0">
          <div className="col-span-4">
            <FiltersSideBar />
          </div>
          <div className="relative col-span-8 flex justify-end">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-[1224px] flex-wrap items-center justify-center gap-5 pt-[72px] lg:mt-12 xl:justify-between">
        <AdvertisementList
          advertisements={advertisements}
          loading={loading}
          onLoadMore={loadMore}
          showLoadMore={showLoadMore}
          refetch={refetchAds}
        />
      </div>
    </div>
  );
};

export default Advertisements;
