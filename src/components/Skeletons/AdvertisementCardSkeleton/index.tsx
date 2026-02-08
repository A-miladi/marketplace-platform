import Skeleton from "react-loading-skeleton";

export const AdvertisementCardSkeleton = () => {
  return (
    <div className="flex h-[161px] w-[376px] justify-between rounded-xl border-2 border-neutral-100 bg-white lg:h-[444px] lg:flex-col lg:p-3">
      <div className="relative w-2/4 lg:w-full">
        <div className="h-full md:h-[215px]">
          <Skeleton width={"100%"} className="h-full" />
        </div>

        <div className="hidden h-full md:block">
          {/*Image Skeleton*/}
          <Skeleton
            width={80}
            height={20}
            className="absolute left-0 top-2 z-0 hidden md:block"
            style={{ borderRadius: "5px" }}
          />
        </div>
      </div>

      <div className="flex h-full w-3/4 flex-col items-start mt-2 justify-between gap-2 px-2 py-3 lg:w-full lg:px-0">
        <div className="flex w-full flex-col gap-2">
          <Skeleton width={150} height={20} /> {/*Title Skeleton*/}
          <Skeleton width={100} height={15} /> {/*Brand Skeleton*/}
          {/*Description Skeleton*/} {/*Adjust count for lines*/}
        </div>
        <div className="mt-1 flex w-full items-center justify-between">
          <Skeleton width={50} height={20} /> {/*Price Skeleton*/}
          <Skeleton width={70} height={30} /> {/*Button Skeleton*/}
        </div>
      </div>
    </div>
  );
};
