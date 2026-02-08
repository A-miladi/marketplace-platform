import { Advertisement } from "@/components/icons/Advertisement";
import { StatusUp } from "@/components/icons/StatusUp";
import { TickSquare } from "@/components/icons/TickSquare";
import { useTranslations } from "next-intl";
import React from "react";

function PlatformInfo() {
     const t = useTranslations("AboutPage");
  return (
    <div className="mt-6 lg:mt-8 flex lg:flex-row flex-col w-2/3 lg:w-full items-center justify-between rounded-[20px] bg-white shadow-custom_shadow p-3 gap-4" >
      <div className="w-full lg:w-auto flex items-center justify-between gap-4 rounded-2xl bg-primary-50 px-4 py-3">

        <div className="flex flex-1 flex-col items-center gap-2 border-r-2 pr-3 xl:pr-4">
          <div className="w-3/4 flex lg:w-[80px] xl:w-[91px] justify-center rounded-md bg-primary-700 py-1">
            <p className="text-sm font-medium text-white">1250</p>
          </div>
          <p className="font-normal text-xs xl:text-sm">{t("NumberOfAds")}</p>
        </div>
        <Advertisement color="#007BFF" size={40} className="w-8 lg:w-10"  />
      </div>

      <div className=" w-full lg:w-auto flex items-center justify-between gap-4 rounded-2xl bg-primary-50 px-4 py-3">
        <div className="flex  flex-1  flex-col items-center gap-2 border-r-2 bg-slate-50 lg:pr-3 xl:pr-4">
          <div className="w-3/4 flex lg:w-[80px] xl:w-[91px] justify-center rounded-md bg-primary-700 py-1">
            <p className="text-sm font-medium text-white">1250</p>
          </div>
          <p className="font-normal text-xs xl:text-sm">{t("Brands")}</p>
        </div>
        <TickSquare color="#007BFF" size={40} className="w-8 lg:w-10"  />
      </div>

      <div className=" w-full lg:w-auto flex items-center justify-between gap-4 rounded-2xl bg-primary-50 px-4 py-3">
        <div className="flex  flex-1  flex-col items-center gap-2 border-r-2  lg:pr-3 xl:pr-4">
          <div className="w-3/4 flex lg:w-[80px] xl:w-[91px] justify-center rounded-md bg-primary-700 py-1">
            <p className="text-sm font-medium text-white">1250</p>
          </div>
          <p className="font-normal text-xs xl:text-sm">{t("ClosedDeals")}</p>
        </div>
        <StatusUp color="#007BFF" size={40} className="w-8 lg:w-10" />
      </div>
    </div>
  );
}

export default PlatformInfo;
