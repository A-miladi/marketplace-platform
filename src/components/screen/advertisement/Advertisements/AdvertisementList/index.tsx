import AdvertisementCard from "@/components/AdvertisementCard";
import { AdvertisementCardSkeleton } from "@/components/Skeletons";
import NoAdsMessage from "@/components/screen/advertisement/NoAdsMessage";
import { Button } from "@/components/ui";
import { IAdvertisement } from "@/types/advertisement";

interface AdvertisementListProps {
  advertisements: IAdvertisement[];
  loading: boolean;
  onLoadMore: () => void;
  showLoadMore: boolean;
  refetch: () => void;
}

const AdvertisementList = ({
  advertisements,
  loading,
  onLoadMore,
  showLoadMore,
  refetch,
}: AdvertisementListProps) => {
  if (loading) {
    return <AdvertisementCardSkeleton />;
  }

  if (!advertisements.length) {
    return <NoAdsMessage />;
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-wrap gap-4 px-5 md:max-w-[1224px] md:gap-8 md:px-4 xl:px-0">
        {advertisements.map((item, idx) => (
          <AdvertisementCard refetch={refetch} item={item} key={idx} />
        ))}
      </div>
      {showLoadMore && (
        <div className="flex w-full items-center justify-center">
          <Button
            onClick={onLoadMore}
            disabled={loading}
            className="mt-10 h-12 w-1/4 rounded-lg bg-primary-700 text-white hover:bg-primary-800 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdvertisementList;
