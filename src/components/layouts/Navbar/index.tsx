"use client";

import { Message, Profile, Save } from "@/components/icons";
import Language from "@/components/Language";
import NavNotification from "@/components/Notification";
import FiltersSideBar from "@/components/screen/advertisement/Filters/FiltersSideBar";
import CategorieDropDown from "@/components/screen/landing/Categories/CategoriesDropDown";
import { SearchBar } from "@/components/SearchBar";
import { Button, Logo } from "@/components/ui";
import { PageUrls, USER_TOKEN } from "@/constants";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useUserInfoStore } from "@/store/useUserInfo";
import { cn } from "@/utils";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const pathName = usePathname();

  const [token, setToken] = useState<string | null>(null);
  const storedToken = Cookies.get(USER_TOKEN);

  const { userInfo } = useUserInfoStore();

  const isAdmin = userInfo.role === "ADMIN";

  useEffect(() => {
    setToken(storedToken ? storedToken : "");
  }, [storedToken]);

  const router = useRouter();

  const t = useTranslations("Header");

  const NAV_LINKS = [
    {
      component: (
        <Link
          href={PageUrls.Home.home}
          className={cn(
            "text-xs font-normal text-neutral-950 lg:text-sm xl:text-base",
            {
              "text-primary-700": pathName === PageUrls.Home.home,
            },
          )}
        >
          {t("Home")}
        </Link>
      ),
    },

    {
      component: <CategorieDropDown />,
    },

    {
      component: (
        <Link
          href={PageUrls.Advertisement.advertisement}
          className={cn(
            "text-xs font-normal text-neutral-950 lg:text-sm xl:text-base",
            {
              "text-primary-700":
                pathName === PageUrls.Advertisement.advertisement,
            },
          )}
        >
          {t("Advertisement")}
        </Link>
      ),
    },

    {
      component: (
        <Link
          href={token ? PageUrls.Sell.add : PageUrls.Auth.signup}
          className={cn(
            "text-xs font-normal text-neutral-950 lg:text-sm xl:text-base",
            {
              "text-primary-700":
                pathName === PageUrls.Sell.add ||
                pathName === PageUrls.Sell.edit,
            },
          )}
        >
          {t("SellOnUniqAlpha")}
        </Link>
      ),
    },

    {
      component: (
        <Link
          href={PageUrls.Favorites.favorites}
          className={cn(
            "text-xs font-normal text-neutral-950 lg:text-sm xl:text-base",
            {
              "text-primary-700": pathName === PageUrls.Favorites.favorites,
              hidden: !token || isAdmin,
            },
          )}
        >
          {t("Favorites")}
        </Link>
      ),
    },
  ];

  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-primary-50">
      <div className="flex min-h-14 w-full justify-between bg-primary-50 px-5 py-3 md:max-w-[1224px] md:items-center md:py-5 lg:flex-row-reverse xl:px-0">
        <div className="flex flex-row items-center gap-2 lg:flex-row-reverse xl:gap-3">
          {/* login button */}
          <Button
            startIcon={
              token && !isAdmin && <Profile color="currentColor" size={24} />
            }
            onClick={() =>
              router.push(
                token
                  ? isAdmin
                    ? PageUrls.AdminRoutes.dashboard
                    : PageUrls.Profile.profile
                  : `${PageUrls.Auth.signup}?"return"=${pathName}`,
              )
            }
            color="primary"
            className="hidden h-12 min-w-28 lg:block"
          >
            {token ? (
              isAdmin ? (
                <p className="text-center text-xs xl:text-sm">Dashboard</p>
              ) : (
                <p className="text-center text-xs xl:text-sm">{t("Account")}</p>
              )
            ) : (
              <p className="text-center text-sm text-white">{t("login")}</p>
            )}
          </Button>

          <div className="hidden border-r border-neutral-300 lg:flex lg:pr-3">
            <Language />
          </div>
          {/* <CategorieSideBar /> */}

          {token && !isAdmin && (
            <Link
              href={PageUrls.Favorites.favorites}
              className="flex items-center pl-2 text-neutral-800 lg:hidden lg:pl-0"
            >
              <Save size={24} color="currentColor" />
            </Link>
          )}
          {token && !isAdmin && <NavNotification />}

          <button
            onClick={() =>
              router.push(token && !isAdmin ? PageUrls.Message.message : "")
            }
            className={cn(
              "hidden items-center border-r border-neutral-300 pr-3 text-neutral-800 lg:flex",
              {
                "text-primary-700": pathName === PageUrls.Message.message,
                "cursor-text text-neutral-300": !token || isAdmin,
              },
            )}
          >
            <Message size={24} color="currentColor" />
          </button>

          <div className="block md:hidden">
            <FiltersSideBar />
          </div>

          <div className="border-l border-neutral-300 pl-3 lg:hidden lg:pr-3">
            <Language />
          </div>
        </div>

        <div className="flex w-auto items-center gap-2 xl:gap-12">
          <Logo />

          <div className="hidden h-6 items-center gap-2 lg:flex lg:gap-5 xl:gap-10">
            {NAV_LINKS.map((item, idx) => (
              <div key={idx} className="flex items-center xl:w-auto">
                {item.component}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative flex h-8 w-full justify-center bg-primary-50 px-5 md:hidden md:h-14">
        <SearchBar />
      </div>
    </div>
  );
};
