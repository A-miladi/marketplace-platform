"use client";

import AppLoader from "@/components/AppLoader";
import { ArrowDown } from "@/components/icons";
import { Button } from "@/components/ui";
import { PageUrls, USER_TOKEN } from "@/constants";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { useRouter } from "@/i18n/routing";
import { useUserInfoStore } from "@/store/useUserInfo";
import { ResponseType } from "@/types";
import { TProfileContent } from "@/types/profile";
import { User } from "@/types/user";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProfileContent from "./ProfileContent";
import UserProfileSidebar from "./UserProfileSidebar";

const Profile = () => {
  const [currentContent, setCurrentContent] =
    useState<TProfileContent>("MY_PROFILE");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const { setUserInfo } = useUserInfoStore();

  const router = useRouter();

  const token = Cookies.get(USER_TOKEN);
  useEffect(() => {
    if (!token) {
      router.push(PageUrls.Home.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const checkScreenSize = () => {
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobile(isSmallScreen);
      if (!isSmallScreen) {
        setShowSidebar(true);
      } else {
        setShowSidebar(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const {
    data: userData,
    loading: userDataLoading,
    refetch: refetchProfileData,
  } = useFetch<ResponseType<User>>(`${API_URL.User.User}`);

  useEffect(() => {
    if (userData?.data) {
      setUserInfo(userData.data);
    }
  }, [setUserInfo, userData?.data, refetchProfileData]);

  useEffect(() => {
    if (userData?.data.profile.status === "BLOCKED") {
      Cookies.remove(USER_TOKEN);

      localStorage.clear();

      router.push(PageUrls.Home.home);
      toast.error(
        "Your Account has been blocked! Please contact uniq alpha support.",
      );
    }
  }, [userData]);

  return (
    <div className="relative m-auto mt-[44px] flex w-full max-w-[1224px] justify-between gap-5 px-5 md:gap-8 lg:flex-row xl:px-0">
      {userDataLoading ? (
        <AppLoader />
      ) : isMobile ? (
        showSidebar ? (
          <div className="w-full rounded-2xl p-4 lg:border lg:border-neutral-100">
            <UserProfileSidebar
              setCurrentContent={(content) => {
                setCurrentContent(content);
                setShowSidebar(false);
              }}
              currentContent={currentContent}
            />
          </div>
        ) : (
          <div className="flex w-full flex-col">
            <Button
              onClick={() => setShowSidebar(true)}
              className="h-6 w-6 cursor-pointer border-2 border-neutral-950 bg-transparent p-0"
            >
              <ArrowDown className="rotate-90" size={12} color="#000" />
            </Button>
            <ProfileContent content={currentContent} />
          </div>
        )
      ) : (
        <>
          <div className="h-fit w-full rounded-2xl border border-neutral-100 p-4 lg:w-[45%]">
            <UserProfileSidebar
              setCurrentContent={setCurrentContent}
              currentContent={currentContent}
            />
          </div>
          <ProfileContent content={currentContent} />
        </>
      )}
    </div>
  );
};

export default Profile;
