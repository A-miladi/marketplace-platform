import Skeleton from "react-loading-skeleton";

const AdDetailCardSkeleton = () => {
  return (
    <div className="flex w-full justify-between rounded-md bg-neutral-50 px-3 py-[14px]">
      <Skeleton width={80} height={20} />
      <Skeleton width={60} height={20} />
    </div>
  );
};

export default AdDetailCardSkeleton;
