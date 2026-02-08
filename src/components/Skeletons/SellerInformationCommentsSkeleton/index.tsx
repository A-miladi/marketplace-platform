import Skeleton from "react-loading-skeleton";

export const SellerInformationCommentsSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border-2 p-3 md:px-4 md:py-5">
      <div className="h-[56px] w-[56px] rounded-full md:h-[80px] md:w-[80px]">
        <Skeleton circle width="100%" height="100%" />
      </div>

      <div className="flex w-full flex-1 flex-col justify-center gap-2">
        <div className="flex w-full justify-between">
          <Skeleton width={120} height={20} />
          <div className="flex items-center gap-2">
            <Skeleton width={50} height={16} />
            <Skeleton width={24} height={24} circle />
          </div>
        </div>
        <Skeleton width="60%" height={16} />
      </div>
    </div>
  );
};
