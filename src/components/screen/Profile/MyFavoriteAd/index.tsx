"use client";
import { Save } from "@/components/icons";
import { MyAdsSkeleton } from "@/components/Skeletons";
import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { usePagination } from "@/hooks/usePagination";
import { ResponseWithPaginationType } from "@/types";
import { GetBookmarkAdvertisement } from "@/types/advertisement";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import ProfileAdCard from "../ProfileAdCard";
import RemoveFavoriteAdModal from "./RemoveFavoriteAd";

const PER_PAGE = 3;

function MyFavoriteAd() {
  const t = useTranslations("UserProfile.FavoriteAdvertisement");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: favorites,
    loading,
    loadMore,
    setData: setFavoritesData,
    setLoading: setFavoritesLoading,
    page,
    lastPage,
  } = usePagination<GetBookmarkAdvertisement>();

  const { data: bookmarkData, refetch: refetchBookMark } = useFetch<
    ResponseWithPaginationType<GetBookmarkAdvertisement[]>
  >(`${API_URL.User.Bookmark}?page=${page}&per_page=${PER_PAGE}`);

  useEffect(() => {
    if (bookmarkData) {
      setFavoritesData(bookmarkData);
    }
  }, [bookmarkData, setFavoritesData]);

  useEffect(() => {
    setFavoritesLoading(loading);
  }, [loading, setFavoritesLoading]);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const showLoadMore =
    favorites.length > 0 && lastPage !== page && lastPage > page;

  return (
    <div className="flex w-full flex-col">
      <h4 className="border-b-2 pb-2 font-normal text-neutral-950 lg:text-xl">
        {t("FavoriteAdvertisement")}
      </h4>
      {loading ? (
        <MyAdsSkeleton />
      ) : (
        <div className="w-full">
          {favorites.length ? (
            <div className="mt-6 flex w-full flex-col items-start gap-8 md:items-center lg:items-start">
              {favorites.map((item, idx) => (
                <div
                  key={idx}
                  className="flex w-full items-center justify-center"
                >
                  <ProfileAdCard
                    item={item.ad}
                    setIsDeleteModalOpen={setIsModalOpen}
                    hasFavoriteCard={true}
                    hasMyAdCard={false}
                  />

                  <RemoveFavoriteAdModal
                    refetch={refetchBookMark}
                    open={isModalOpen}
                    id={item.ad.id}
                    onClose={onCloseModal}
                  />
                </div>
              ))}

              <div className="flex w-full items-center justify-center">
                {showLoadMore && (
                  <Button
                    disabled={loading}
                    onClick={loadMore}
                    className="h-12 w-1/3"
                    variant="outlined"
                    color="primary"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                )}

                
              </div>
            </div>
          ) : (
            <div className="mt-[88px] flex w-full flex-col items-center">
              <Save color="#D2F5FF" size={88} />
              <p className="mt-5 text-base font-medium text-neutral-300 lg:mt-8 lg:text-xl lg:font-bold">
                {t("HaveNotFavoriteAd")}{" "}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyFavoriteAd;
