import Skeleton from "react-loading-skeleton";

export const MyAdsSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center">
     <div className="mt-6 flex h-[181px] w-full justify-between gap-4 rounded-xl border-2 border-neutral-100 bg-white p-2 md:h-[227px] md:w-2/3 lg:w-full lg:p-4">
        <div className="mb-2 h-full w-[180px]">
          <div className="h-full">
            <Skeleton width={180} className="h-[95%]" />
          </div>
        </div>

        <div className="mt- flex h-full w-3/4 flex-col items-start justify-between gap-2 lg:w-full lg:px-0">
          <div className="flex w-full flex-col gap-2">
            <Skeleton width={150} height={20} />
            <Skeleton width={100} height={15} />
            <Skeleton width={100} height={15} />
          </div>

          <div className="flex w-full flex-col gap-2">
            <Skeleton width={50} height={15} />
            <Skeleton width={150} height={20} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex h-[181px] w-full justify-between gap-4 rounded-xl border-2 border-neutral-100 bg-white p-2 md:h-[227px] md:w-2/3 lg:w-full lg:p-4">
        <div className="mb-2 h-full w-[180px]">
          <div className="h-full">
            <Skeleton width={180} className="h-[95%]" />
          </div>
        </div>

        <div className="mt- flex h-full w-3/4 flex-col items-start justify-between gap-2 lg:w-full lg:px-0">
          <div className="flex w-full flex-col gap-2">
            <Skeleton width={150} height={20} />
            <Skeleton width={100} height={15} />
            <Skeleton width={100} height={15} />
          </div>

          <div className="flex w-full flex-col gap-2">
            <Skeleton width={50} height={15} />
            <Skeleton width={150} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
