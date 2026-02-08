"use client";
import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { usePagination } from "@/hooks/usePagination";
import { ResponseWithPaginationType } from "@/types";
import { IAdvertisement, Status } from "@/types/advertisement";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import { MyAdsSkeleton } from "../../../Skeletons/MyAdsSkeleton";
import ProfileAdCard from "../ProfileAdCard";
import RemoveAdModal from "./RemoveAdModal";

const PER_PAGE = 3;

function MyAds() {
  const t = useTranslations("UserProfile.MyAds");
  const [activeTab, setActiveTab] = useState<Status>("APPROVED");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<IAdvertisement | null>(null);

  const {
    data: ads,
    loading,
    loadMore,
    setData: setAdsData,
    setLoading: setAdsLoading,
    page,
    lastPage,
  } = usePagination<IAdvertisement>();

  const {
    data: adsData,
    refetch: refetchAds,
    loading: myAdsLoading,
  } = useFetch<ResponseWithPaginationType<IAdvertisement[]>>(
    `${API_URL.User.Ad}?page=${page}&per_page=${PER_PAGE}&status=${activeTab}`,
  );

  useEffect(() => {
    if (adsData) {
      setAdsData(adsData);
    }
  }, [adsData, setAdsData]);

  useEffect(() => {
    setAdsLoading(myAdsLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAdsLoading]);

  const handleDeleteClick = (ad: IAdvertisement) => {
    setSelectedAd(ad);
    setIsDeleteModalOpen(true);
  };

  const showLoadMore = ads.length > 0 && lastPage !== page && lastPage > page;

  return (
    <div className="flex w-full flex-col md:items-center lg:items-start">
      <div className="flex w-full gap-8 border-b-2 border-neutral-100 bg-transparent lg:gap-12">
        <Button
          onClick={() => setActiveTab("APPROVED")}
          className={`rounded-none bg-transparent ${
            activeTab === "APPROVED"
              ? "border-b border-primary-700 text-primary-700"
              : "text-neutral-950"
          }`}
        >
          {t("ApprovedAds")}
        </Button>

        <Button
          onClick={() => setActiveTab("PENDING")}
          className={`rounded-none bg-transparent ${
            activeTab === "PENDING"
              ? "border-b border-primary-700 text-primary-700"
              : "text-neutral-950"
          }`}
        >
          {t("PendingAds")}
        </Button>

        <Button
          onClick={() => setActiveTab("REJECTED")}
          className={`rounded-none bg-transparent ${
            activeTab === "REJECTED"
              ? "border-b border-primary-700 text-primary-700"
              : "text-neutral-950"
          }`}
        >
          {t("RejectedAds")}
        </Button>
      </div>

      {loading ? (
        <MyAdsSkeleton />
      ) : (
        <>
          {ads.length > 0 ? (
            <div className="mt-6 flex w-full flex-col items-start gap-8 md:items-center lg:items-start">
              {ads.map((item, idx) => (
                <ProfileAdCard
                  key={idx}
                  item={item}
                  setIsDeleteModalOpen={() => handleDeleteClick(item)}
                  hasFavoriteCard={false}
                  hasMyAdCard={true}
                />
              ))}
              <div className="flex w-full items-center justify-center">
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
            </div>
          ) : (
            <div className="mt-[88px] flex w-full flex-col items-center">
              <Image
                src={"/assets/image/ad-block.png"}
                width={188}
                height={188}
                alt="No ads"
              />
              <p className="mt-5 text-base font-medium text-neutral-300 lg:mt-8 lg:text-xl lg:font-bold">
                There are no ads in this section.
              </p>
            </div>
          )}
        </>
      )}

      {isDeleteModalOpen && selectedAd && (
        <RemoveAdModal
          onClose={setIsDeleteModalOpen}
          refetch={refetchAds}
          adId={selectedAd.id}
        />
      )}
    </div>
  );
}

export default MyAds;
