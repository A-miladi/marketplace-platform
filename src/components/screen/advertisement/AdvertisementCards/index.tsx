"use client";

import AdvertisementCard from "@/components/AdvertisementCard";
import { AdvertisementCardSkeleton } from "@/components/Skeletons";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { ResponseType } from "@/types";
import { IAdvertisement } from "@/types/advertisement";
import Image from "next/image";

const AdvertisementCards = () => {
  const { data, loading, refetch } = useFetch<ResponseType<IAdvertisement[]>>(
    API_URL.Public.ad,
  );

  return (
    <div>
      <div className="mb-24 mt-14 flex justify-center md:mb-0 md:mt-28">
        {loading ? (
          <AdvertisementCardSkeleton />
        ) : data ? (
          <div className="flex w-full flex-wrap gap-4 px-5 md:max-w-[1224px] md:gap-8 xl:px-0">
            {data.data.map((item, idx) => (
              <AdvertisementCard refetch={refetch} item={item} key={idx} />
            ))}
          </div>
        ) : (
          <div className="flex h-[50vh] flex-col items-center justify-center gap-5 md:gap-10">
            <Image
              src={"/assets/image/ad-block.png"}
              width={188}
              height={188}
              className="h-[118px] w-[118px] md:h-[188px] md:w-[188px]"
              alt="uniq-ads"
            />

            <p className="max-w-52 text-center font-medium text-neutral-300 md:max-w-full md:text-2xl md:font-bold">
              {'"No ads are available on this page at the moment."'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementCards;
