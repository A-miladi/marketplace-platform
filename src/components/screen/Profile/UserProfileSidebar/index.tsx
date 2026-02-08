"use client";
import { Stars } from "@/components/icons/Star";
import Image from "next/image";
import { FC } from "react";
import UserProfileItem from "../UserProfileItem";

import { Profile } from "@/components/icons";
import { ShieldTick } from "@/components/icons/ShieldTick";
import { useUserInfoStore } from "@/store/useUserInfo";
import { TProfileContent } from "@/types/profile";

interface ISidebarProps {
  setCurrentContent: (value: TProfileContent) => void;
  currentContent: TProfileContent;
}
const UserProfileSidebar: FC<ISidebarProps> = ({
  setCurrentContent,
  currentContent,
}) => {
  const { userInfo } = useUserInfoStore();

  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-4">
          <div className="flex gap-5">
            <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border-2 border-secondary-500 bg-white text-neutral-500">
              {userInfo?.profile?.avatar ? (
                <Image
                  src={userInfo.profile.avatar as string}
                  alt=""
                  width={800}
                  height={800}
                  className="rounded-full"
                />
              ) : (
                <Profile color="currentColor" />
              )}
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-between gap-2 md:items-center">
            <div className="flex flex-col justify-center gap-0.5">
              <p className="flex items-center gap-1.5 text-wrap lg:text-base lg:font-medium">
                {userInfo?.role === "COMPANY" && userInfo?.profile?.company_name
                  ? userInfo.profile.company_name
                  : userInfo?.profile?.full_name}

                <span className="text-primary-700">
                  {userInfo?.profile?.is_verified && (
                    <ShieldTick size={18} color="currentColor" />
                  )}
                </span>
              </p>
              <p className="text-sm text-neutral-500">{userInfo?.email}</p>
            </div>

            {(userInfo?.rate ?? 0) > 0 ? (
              <div className="flex gap-2">
                <p className="text-sm font-medium md:text-base">
                  {Number(userInfo?.rate).toFixed(1)}
                </p>
                <Stars size={24} className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            ) : null}
          </div>
        </div>
        <UserProfileItem
          setCurrentContent={setCurrentContent}
          currentContent={currentContent}
        />
      </div>
    </>
  );
};

export default UserProfileSidebar;
