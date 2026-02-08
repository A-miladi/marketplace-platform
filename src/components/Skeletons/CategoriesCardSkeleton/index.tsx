import Skeleton from "react-loading-skeleton";

export const CategoriesCardSkeleton = () => {
  return (
    <div className="relative flex h-[121px] flex-col items-center px-2 pb-2 md:h-[224px]">
      <div className="relative z-20 h-full w-full px-2">
        <Skeleton className="h-full w-full rounded-xl" />
        <div className="absolute bottom-0 left-0 z-10 flex h-full w-full items-end justify-center rounded-xl bg-gradient-to-t from-neutral-950 to-transparent pb-4">
          <Skeleton width={80} height={16} className="rounded-md" />
        </div>
      </div>
      <div className="absolute bottom-0 h-[49px] w-full rounded-b-2xl rounded-t-lg bg-primary-700 md:h-[98px]">
        <Skeleton height={49} className="w-full rounded-b-2xl md:h-[98px]" />
      </div>
    </div>
  );
};
