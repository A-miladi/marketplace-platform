import {
  Call,
  FaceBook,
  Instagram,
  Location,
  Sms,
  Twitter,
  Youtube,
} from "@/components/icons";

import { useTranslations } from "next-intl";

import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"));

export const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <div className="relative hidden w-full lg:block">
      <div className="relative mt-[108px] flex items-center justify-center bg-primary-950 px-5 xl:px-0">
        <div className="my-12 grid max-w-[1224px] grid-cols-12 justify-between">
          <div className="col-span-4 flex flex-col gap-10">
            <div className="h-16 w-52 rounded-xl bg-white"></div>

            <div className="z-20 flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <p className="font-medium text-white">{t("About")}</p>
                <p className="font-medium text-white">
                  Lorem Ipsum is simply dumy text of the printing and
                  typesetting industry.Lorem Ipsum has been the indus standard
                  dummy text ever since the 1500s , when an unknown printer took
                  a galley of type and scrambled
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-medium text-white">{t("Contact")}</p>
                <div className="flex items-center gap-3 text-white">
                  <FaceBook color="currentColor" size={32} />
                  <Twitter color="currentColor" size={32} />
                  <Instagram color="currentColor" size={32} />
                  <Youtube color="currentColor" size={32} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 xl:col-span-2" />
          <div className="z-20 col-span-7 flex max-w-[639px] flex-col gap-10 xl:col-span-6">
            <div className="grid h-16 grid-cols-5 items-center gap-3 rounded-xl pl-3 pr-[17px] shadow-uniq_shadow md:grid-cols-9"></div>

            <div className="grid grid-cols-7 text-white">
              <div className="col-span-2 flex flex-col gap-3">
                <p className="font-medium">{t("Company")}</p>
                <p className="text-sm text-neutral-200">{t("About")}</p>
                <p className="text-sm text-neutral-200">{t("Blog")}</p>
                <p className="text-sm text-neutral-200">{t("Testimonials")}</p>
                <p className="text-sm text-neutral-200">{t("Media")}</p>
              </div>

              <div className="col-span-2 flex flex-col gap-3">
                <p className="font-medium">{t("Sell")}</p>
                <p className="text-sm text-neutral-200">{t("uniq")}</p>
                <p className="text-sm text-neutral-200">{t("Seller")}</p>
                <p className="text-sm text-neutral-200">{t("SellerBlog")}</p>
              </div>

              <div className="col-span-3 flex flex-col gap-3">
                <p className="font-medium">{t("Contact")}</p>
                <div className="flex gap-0.5 text-neutral-200 lg:items-center">
                  <Location size={20} color="currentColor" />
                  <p className="text-sm text-neutral-200">
                    123 Main Street, Berlin,Germany
                  </p>
                </div>
                <div className="flex gap-0.5 text-neutral-200 lg:items-center">
                  <Call size={20} color="currentColor" />
                  <p className="text-sm text-neutral-200">+1 (333) 123-4567</p>
                </div>

                <div className="flex gap-0.5 text-neutral-200 lg:items-center">
                  <Sms size={20} color="currentColor" />
                  <p className="text-sm text-neutral-200">
                    UniqAlpha@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20 h-14 w-full">
        <div className="flex h-full items-center justify-center gap-[9px] bg-primary-950">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22Z"
              stroke="#CBCBCB"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.88 15C14.17 15.62 13.25 16 12.24 16C10.03 16 8.23999 14.21 8.23999 12C8.23999 9.79 10.03 8 12.24 8C13.25 8 14.17 8.38 14.88 9"
              stroke="#CBCBCB"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-xs font-medium text-[#CBCBCB]">2025 Uniq Alpha </p>
        </div>
      </div>

      <Image
        priority={true}
        src={"/assets/image/footer-shadow.png"}
        fill
        className="absolute top-10 z-0 h-[361px] w-full"
        alt="Uniq Alpha"
      />
    </div>
  );
};
