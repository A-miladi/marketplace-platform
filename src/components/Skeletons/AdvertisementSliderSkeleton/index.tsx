import Skeleton from "react-loading-skeleton";

export const AdvertisementSliderSkeleton = () => {
  return (
    <div className="slider-container relative mt-12 max-h-[480px] w-full rounded-[20px] md:mt-5">
      <div className="hidden space-x-2 overflow-hidden md:flex">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="relative w-1/3">
            <Skeleton className="h-[408px] w-full" />
          </div>
        ))}
      </div>

      <div className="flex space-x-2 overflow-hidden md:hidden">
        <div className="relative w-full">
          <Skeleton className="h-[408px] w-full" />
        </div>
      </div>

      <div className="absolute left-0 top-0 flex h-[71px] w-full items-center justify-between px-4 pb-5 md:hidden">
        <Skeleton circle width={20} height={20} />
        <div className="flex items-center gap-3">
          <Skeleton circle width={20} height={20} />
          <Skeleton width={20} height={20} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 hidden w-[99.5%] items-end justify-between px-6 pb-5 md:flex">
        <Skeleton width={70} height={38} />
        <div className="flex items-center gap-5">
          <Skeleton circle width={48} height={48} />
          <Skeleton circle width={48} height={48} />
        </div>
      </div>
    </div>
  );
};
