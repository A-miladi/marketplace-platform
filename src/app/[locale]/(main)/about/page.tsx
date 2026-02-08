import { useTranslations } from "next-intl";
// import aboutPageImage from ;
import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";
import PlatformInfo from "./components/PlatformInfo";

const AboutPage = () => {
  const t = useTranslations("AboutPage");

  return (
    <div className="m-auto mt-12 flex w-full max-w-[1224px] flex-col-reverse items-center justify-center px-5 md:mt-[98] lg:mt-[104px] lg:flex-row xl:px-0">
      <div className="absolute top-20 hidden h-8 w-full justify-center bg-primary-50 px-5 md:flex md:h-14 lg:flex">
        <SearchBar />
      </div>
      <div className="mt-6 flex w-full flex-col items-center lg:mt-0 lg:flex-1 lg:items-start">
        <h2 className="text-base font-medium text-primary-600 lg:text-[24px] lg:font-bold xl:text-[32px]">
          {t("title")}
        </h2>
        <div className="mt-4 flex w-full flex-col gap-3 lg:mt-5 lg:w-[558px] lg:gap-4">
          <p className="text-justify font-normal text-neutral-600 md:text-sm xl:text-lg">
            {t("Introduction")}
          </p>
          <p className="text-justify font-normal text-neutral-600 md:text-sm xl:text-lg">
            {t("Categories")}
          </p>
          <p className="text-justify font-normal text-neutral-600 md:text-sm xl:text-lg">
            {t("Team")}
          </p>
          <p className="text-justify font-normal text-neutral-600 md:text-sm xl:text-lg">
            {t("Mission")}
          </p>
        </div>
        <PlatformInfo />
      </div>

      <div className="flex h-[256px] w-[272px] items-center lg:h-[517px] lg:w-[490px] xl:w-[550px]">
        <Image
          src="/assets/image/aboutPage.png"
          alt="about us page"
          width={800}
          height={800}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AboutPage;
