import Skeleton from "react-loading-skeleton";

export const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Sender message skeleton */}
      <div className="ml-auto flex w-fit max-w-[80%] items-start rounded-l-lg rounded-tr-lg bg-primary-700 px-5 py-4">
        <div className="flex flex-col gap-1">
          <Skeleton width={200} height={20} className="bg-white/70" />
          <Skeleton width={50} height={12} className="bg-white/70" />
        </div>
      </div>

      {/* Receiver message skeleton */}
      <div className="flex w-fit max-w-[80%] items-start rounded-r-lg rounded-tl-lg bg-neutral-50 px-3 py-2">
        <div className="flex flex-col gap-1">
          <Skeleton width={180} height={20} />
          <Skeleton width={50} height={12} />
        </div>
      </div>

      {/* Repeat a few more times */}
      <div className="ml-auto flex w-fit max-w-[80%] items-start rounded-l-lg rounded-tr-lg bg-primary-700 px-3 py-2">
        <div className="flex flex-col gap-1">
          <Skeleton width={150} height={20} className="bg-white/70" />
          <Skeleton width={50} height={12} className="bg-white/70" />
        </div>
      </div>

      <div className="flex w-fit max-w-[80%] items-start rounded-r-lg rounded-tl-lg bg-neutral-50 px-3 py-2">
        <div className="flex flex-col gap-1">
          <Skeleton width={220} height={20} />
          <Skeleton width={50} height={12} />
        </div>
      </div>
    </div>
  );
};
