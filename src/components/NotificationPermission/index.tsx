"use client";

import { USER_TOKEN } from "@/constants";
import { useFCM } from "@/hooks/useFCM";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const NotificationPermission = () => {
  const { permission, requestNotificationPermission } = useFCM();
  //   const t = useTranslations("Notifications");

  const token = Cookies.get(USER_TOKEN);

  useEffect(() => {
    if (permission === "default" && token) {
      requestNotificationPermission();
    }
  }, [permission, requestNotificationPermission, token]);

  return null;
};
