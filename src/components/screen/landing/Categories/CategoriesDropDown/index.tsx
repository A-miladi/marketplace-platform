"use client";

import { ArrowDown } from "@/components/icons";
import DropDown from "@/components/ui/DropDown";
import { PageUrls } from "@/constants";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { Link } from "@/i18n/routing";
import { ResponseType } from "@/types";
import { ICategory } from "@/types/category";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const CategoriesDropDown = () => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const t = useTranslations("Header");

  const { data, refetch } = useFetch<ResponseType<ICategory[]>>(
    `${API_URL.Public.category}?page=1&per_page=100`,
    {
      autoFetch: false,
    },
  );

  useEffect(() => {
    if (openDropDown) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDropDown]);

  return (
    <div className="flex text-xs font-normal text-neutral-950 lg:text-sm xl:text-base">
      <DropDown
        className="top-2"
        open={openDropDown}
        setOpen={setOpenDropDown}
        label={<p>{t("Category")}</p>}
        icon={
          <ArrowDown
            size={20}
            color="currentColor"
            className={cn("rotate-0 transition-all", {
              "rotate-180": openDropDown,
            })}
          />
        }
      >
        <div className="flex h-full flex-col text-neutral-950">
          {data?.data.map((item, idx) => (
            <Link
              onClick={() => setOpenDropDown(false)}
              href={`${PageUrls.Advertisement.advertisement}?category_ids=${item.id}`}
              key={idx}
              className={cn(
                "cursor-pointer border-b border-neutral-50 px-3 py-2 text-sm transition-all hover:text-primary-700",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DropDown>
    </div>
  );
};

export default CategoriesDropDown;
