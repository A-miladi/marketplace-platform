"use client";
import { Tick } from "@/components/icons";
import { Button, Spinner } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { useFetch, usePost } from "@/hooks";
import { usePagination } from "@/hooks/usePagination";
import { useNotificationStore } from "@/store/notification";
import { ResponseType, ResponseWithPaginationType } from "@/types";
import {
  INotification,
  NotificationStatus,
  ReadNotificationRequest,
} from "@/types/notification";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NotificationCard from "./NotificationCard";

const PER_PAGE = 30;

function Notification() {
  const {
    data: notifications,
    loading,
    loadMore,
    setData: setNotificationsData,
    setLoading: setNotificationsLoading,
    page,
    lastPage,
  } = usePagination<INotification>();

  const t = useTranslations("Notifications");
  const [activeTab, setActiveTab] = useState<NotificationStatus>("UNREAD");
  const {
    data: notificationsData,
    refetch,
    loading: notificationLoading,
  } = useFetch<ResponseWithPaginationType<INotification[]>>(
    `${API_URL.User.Notification}?is_read=${activeTab === "READ"}&page=${page}&per_page=${PER_PAGE}`,
  );
  const setShouldRefetch = useNotificationStore(
    (state) => state.setShouldRefetch,
  );

  const { execute: ReadNotification } = usePost<
    ResponseType<object>,
    ReadNotificationRequest
  >(API_URL.User.Notification, {
    onSuccess: (res) => {
      refetch();
      setShouldRefetch(true);
      toast.success(res.message);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onReadNotification = (id: number | null) => {
    ReadNotification({ notification_id: id });
  };

  useEffect(() => {
    if (notificationsData) {
      setNotificationsData(notificationsData);
    }
  }, [notificationsData, setNotificationsData]);

  useEffect(() => {
    setNotificationsLoading(notificationLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationLoading]);

  const handleReadAll = () => {
    onReadNotification(null);
  };

  const showLoadMore =
    notifications.length > 0 && lastPage !== page && lastPage > page;

  return (
    <div className="flex w-full justify-center px-4 pt-12">
      <div className="flex w-full flex-col gap-6 lg:w-[578px]">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-normal lg:text-2xl lg:font-bold">
            {t("title")}
          </h4>
          {activeTab === "UNREAD" && notifications.length > 0 && (
            <Button
              onClick={handleReadAll}
              className="h-12 w-32"
              variant="contained"
              color="primary"
            >
              Read All <Tick color="currentColor" size={24} />
            </Button>
          )}
        </div>

        <div className="w-full rounded-2xl border pt-6">
          <div className="flex w-full gap-6 border-b-2 border-neutral-100 bg-transparent px-8 lg:gap-12">
            <Button
              onClick={() => setActiveTab("UNREAD")}
              className={`rounded-none bg-transparent px-0 ${
                activeTab === "UNREAD"
                  ? "border-b border-primary-700 text-primary-700"
                  : "text-neutral-950"
              }`}
            >
              {t("UnreadNotifications")}
            </Button>

            <Button
              onClick={() => setActiveTab("READ")}
              className={`rounded-none bg-transparent px-0 ${
                activeTab === "READ"
                  ? "border-b border-primary-700 text-primary-700"
                  : "text-neutral-950"
              }`}
            >
              {t("ReadNotifications")}
            </Button>
          </div>

          <div
            className={`flex w-full flex-col rounded-b-2xl px-3 py-5 lg:p-6 ${
              activeTab === "UNREAD" ? "bg-primary-50" : "bg-white"
            }`}
          >
            {loading ? (
              <div>
                <Spinner size="large" />
              </div>
            ) : notifications.length > 0 ? (
              <>
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`w-full border-b ${!item.read ? "cursor-pointer hover:bg-neutral-50" : ""}`}
                  >
                    <NotificationCard
                      detail={item}
                      onReadNotification={onReadNotification}
                    />
                  </div>
                ))}

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
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-5">
                <Image
                  alt=""
                  width={800}
                  height={800}
                  src={"/assets/image/noNotification.png"}
                  className="w-[188px]"
                />
                <p className="font-bold text-neutral-700">
                  {t("NoNotification")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
