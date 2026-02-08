import BookMark from "@/components/AdvertisementCard/BookMark";
import { Share } from "@/components/icons";
import { USER_TOKEN } from "@/constants";
import { Status } from "@/types/advertisement";
import dayjs from "dayjs";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface ShareAdProps {
  title: string | undefined;
  date: string | undefined;
  id: number;
  is_bookmarked: boolean;
  refetch: () => void;
  status: Status;
}

const ShareAd = ({
  title,
  date,
  id,
  is_bookmarked,
  refetch,
  status,
}: ShareAdProps) => {
  const [token, setToken] = useState<string | null>(null);
  const storedToken = Cookies.get(USER_TOKEN);

  useEffect(() => {
    setToken(storedToken ? storedToken : "");
  }, [storedToken]);

  return (
    <div className="border-b-2 border-neutral-200 pb-4 lg:pb-2">
      <div className="mb-2 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold md:text-[32px]">{title}</h1>
        {status !== "PENDING" && (
          <div className="flex items-center justify-center gap-3 rounded-lg bg-neutral-50 px-2 py-3 md:h-12 md:px-4">
            {token && status === "APPROVED" && (
              <div className="flex h-full items-center justify-center border-r border-neutral-200 bg-transparent pr-3">
                <BookMark
                  id={id}
                  is_bookmarked={is_bookmarked}
                  refetch={refetch}
                />
              </div>
            )}

            <div className="flex h-full cursor-pointer items-center justify-center bg-transparent">
              <Share
                size={24}
                color="currentColor"
                className="h-5 w-5 md:h-6 md:w-6"
              />
            </div>
          </div>
        )}
      </div>
      <p className="text-md text-sm font-normal text-neutral-500 md:text-base">
        {dayjs(date).format("YYYY/MM/DD")}
      </p>
    </div>
  );
};

export default ShareAd;
