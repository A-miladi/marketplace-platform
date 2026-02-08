import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";

const AboutUs: FC = () => {
  const t = useTranslations("AboutUs");
  return (
    <div className="m-auto flex w-full max-w-[1224px] flex-col items-center justify-between gap-5 px-5 md:my-[108px] md:gap-28 lg:flex-row xl:px-0">
      <div className="relative flex w-full flex-col items-center gap-5">
        <div className="flex w-full items-center justify-center gap-2 lg:hidden">
          <hr className="absolute w-[92%] rounded-sm border-2 border-primary-700 bg-primary-700" />
          <h2 className="relative z-10 bg-white px-2 text-xl font-medium text-neutral-950">
            {t("About")}
            <span className="pl-0.5 text-primary-700">{t("Us")}</span>
          </h2>
        </div>

        <Image
          alt="AboutUs"
          src="/assets/image/about-us.png"
          width={650}
          height={519}
          className="w-full lg:h-[519px] lg:w-[650px]"
        />
      </div>

      <div className="flex w-full flex-col items-start justify-center gap-4">
        <div className="hidden w-full items-center justify-between gap-2 lg:flex">
          <h2 className="text-3xl font-bold text-neutral-950">
            {t("About")}
            <span className="text-primary-700 pl-1">{t("Us")}</span>
          </h2>
          <hr className="h-1 rounded-sm bg-primary-700 lg:w-[64%] xl:w-[72%]" />
        </div>
        <p className="text-justify text-xs font-normal leading-5 text-neutral-600 md:text-lg lg:font-normal lg:leading-8">
          Lorem Ipsum is simply dumy text of the printing and typesetting
          industry.Lorem Ipsum has been the indus standard dummy text ever since
          the 1500s , when an unknown printer took a galley of type and
          scrambled typesetting industry.Lorem Ipsum has been the indus standard
          dummy text ever since the 1500s , when an unknown printer took a
          galley of type and scrambled
        </p>
        <p className="text-justify text-xs font-normal leading-5 text-neutral-600 md:text-lg lg:font-normal lg:leading-8">
          Lorem Ipsum is simply dumy text of the printing and typesetting
          industry.Lorem Ipsum has been the indus standard dummy text ever since
          the 1500s , when an
        </p>
        <div className="flex w-full justify-center lg:justify-start">
          <Button
            color="primary"
            className="min-h-10 w-[110] rounded-lg text-sm font-normal leading-4 md:h-12 md:w-28"
          >
            {t("LearnMore")}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
