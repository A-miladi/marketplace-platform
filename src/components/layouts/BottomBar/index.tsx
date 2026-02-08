"use client";

import { Home, Message, Note, Note2, Profile } from "@/components/icons";
import { PageUrls, USER_TOKEN } from "@/constants";
import { Link, usePathname } from "@/i18n/routing";
import { useUserInfoStore } from "@/store/useUserInfo";
import { cn } from "@/utils";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const BottomBar = () => {
  const pathName = usePathname();

  const [token, setToken] = useState<string | null>(null);
  const storedToken = Cookies.get(USER_TOKEN);

  useEffect(() => {
    setToken(storedToken ? storedToken : "");
  }, [storedToken]);

  const { userInfo } = useUserInfoStore();

  const isAdmin = userInfo.role === "ADMIN";

  const LINKS = [
    {
      link: PageUrls.Home.home,
      label: "Home",
      icon: <Home size={24} color="currentColor" />,
    },

    {
      link: PageUrls.Advertisement.advertisement,
      label: "Advertisement",
      icon: <Note2 size={24} color="currentColor" />,
    },

    {
      link: token ? PageUrls.Sell.add : PageUrls.Auth.signup,
      label: "Sell on UA",
      icon: <Note size={24} color="currentColor" />,
    },

    {
      link: token ? PageUrls.Message.message : "",
      label: "Message",
      icon: <Message size={24} color={token ? "currentColor" : "#B0B0B0"} />,
    },
    {
      link: token
        ? isAdmin
          ? PageUrls.AdminRoutes.dashboard
          : PageUrls.Profile.profile
        : PageUrls.Auth.signup,
      label: token ? (isAdmin ? "Dashboard" : "Profile") : "Login / Sign up",
      icon: <Profile size={24} color="currentColor" />,
    },
  ];

  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-between bg-white px-5 py-3 shadow-bottom_bar lg:hidden">
      {LINKS.map((item, idx) => (
        <Link
          href={item.link}
          key={idx}
          className={cn("flex flex-col items-center gap-2 text-neutral-950", {
            "text-primary-800": pathName === item.link,
          })}
        >
          {item.icon}
          <p
            className={cn("text-[10px]", {
              "text-neutral-300":
                item.label === "Message" && (!token || isAdmin),
            })}
          >
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
};
