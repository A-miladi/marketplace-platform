"use client";

import { CategoryIcon, DocumentText, User } from "@/components/icons";
import BurgerMenu from "@/components/icons/BurgerMenu";
import { LogOut } from "@/components/icons/LogOut";
import { Button } from "@/components/ui";
import { PageUrls, USER_TOKEN } from "@/constants";
import { useOutSideClick } from "@/hooks";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useUserInfoStore } from "@/store/useUserInfo";
import { cn } from "@/utils";
import { FC, useRef, useState } from "react";
import toast from "react-hot-toast";

import Cookies from "js-cookie";

const SIDEBAR_ITEMS = [
  {
    title: "Users",
    href: PageUrls.AdminRoutes.dashboard,
    icon: <User color="currentColor" size={18} />,
  },
  {
    title: "Advertisements",
    href: PageUrls.AdminRoutes.advertisement,
    icon: <DocumentText color="currentColor" size={18} />,
  },
  {
    title: "Categories",
    href: PageUrls.AdminRoutes.categories,
    icon: <CategoryIcon color="currentColor" size={18} />,
  },
];

const AdminSideBar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { userInfo } = useUserInfoStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useOutSideClick(sidebarRef, () => {
    setIsOpen(false);
  });

  const router = useRouter();

  const onLogOutClick = () => {
    Cookies.remove(USER_TOKEN);

    localStorage.clear();

    router.push(PageUrls.Home.home);

    toast.success("Logged out successfully");
  };

  return (
    <div className="relative flex w-full md:w-1/5">
      <button
        className="rounded-lg bg-primary-700 p-2 text-white md:hidden"
        onClick={toggleSidebar}
      >
        <BurgerMenu color="#fff" size={20} />
      </button>

      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform md:static md:h-full md:w-full ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-30 h-screen w-1/2 border-r border-primary-600 bg-white transition-transform duration-300 ease-in-out md:relative md:w-1/5 md:translate-x-0 md:rounded-xl md:border`}
      >
        <div className="flex h-full  flex-col justify-between">
          <div className="flex h-full w-full flex-col gap-3 p-2 pt-2 max-md:border-l md:rounded-xl">
            <div className="flex items-center gap-2 border-b border-neutral-200 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-white text-neutral-800">
                <User color="currentColor" size={20} />
              </div>
              <div className="flex h-full w-full flex-col gap-0.5">
                <p className="text-xs font-semibold text-neutral-800">
                  {userInfo?.role}
                </p>
                <p className="line-clamp-2 max-w-full flex-shrink truncate break-words text-xs text-neutral-500">
                  {userInfo?.email}
                </p>
              </div>
            </div>

            {SIDEBAR_ITEMS.map((item) => (
              <Link
                className={cn(
                  "flex h-12 items-center gap-1 rounded-md border pl-1 text-sm transition-all duration-150 hover:bg-primary-700 hover:text-white md:text-sm",
                  {
                    "bg-primary-700 text-white": item.href === pathname,
                  },
                )}
                href={item.href}
                key={item.href}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>

          <Button
            onClick={onLogOutClick}
            variant="outlined"
            className="mx-2 mb-3 h-12 border-red-500 text-red-500 transition-colors duration-200 hover:bg-red-50"
          >
            <LogOut color="currentColor" size={18} />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
