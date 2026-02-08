"use client";
import { ErrorToast } from "@/components/icons/ErrorToast";
import { SuccessToast } from "@/components/icons/SuccessToast";
import { WarningToast } from "@/components/icons/WarningToast";
import AdvertisementSlider from "@/components/screen/advertisement/AdvertisementSlider";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { useUserInfoStore } from "@/store/useUserInfo";
import { ResponseType } from "@/types";
import { IAdvertisement, Status } from "@/types/advertisement";

import { Edit } from "@/components/icons/Edit";
import { SearchBar } from "@/components/SearchBar";
import { SellerInformationSkeleton } from "@/components/Skeletons";
import AdDetailCardSkeleton from "@/components/Skeletons/AdDetailCardSkeleton";
import { Button } from "@/components/ui";
import { CURRENCY_SYMBOLS, PageUrls } from "@/constants";
import { AdStats } from "@/constants/Status";
import { useRouter } from "@/i18n/routing";
import { addCommas } from "@/utils";
import { useEffect } from "react";
import AdDetailCard from "./AdDetailCard";
import RelatedAd from "./RelatedAdvertisement";
import SellerInformation from "./SellerInformation";
import ShareAd from "./ShareAd";

function SingleAd({ id }: { id: string }) {
  const router = useRouter();

  const { userInfo } = useUserInfoStore();

  const {
    data: SingleAd,
    loading,
    refetch,
  } = useFetch<ResponseType<IAdvertisement>>(`${API_URL.Public.ad}/${id}`);
  const renderTaskStatus = (status?: Status) =>
    SingleAd?.data?.status === status;

  useEffect(() => {
    if (
      userInfo.id !== SingleAd?.data?.user.id &&
      SingleAd?.data.status === AdStats.pending
    ) {
      router.push(PageUrls.Home.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex w-full items-center justify-center pt-[60] md:pt-[100px] lg:pt-[124]">
      <div className="absolute top-0 hidden h-8 w-full justify-center bg-primary-50 px-5 md:flex md:h-14 lg:flex">
        <SearchBar />
      </div>
      <div className="w-full max-w-[1224px] flex-col items-center px-5 xl:px-0">
        {userInfo.id == SingleAd?.data?.user.id && (
          <div className="flex flex-col-reverse items-start gap-3 pb-3 md:flex-row md:items-center md:pt-12 lg:justify-between lg:py-4">
            <Button
              onClick={() =>
                router.push(`${PageUrls.Sell.edit}/${SingleAd.data.id}`)
              }
              className="rounded-lg bg-transparent px-2"
              variant="outlined"
              color="primary"
              type="button"
            >
              <Edit color="currentColor" size={18} />
              <p className="text-xs font-medium">Edit Advertisement</p>
            </Button>

            {renderTaskStatus("APPROVED") && (
              <Button
                className="cursor-text rounded-lg border-2 border-neutral-100 bg-transparent px-2"
                dir="rtl"
                type="button"
              >
                <p className="text-xs font-medium text-green-600">
                  Approve Advertisement
                </p>
                {<SuccessToast size={24} />}
              </Button>
            )}
            {renderTaskStatus("PENDING") && (
              <Button
                className="cursor-text rounded-lg border-2 border-neutral-100 bg-transparent px-2"
                dir="rtl"
                type="button"
              >
                <p className="text-xs font-medium text-yellow-500">
                  pending for the announcement to be published
                </p>
                {<WarningToast size={24} />}
              </Button>
            )}
            {renderTaskStatus("REJECTED") && (
              <Button
                className="cursor-text rounded-lg border-2 border-neutral-100 bg-transparent px-2"
                dir="rtl"
                type="button"
              >
                <p className="text-xs font-medium text-red-500">
                  Reject Advertisement
                </p>
                {<ErrorToast size={24} />}
              </Button>
            )}
          </div>
        )}

        {SingleAd?.data.images && SingleAd?.data.images.length > 0 && (
          <AdvertisementSlider images={SingleAd.data.images} />
        )}
        <div className="mt-8 flex w-full flex-col gap-8 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex h-full w-full flex-col gap-4 lg:w-1/2 lg:gap-5">
            <ShareAd
              status={SingleAd?.data.status || "PENDING"}
              refetch={refetch}
              id={SingleAd?.data.id || 0}
              is_bookmarked={SingleAd?.data.is_bookmarked || false}
              title={SingleAd?.data.title}
              date={SingleAd?.data.created_at}
            />

            {loading ? (
              <div className="flex flex-col gap-4 md:gap-5">
                <AdDetailCardSkeleton />
                <AdDetailCardSkeleton />
                <AdDetailCardSkeleton />
              </div>
            ) : (
              <div className="flex flex-col gap-4 md:gap-5">
                <AdDetailCard
                  label="Price"
                  value={`${SingleAd?.data.currency ? CURRENCY_SYMBOLS[SingleAd.data.currency] : ""} ${addCommas(String(SingleAd?.data.price))}`}
                />
                <AdDetailCard
                  label="Address"
                  value={`${SingleAd?.data.address}`}
                />

                <AdDetailCard
                  label="Zip Code"
                  value={SingleAd?.data.zip_code}
                />

                <AdDetailCard
                  label="Category"
                  value={`${SingleAd?.data.category.name}`}
                />

                {SingleAd?.data.properties.map((property) => (
                  <AdDetailCard
                    key={property.id}
                    label={property.property_definition.name}
                    value={property.value}
                  />
                ))}

                <div className="flex h-full w-full flex-col items-start justify-between gap-3 rounded-md bg-neutral-50 px-3 py-[14px] lg:gap-4">
                  <p className="text-xs font-normal text-neutral-950 md:text-xl">
                    Description
                  </p>
                  <p className="max-w-full overflow-hidden text-wrap break-words text-xs font-normal leading-6 text-neutral-600 md:text-base">
                    {SingleAd?.data.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <SellerInformationSkeleton />
          ) : (
            <SellerInformation
              is_verified={SingleAd?.data.user.profile.is_verified || false}
              role={SingleAd?.data.user.role || "USER"}
              status={SingleAd?.data.user.profile.status}
              sellerId={SingleAd?.data.user.id || ""}
              full_name={SingleAd?.data.user.profile.full_name}
              avatar={SingleAd?.data?.user?.profile?.avatar}
              phone_number={SingleAd?.data.user.phone_number}
              showPhone={SingleAd?.data.show_phone}
            />
          )}
        </div>

        <RelatedAd
          isApproved={SingleAd?.data.status === AdStats.approved}
          id={id}
        />
      </div>
    </div>
  );
}

export default SingleAd;
