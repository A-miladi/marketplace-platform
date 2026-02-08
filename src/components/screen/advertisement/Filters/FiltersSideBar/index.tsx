"use client";

import { Filter } from "@/components/icons";
import { Button } from "@/components/ui";
import { SideBar } from "@/components/ui/SideBar";
import { PageUrls } from "@/constants";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import FilterForm from "./FilterForm";

const FiltersSideBar = () => {
  const pathName = usePathname();

  const t = useTranslations("Header");
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar(true);
  };

  const onSideBarClose = () => {
    setOpenSideBar(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSideBar}
        className={cn(
          "hidden items-center border-l border-neutral-300 pl-2 pr-0 text-neutral-800 md:hidden md:border-l-0 md:border-r md:pl-0 md:pr-3",
          {
            flex: pathName === PageUrls.Advertisement.advertisement,
          },
        )}
      >
        <Filter size={24} color="currentColor" />
      </button>

      {/* filter button */}

      <div className="absolute top-2 hidden h-12 items-center justify-center gap-2 rounded-xl bg-white px-2 shadow-uniq_shadow md:top-3 md:mx-0 md:flex md:h-20 md:gap-4 md:rounded-2xl md:px-5">
        <Button
          onClick={toggleSideBar}
          color="primary"
          className="hidden h-full max-h-12 w-full min-w-[103px] items-center justify-center py-3.5 text-white md:flex"
        >
          <p className="text-center text-sm">{"Filter"}</p>
          <Filter color="currentColor" size={24} className="hidden md:block" />
        </Button>
      </div>

      <SideBar className="overflow-auto " label={t("Filter")} open={openSideBar} onClose={onSideBarClose}>
        <FilterForm onClose={onSideBarClose} />
      </SideBar>
    </div>
  );
};

export default FiltersSideBar;
