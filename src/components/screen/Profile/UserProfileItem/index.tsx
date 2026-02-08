"use client";
import { Profile, Save } from "@/components/icons";
import { Advertisement } from "@/components/icons/Advertisement";
import { DeleteAccount } from "@/components/icons/DeleteAccount";
import { Reset } from "@/components/icons/Reset";
import { useUserInfoStore } from "@/store/useUserInfo";
import { TProfileContent } from "@/types/profile";
import { FC } from "react";
import { useTranslations } from "use-intl";
import LogOutModal from "../LogoutModal";

interface IUserItemProps {
  setCurrentContent: (value: TProfileContent) => void;
  currentContent: TProfileContent;
}

interface MenuItem {
  key: TProfileContent;
  icon: FC<{ color?: string; size?: number }>;
  label: string;
  disabled?: boolean;
  className?: string;
}

const UserProfileItem: FC<IUserItemProps> = ({
  setCurrentContent,
  currentContent,
}) => {
  const t = useTranslations("UserProfile.UserProfileItem");
  const { userInfo } = useUserInfoStore();

  const menuItems: MenuItem[] = [
    { key: "MY_PROFILE", icon: Profile, label: t("MyProfile") },
    { key: "MY_ADS", icon: Advertisement, label: t("MyAds") },
    { key: "MY_FAVORITE_ADS", icon: Save, label: t("MyFavorites") },
    { key: "RESET_PASS", icon: Reset, label: t("ResetPass") },
    {
      key: "DELETE_ACCOUNT",
      icon: DeleteAccount,
      label: t("DeleteAccount"),
      disabled: !userInfo?.profile?.email_verified_at,
      className: !userInfo?.profile?.email_verified_at
        ? "text-neutral-300"
        : "",
    },
  ];

  return (
    <div className="mt-6 w-full">
      {menuItems.map(
        ({ key, icon: Icon, label, disabled, className }, index) => {
          const isActive = currentContent === key;
          const itemClassName = `
          flex items-center gap-2 border-b py-6
          ${index === 0 ? "border-t" : ""}
          ${isActive ? "text-primary-700" : "text-neutral-950"}
          ${disabled ? "text-neutral-300" : "cursor-pointer"}
          ${className || ""}
        `;

          return (
            <div
              key={key}
              onClick={() => !disabled && setCurrentContent(key)}
              className={itemClassName}
            >
              <Icon color={disabled ? "#B0B0B0" : "currentColor"} size={24} />
              <p>{label}</p>
            </div>
          );
        },
      )}

      <LogOutModal />
    </div>
  );
};

export default UserProfileItem;
