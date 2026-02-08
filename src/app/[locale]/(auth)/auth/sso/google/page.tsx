"use client";

import { PageUrls, USER_TOKEN } from "@/constants";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { useRouter } from "@/i18n/routing";
import { useUserInfoStore } from "@/store/useUserInfo";
import { ResponseType } from "@/types";
import { User } from "@/types/user";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ValidateGooglePage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { setUserInfo } = useUserInfoStore();

  const token = params?.get("token");

  useEffect(() => {
    if (token) {
      Cookies.set(USER_TOKEN, token, { expires: 7 });
    }
  }, [token]);

  const userToken = Cookies.get(USER_TOKEN);

  const { data: userData, loading: userDataLoading } = useFetch<
    ResponseType<User>
  >(`${API_URL.User.User}`, {
    autoFetch: !!userToken,
  });

  useEffect(() => {
    if (userData?.data) {
      setUserInfo(userData.data);
    }
  }, [setUserInfo, userData?.data]);

  useEffect(() => {
    if (userToken && !userDataLoading) {
      router.push(PageUrls.Home.home);
    }
  }, [userToken, router, userDataLoading]);

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm">
      <p className="text-center text-lg font-bold text-white">
        Please Wait ...
      </p>
    </div>
  );
};

export default ValidateGooglePage;
