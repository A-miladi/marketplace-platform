import { useTranslations } from "next-intl";
import { FC, Suspense } from "react";

import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui";
const Image = dynamic(() => import("next/image"));

const Hero: FC = () => {
  const t = useTranslations("Hero");

  return (
    <div className="flex items-center justify-center bg-primary-50">
      <div className="relative hidden w-full max-w-[1224px] items-center justify-end pt-5 md:flex">
        <Suspense fallback={<Spinner />}>
          <Image
            alt=""
            priority={true}
            src={"/assets/image/hero.png"}
            width={12224}
            height={1224}
            className="hidden object-cover lg:block"
          />
        </Suspense>

        <div className="absolute left-[7%] top-[25%] m-auto hidden flex-col gap-2 lg:flex">
          <h1 className="font-light text-state-100 lg:text-[40px] xl:text-[50px]">
            {t("BuildingTheFutureWith")} <br />
            <span className="font-bold tracking-wider text-secondary-700">
              {t("IndustrialEquipment")}
            </span>
          </h1>
          <p className="max-w-[560px] font-light lg:text-[20px] xl:text-[25px] 2xl:text-[25px]">
            {t("Provide")} <br />
            {t("Help")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
