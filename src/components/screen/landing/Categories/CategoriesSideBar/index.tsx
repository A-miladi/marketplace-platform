"use client";

import { Button } from "@/components/ui";
import { SideBar } from "@/components/ui/SideBar";
import { PageUrls } from "@/constants";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { Link } from "@/i18n/routing";
import { ResponseType } from "@/types";
import { ICategory } from "@/types/category";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const CategorieSideBar = () => {
  const t = useTranslations("Header");
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar(true);
  };

  const onSideBarClose = () => {
    setOpenSideBar(false);
  };

  const { data, refetch } = useFetch<ResponseType<ICategory[]>>(
    `${API_URL.Public.category}?page=1&per_page=100`,
    {
      autoFetch: false,
    },
  );

  useEffect(() => {
    if (openSideBar) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSideBar]);

  return (
    <div className="lg:hidden">
      {/* Category Button */}
      <Button
        onClick={toggleSideBar}
        color="primary"
        className="min-h-10 lg:hidden"
      >
        <p className="text-center text-sm text-white">{t("Category")}</p>
      </Button>

      <SideBar
        label={t("Category")}
        open={openSideBar}
        onClose={onSideBarClose}
      >
        <div className="flex h-full flex-col text-neutral-950">
          {data?.data.map((item, idx) => (
            <Link
              onClick={() => setOpenSideBar(false)}
              href={`${PageUrls.Category.category}/${item.id}`}
              key={idx}
              className={cn(
                "cursor-pointer border-b border-neutral-50 px-3 py-3 text-sm transition-all hover:text-primary-700",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </SideBar>
    </div>
  );
};

export default CategorieSideBar;
