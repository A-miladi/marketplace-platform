import { MyAdsSkeleton } from "@/components/Skeletons";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { ResponseWithPaginationType } from "@/types";
import { IAdvertisement } from "@/types/advertisement";
import Image from "next/image";
import SellerAdCard from "./SellerAdCard";

interface SellerAdsProps {
  userId: number | string;
}

const SellerAds = ({ userId }: SellerAdsProps) => {
  const {
    data: userAd,
    loading,
    refetch,
  } = useFetch<ResponseWithPaginationType<IAdvertisement[]>>(
    `${API_URL.Public.ad}?user_id=${userId}`,
  );

  return (
    <div className="flex w-full flex-col gap-5">
      {loading ? (
        <MyAdsSkeleton />
      ) : userAd?.data.length ? (
        userAd.data.map((item, idx) => (
          <div key={idx}>
            <SellerAdCard item={item} refetch={refetch} />
          </div>
        ))
      ) : (
        <div className=" flex w-full flex-col items-center">
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
    </div>
  );
};

export default SellerAds;
