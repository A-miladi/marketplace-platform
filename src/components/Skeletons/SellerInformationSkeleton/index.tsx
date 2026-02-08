import Skeleton from "react-loading-skeleton";

export const SellerInformationSkeleton = () => {
  return (
    <div className="h-full w-full rounded-2xl py-6 md:px-10 lg:sticky lg:top-2 lg:w-1/2 lg:shadow-custom_shadow">
      <div className="flex w-full flex-col items-center">
        <div className="h-[88px] w-[88px] rounded-full p-1"></div>
        <Skeleton width={120} height={20} className="mt-3" />
      </div>
      <Skeleton height={56} className="mt-5 w-full" />
      <div className="mt-4 flex w-full justify-between gap-2">
        <div className="flex h-14 w-full items-center justify-between rounded-md bg-neutral-50 px-3">
          <Skeleton width={120} height={20} />
          <Skeleton width={100} height={20} />
        </div>
        <Skeleton width={56} height={56} className="rounded-md" />
      </div>
      <Skeleton height={56} className="mt-4 w-full" />
    </div>
  );
};
