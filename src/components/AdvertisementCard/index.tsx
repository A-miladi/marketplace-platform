"use client";

import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"));

import { ArrowDown, Gallery } from "@/components/icons";
import { CURRENCY_SYMBOLS, PageUrls, USER_TOKEN } from "@/constants";
import { Link, usePathname } from "@/i18n/routing";
import { IAdvertisement } from "@/types/advertisement";
import { addCommas, truncateText } from "@/utils";
import dayjs from "dayjs";
import { useTranslations } from "use-intl";

import { useEffect, useState } from "react";
import BookMark from "./BookMark";

import Cookies from "js-cookie";

interface IAdvertisementCard {
  item: IAdvertisement;
  refetch: () => void;
}

const AdvertisementCard = ({ item, refetch }: IAdvertisementCard) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const t = useTranslations("ButtonText");

  const mobileDescription = truncateText(item.description || "", 32);
  const desktopDescription = truncateText(item.description || "", 200);

  const pathName = usePathname();

  useEffect(() => {
    if (
      pathName === PageUrls.Favorites.favorites ||
      pathName === PageUrls.Profile.profile
    ) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(item.is_bookmarked);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  const [token, setToken] = useState<string | null>(null);
  const storedToken = Cookies.get(USER_TOKEN);

  useEffect(() => {
    setToken(storedToken ? storedToken : "");
  }, [storedToken]);

  return (
    <div className="flex min-h-[165px] w-[376px] justify-between rounded-xl border-2 border-neutral-100 bg-white lg:min-h-[455px] lg:flex-col lg:p-3">
      <div className="relative w-[35%] flex-shrink-0 lg:w-full">
        {item.images.length > 0 ? (
          <Image
            alt=""
            width={800}
            height={800}
            src={item.images[0]}
            className="h-full w-full rounded-bl-xl rounded-tl-xl border-r object-cover md:border lg:h-[215px] lg:w-[344px] lg:rounded-lg"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-bl-xl rounded-tl-xl border-r bg-neutral-100 text-neutral-300 lg:h-[215px] lg:w-[344px] lg:rounded-lg">
            <Gallery
              color="currentColor"
              className="w-14 md:h-[72px] md:w-[72px]"
            />
          </div>
        )}
        <div className="absolute left-0 top-0 flex items-center justify-center rounded-br-xl rounded-tl-xl bg-primary-700 px-2 py-1 lg:rounded-br-lg lg:rounded-tl-lg lg:px-3 lg:py-[6.5px]">
          <p className="text-[10px] font-medium text-white lg:text-sm">
            {item.category.name}
          </p>
        </div>
      </div>

      <div className="flex h-full w-3/4 flex-col items-start justify-between gap-2 px-2 py-3 lg:w-full lg:px-0">
        <div className="flex h-full w-full flex-col gap-2">
          <div className="flex w-full justify-between text-neutral-950">
            <h6 className="line-clamp-1 truncate text-sm font-medium">
              {item.title}
            </h6>

            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className={token ? "block" : "hidden"}
            >
              <BookMark
                refetch={refetch}
                is_bookmarked={isBookmarked}
                id={item.id}
              />
            </div>
          </div>
          <p className="text-xs font-medium text-neutral-600">
            {item.city?.name}
          </p>
          <p className="max-w-full break-words text-xs font-medium text-neutral-600">
            <span className="max-w-full lg:hidden">{mobileDescription}</span>
            <span className="hidden max-w-full lg:inline">
              {desktopDescription}
            </span>
          </p>
          <p className="text-xs font-normal text-neutral-400">
            {dayjs(item.created_at).format("YYYY/MM/DD")}
          </p>
        </div>
        <div className="mt-1 flex w-full items-center justify-between gap-2">
          <p className="truncate break-words text-xs font-medium lg:text-sm lg:font-bold">
            <span>
              {item?.currency ? CURRENCY_SYMBOLS[item?.currency] : ""}
            </span>{" "}
            {addCommas(String(item.price))}
          </p>
          <Link
            href={`${PageUrls.Advertisement.advertisement}/${item.id}`}
            className="flex h-7 min-w-fit cursor-pointer items-center justify-center gap-1 rounded-md border border-primary-700 bg-white px-2 text-neutral-950 md:h-8"
          >
            <p className="text-xs font-medium lg:text-sm">{t("View")}</p>

            <ArrowDown
              color="currentColor"
              size={16}
              className="hidden -rotate-90 lg:block"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdvertisementCard;
