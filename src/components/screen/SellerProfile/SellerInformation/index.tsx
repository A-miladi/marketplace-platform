"use client";
import { Profile } from "@/components/icons";
import { ShieldTick } from "@/components/icons/ShieldTick";
import { Stars } from "@/components/icons/Star";
import { SellerInformationCommentsSkeleton } from "@/components/Skeletons";
import { PageUrls } from "@/constants";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { useRouter } from "@/i18n/routing";
import { ResponseType } from "@/types";
import { User } from "@/types/user";
import Image from "next/image";
import { useEffect } from "react";

interface SellerInformationProps {
  id: string | number;
  commentsCount: number | null;
}

function SellerInformation({ id, commentsCount }: SellerInformationProps) {
  const router = useRouter();
  const {
    data: userInfo,
    loading,
    refetch,
  } = useFetch<ResponseType<User>>(`${API_URL.User.User}/${id}`, {
    autoFetch: false,
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, commentsCount]);

  const isPending = userInfo?.data.profile?.status === "PENDING";

  const handleNavigate = () => {
    router.push(`${PageUrls.SellerProfile.sellerProfile}/${id}`);
  };

  return (
    <>
      {loading ? (
        <SellerInformationCommentsSkeleton />
      ) : (
        <div
          className={`flex items-center justify-between gap-5 rounded-2xl border-2 p-3 md:px-4 md:py-5 ${isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          onClick={!isPending ? handleNavigate : undefined}
        >
          <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 border-secondary-400 p-1 text-neutral-500 md:h-[80px] md:w-[80px]">
            {userInfo?.data.profile?.avatar ? (
              <Image
                src={userInfo?.data.profile?.avatar as string}
                alt=""
                width={800}
                height={800}
                className="rounded-full"
              />
            ) : (
              <Profile color="currentColor" />
            )}
          </div>

          <div className="flex w-full flex-1 flex-col justify-center gap-2">
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-1">
                <p className="text-sm font-normal lg:text-base lg:font-medium">
                  {userInfo?.data.role === "COMPANY" &&
                  userInfo?.data.profile?.company_name
                    ? userInfo?.data.profile?.company_name
                    : userInfo?.data.profile?.full_name}
                </p>
                {userInfo?.data.profile?.is_verified && (
                  <ShieldTick
                    size={16}
                    color="currentColor"
                    className="text-primary-700"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-medium text-neutral-300 md:text-xs">
                  ({commentsCount ? commentsCount : 0} comments)
                </p>

                {userInfo?.data.rate && (
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-normal md:text-base md:font-medium">
                      {Number(userInfo?.data.rate).toFixed(1)}
                    </p>
                    <Stars size={24} className="w-3 md:w-6" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs font-normal text-neutral-500 lg:text-sm">
              {userInfo?.data.email}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SellerInformation;
