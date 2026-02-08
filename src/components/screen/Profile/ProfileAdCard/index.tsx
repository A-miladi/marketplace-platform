"use client";
import { Gallery, Save2 } from "@/components/icons";
import { Delete } from "@/components/icons/Delete";
import { Edit } from "@/components/icons/Edit";
import { Separator } from "@/components/icons/Separator";
import { Button } from "@/components/ui";
import { CURRENCY_SYMBOLS, PageUrls } from "@/constants";
import { Link, useRouter } from "@/i18n/routing";
import { IAdvertisement } from "@/types/advertisement";
import { addCommas, truncateText } from "@/utils";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";

interface IAdvertisementCard {
  item: IAdvertisement;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  hasFavoriteCard: boolean;
  hasMyAdCard: boolean;
}

const ProfileAdCard: FC<IAdvertisementCard> = ({
  item,
  setIsDeleteModalOpen,
  hasFavoriteCard,
  hasMyAdCard,
}) => {
  const t = useTranslations("ButtonText");

  const mobileDescription = truncateText(item.description || "", 30);
  const desktopDescription = truncateText(item.description || "", 200);

  const router = useRouter();

  return (
    <div className="flex h-[161px] w-full justify-between rounded-xl border-2 border-neutral-100 bg-white md:h-[227px] md:w-[500px] md:p-2 lg:w-full">
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
          <div className="flex w-full justify-between">
            <h6 className="w-[220px] truncate text-sm font-normal lg:text-base lg:font-medium xl:w-[290px]">
              {item?.title}
            </h6>

            {hasFavoriteCard && (
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-transparent text-neutral-950"
              >
                <Save2 color="currentColor" size={24} className="" />
              </Button>
            )}
          </div>

          <p className="mt-2 text-xs font-medium text-neutral-600 lg:text-sm">
            {item?.city?.name}
          </p>
          <div className="max-w-full overflow-hidden text-ellipsis break-words">
            <p className="mt-2 line-clamp-2 max-w-full overflow-hidden text-ellipsis break-words text-xs font-normal leading-[18px] text-neutral-600 md:leading-6 lg:text-sm">
              <span className="max-w-full break-words lg:hidden">
                {mobileDescription}
              </span>
              <span className="hidden max-w-full break-words lg:inline">
                {desktopDescription}
              </span>
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col justify-end gap-2 lg:mt-4 lg:gap-4">
          <div className="mt-1 flex w-full items-center justify-between pr-2 md:pr-0">
            <p className="text-xs font-medium lg:text-sm lg:font-bold">
              <span className="text-md pr-0.5 font-medium text-neutral-700">
                {CURRENCY_SYMBOLS[item.currency]}
              </span>
              {addCommas(String(item.price))}
            </p>
            <Link
              href={`${PageUrls.Advertisement.advertisement}/${item.id}`}
              className="flex h-7 px-3 cursor-pointer items-center justify-center gap-2 rounded-md border border-primary-700 bg-white text-neutral-950 md:h-8"
            >
              <p className="text-xs font-medium md:text-sm">{t("View")}</p>
            </Link>
          </div>
          <div className="flex w-full items-end justify-between">
            <p className="text-xs font-normal text-neutral-400">
              {dayjs(item.created_at).format("YYYY/MM/DD")}
            </p>
            <div className="flex items-center">
              {hasMyAdCard && (
                <>
                  <Button
                    onClick={() =>
                      router.push(`${PageUrls.Sell.edit}/${item.id}`)
                    }
                    className="h-[16px] bg-transparent py-0 text-sm font-light text-primary-700 lg:h-[17px]"
                  >
                    <Edit color="currentColor" size={14} />
                    <p className="hidden lg:flex"> Edit</p>
                  </Button>

                  <Separator size={15} />

                  <Button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="h-[16px] bg-transparent py-0 text-sm font-light text-primary-700 lg:h-[17px]"
                  >
                    <Delete color="currentColor" size={16} />
                    <p className="hidden lg:flex">Delete</p>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdCard;
