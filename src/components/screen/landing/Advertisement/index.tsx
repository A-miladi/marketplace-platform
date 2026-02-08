"use client";

import { AdvertisementCardSkeleton } from "@/components/Skeletons";
import { Button } from "@/components/ui";
import { PageUrls } from "@/constants";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { Link } from "@/i18n/routing";
import { ResponseType } from "@/types";
import { IAdvertisement } from "@/types/advertisement";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const AdvertisementCard = dynamic(
  () => import("@/components/AdvertisementCard"),
);

const Advertisement = () => {
  const t = useTranslations("Advertisement");

  const { data, loading, refetch } = useFetch<ResponseType<IAdvertisement[]>>(
    `${API_URL.Public.ad}?page=1&per_page=6`,
  );

  return (
    <>
      {data?.data.length ? (
        <div className="mt-[83px] bg-gray-50 py-4 md:mt-[192px] md:py-14">
          <div className="relative flex w-full items-center justify-center gap-2">
            <hr className="absolute w-[92%] rounded-sm border-2 border-primary-700 bg-primary-700 md:w-[62%]" />
            <h2 className="relative z-10 bg-gray-50 px-2 text-xl font-medium text-neutral-950">
              {t("Advertisement")}
            </h2>
          </div>

          <div className="flex justify-center py-5 md:py-12">
            <div className="flex w-full flex-wrap justify-center gap-4 px-4 md:max-w-[1224px] md:gap-8 xl:justify-start">
              {data &&
                (loading ? (
                  <AdvertisementCardSkeleton />
                ) : (
                  data?.data?.map((item, idx) => (
                    <AdvertisementCard
                      refetch={refetch}
                      item={item}
                      key={idx}
                    />
                  ))
                ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Link href={PageUrls.Advertisement.advertisement}>
              <Button
                variant="contained"
                color="primary"
                className="h-10 w-[120px] md:h-12 md:w-[148px]"
              >
                {t("ViewAll")}
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="h-10"></div>
      )}
    </>
  );
};

export default Advertisement;
