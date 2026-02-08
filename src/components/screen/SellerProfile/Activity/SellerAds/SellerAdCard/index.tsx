"use client";
import BookMark from "@/components/AdvertisementCard/BookMark";
import { Gallery } from "@/components/icons";
import { PageUrls } from "@/constants";
import { Link } from "@/i18n/routing";
import { IAdvertisement } from "@/types/advertisement";
import { addCommas, truncateText } from "@/utils";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";

interface IAdvertisementCard {
  item: IAdvertisement;
  refetch: () => void;
}

const SellerAdCard: FC<IAdvertisementCard> = ({ item, refetch }) => {
  const t = useTranslations("ButtonText");

  const mobileDescription = truncateText(item.description || "", 30);
  const desktopDescription = truncateText(item.description || "", 200);

  return (
    <div className="flex h-[161px] w-full justify-between rounded-xl border-2 border-neutral-100 bg-white md:h-auto md:w-[500px] lg:h-[227px] lg:w-full lg:p-2">
      <div className="relative">
        {item.images.length > 0 ? (
          <div className="flex h-full w-[142px] items-center justify-center rounded-bl-xl rounded-tl-xl border-r bg-neutral-100 text-neutral-300 lg:h-[203px] lg:w-[218px] lg:rounded-lg">
            <Image
              alt=""
              width={218}
              height={203}
              src={item.images[0]}
              className="h-full w-full rounded-bl-xl rounded-tl-xl border-r object-cover md:border lg:h-[203px] lg:w-[218px] lg:rounded-lg"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-bl-xl rounded-tl-xl border-r bg-neutral-100 text-neutral-300 md:h-[203px] md:w-[218px] lg:rounded-lg">
            <Gallery
              color="currentColor"
              className="w-[142px] md:h-[72px] md:w-[72px]"
            />
          </div>
        )}
        <div className="absolute left-0 top-0 flex items-center justify-center rounded-br-xl rounded-tl-xl bg-primary-700 px-2 py-1 lg:rounded-br-lg lg:rounded-tl-lg lg:px-3 lg:py-[6.5px]">
          <p className="bg-primary-700 text-[10px] font-medium text-white lg:text-sm">
            {item?.category?.name}
          </p>
        </div>
      </div>

      <div className="flex h-full w-full flex-col items-start justify-between py-3 pl-2 lg:w-full lg:py-0 lg:pl-4">
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between pr-2">
            <h6 className="max-w-[180px] truncate text-sm font-normal lg:text-base lg:font-medium xl:max-w-[290px]">
              {item?.title}
            </h6>

            <BookMark
              id={item.id}
              is_bookmarked={item.is_bookmarked}
              refetch={refetch}
            />
          </div>

          <p className="mt-2 text-xs font-medium text-neutral-600 lg:text-sm">
            {item?.city?.name}
          </p>
          <p className="mt-2 line-clamp-2 overflow-hidden text-ellipsis text-xs font-normal leading-[18px] text-neutral-600 md:max-h-[72px] md:leading-6 lg:text-sm">
            <span className="lg:hidden">{mobileDescription}</span>
            <span className="hidden lg:inline">{desktopDescription}</span>
          </p>
        </div>

        <div className="flex w-full flex-col justify-end gap-2 lg:mt-4 lg:gap-4">
          <div className="mt-1 flex w-full items-center justify-between pr-2 md:pr-0">
            <p className="text-xs font-medium lg:text-sm lg:font-bold">
              <span className="text-md pr-0.5 font-medium text-neutral-700">
                $
              </span>
              {addCommas(String(item.price))}
            </p>
            <Link
              href={`${PageUrls.Advertisement.advertisement}/${item.id}`}
              className="flex h-7 w-16 cursor-pointer items-center justify-center gap-2 rounded-md border border-primary-700 bg-white pl-1 text-neutral-950 md:h-8"
            >
              <p className="text-xs font-medium md:text-sm">{t("View")}</p>
            </Link>
          </div>
          <div className="flex w-full items-end justify-between">
            <p className="text-xs font-normal text-neutral-400">
              {dayjs(item.created_at).format("YYYY/MM/DD")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAdCard;
