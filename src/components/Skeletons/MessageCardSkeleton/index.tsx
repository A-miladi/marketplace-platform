import Skeleton from "react-loading-skeleton";

export const MessageCardSkeleton = () => {
  return (
    <div className="h-32 w-full rounded-xl border border-neutral-100 p-3">
      <div className="flex gap-3">
        <Skeleton circle width={112} height={104} className="rounded-full" />
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center justify-between gap-3">
              <Skeleton width={120} height={20} />
              <Skeleton width={24} height={24} className="rounded-full" />
            </div>
            <div className="w-full">
              <Skeleton width="80%" height={16} />
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-2">
            <Skeleton width={80} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
