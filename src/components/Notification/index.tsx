"use client";

import { PageUrls } from "@/constants";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { useRouter } from "@/i18n/routing";
import { useNotificationStore } from "@/store/notification";
import { ResponseWithPaginationType } from "@/types";
import { INotification } from "@/types/notification";
import { useEffect } from "react";
import { Notification } from "../icons";
import { Button } from "../ui";

function NavNotification() {
  const { data: notifications, refetch } = useFetch<
    ResponseWithPaginationType<INotification[]>
  >(API_URL.User.Notification, {
    autoFetch: false,
  });

  const unreadCount =
    notifications?.data?.filter((notification) => !notification.read).length ||
    0;

  const shouldRefetch = useNotificationStore((state) => state.shouldRefetch);
  const setShouldRefetch = useNotificationStore(
    (state) => state.setShouldRefetch,
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetch, setShouldRefetch]);

  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center border-l border-neutral-300 lg:border-l-0 lg:border-r">
      <Button
        onClick={() => router.push(PageUrls.Notification.notification)}
        className="h-6 w-full rounded-none bg-transparent p-0 pl-2 text-neutral-950 lg:pl-0 lg:pr-3"
      >
        {<Notification size={24} color="currentColor" />}
      </Button>
      {unreadCount > 0 && (
        <div className="absolute -top-1 right-0 rounded-[3px] bg-red-600 px-1 lg:right-1">
          <p className="text-[10px] text-white">{unreadCount}</p>
        </div>
      )}
    </div>
  );
}

export default NavNotification;
