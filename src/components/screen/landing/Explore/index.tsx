import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";

const Explore: FC = () => {
  const t = useTranslations("Explore");
  return (
    <div className="relative  mt-8 flex w-full flex-col-reverse items-center justify-center bg-secondary-100 pb-5 md:mb-0 md:mt-[108px] lg:h-[231px] lg:flex-row lg:gap-[70px] lg:p-0 lg:px-5 xl:px-0">
      <div className="relative w-full lg:max-w-[1224px]">
        <div className="flex w-full flex-col items-center gap-3 lg:items-start lg:py-5">
          <h2 className="text-md text-secondary-600 md:text-2xl md:font-bold xl:text-2xl">
            {t("Sell")}
            <span className="ml-2 text-wrap text-neutral-950 md:text-2xl md:font-bold">
              {t("Fast")}
            </span>
          </h2>
          <p className="text-center text-xs font-normal leading-5 text-neutral-600 md:text-xl md:leading-8 lg:text-justify lg:text-base xl:text-xl">
            Lorem Ipsum is simply dumy text of the printing and <br />{" "}
            typesetting industry.Lorem Ipsum has been the indus
          </p>
          <div className="flex w-full justify-center pt-3 lg:justify-start">
            <Button
              color="primary"
              className="h-10 w-[110] rounded-lg text-sm font-normal leading-4 md:h-12 md:w-28"
            >
              {t("Explore")}
            </Button>
          </div>
        </div>

        <Image
          className="absolute top-0 z-40 hidden p-5 lg:-top-14 lg:right-0 lg:block lg:h-[290px] lg:w-[648px] lg:p-0"
          alt=""
          width={800}
          height={800}
          src={"/assets/image/explore.png"}
        />
      </div>

      <Image
        alt=""
        src={"/assets/image/desktopFrame.png"}
        width={800}
        height={800}
        className="absolute right-0 top-0 hidden h-[231px] w-[551px] lg:block"
      />
      <Image
        className="h-auto w-full object-cover lg:hidden"
        alt=""
        src={"/assets/image/mobileFrame.png"}
        width={800}
        height={800}
      />
      <Image
        className="absolute top-0 z-40 p-5 lg:-top-[50px] lg:right-0 lg:hidden lg:h-[290px] lg:w-[648px] lg:p-0"
        alt=""
        width={800}
        height={800}
        src={"/assets/image/explore.png"}
      />
    </div>
  );
};
export default Explore;
