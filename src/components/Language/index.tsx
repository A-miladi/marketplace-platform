"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/utils";
import { useLocale } from "next-intl";
import { useState } from "react";
import { ArrowDown, Language as LanguageIcon } from "../icons";
import DropDown from "../ui/DropDown";

const Language = () => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const locale = useLocale();

  const router = useRouter();

  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentLang, setCurrentLang] = useState<string>("en");

  const handleLangChange = (locale: string) => {
    setCurrentLang(locale);
    router.replace(`/${pathname}`, { locale: locale });
  };

  const langOptions = [
    { value: "en", label: "English" },
    { value: "de", label: "Deutsch" },
  ];

  return (
    <div className="">
      <DropDown
        open={openDropDown}
        setOpen={setOpenDropDown}
        icon={
          <ArrowDown
            size={20}
            color="currentColor"
            className={cn("block rotate-0 transition-all", {
              "rotate-180": openDropDown,
            })}
          />
        }
        label={
          <div className="flex items-center gap-1 text-neutral-800">
            <LanguageIcon color="currentColor" size={24} />
            <p className="text-sm font-medium uppercase text-neutral-800 md:text-base">
              {locale}
            </p>
          </div>
        }
      >
        <div className="flex h-full flex-col text-neutral-950">
          {langOptions.map((item, idx) => (
            <p
              onClick={() => handleLangChange(item.value)}
              key={idx}
              className={cn(
                "cursor-pointer border-b border-neutral-50 py-2 pl-3 text-sm",
                {
                  "text-primary-700": locale === item.value,
                },
              )}
            >
              {item.label}
            </p>
          ))}
        </div>
      </DropDown>
    </div>
  );
};

export default Language;
