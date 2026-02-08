"use client";
import { CallTwo, Copy, Message, User } from "@/components/icons";
import { ShieldTick } from "@/components/icons/ShieldTick";
import { Button } from "@/components/ui";
import { PageUrls, USER_TOKEN } from "@/constants";
import { useRouter } from "@/i18n/routing";
import { useChatStore } from "@/store/useChatStore";
import { useTranslations } from "next-intl";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useUserInfoStore } from "@/store/useUserInfo";
import { ProfileStatus, UserRole } from "@/types/user";
import Cookies from "js-cookie";

const Image = dynamic(() => import("next/image"));

interface ISellerInformationProps {
  avatar?: File | string | null;
  full_name?: string;
  company_name?: string;
  phone_number?: string | number | null;
  sellerId: number | string;
  showPhone?: boolean;
  status?: ProfileStatus;
  role: UserRole;
  is_verified?: boolean;
}

const SellerInformation = ({
  avatar,
  full_name,
  company_name,
  phone_number,
  sellerId,
  showPhone,
  status,
  role,
  is_verified,
}: ISellerInformationProps) => {
  const translate = useTranslations("SellerInformation");
  const t = useTranslations("Toast");
  const { setTempSellerInfo } = useChatStore();

  const { userInfo } = useUserInfoStore();

  const [isShowNumber, setIsShowNumber] = useState<boolean>(false);
  const router = useRouter(); // Initialize router

  const copyToClipboard = (phone: string) => {
    navigator.clipboard
      .writeText(phone)
      .then(() => {
        toast.success(t("copyTextSuccess"));
      })
      .catch((error) => {
        toast.error("Failed to copy: ", error);
      });
  };

  const [token, setToken] = useState<string | null>(null);
  const storedToken = Cookies.get(USER_TOKEN);

  useEffect(() => {
    setToken(storedToken ? storedToken : "");
  }, [storedToken]);

  const handleNavigate = () => {
    if (status === "PENDING") return;
    router.push(`${PageUrls.SellerProfile.sellerProfile}/${sellerId}`);
  };

  const displayName =
    role === "COMPANY" && company_name ? company_name : full_name;

  return (
    <div
      className={`h-full w-full rounded-2xl py-6 md:px-10 lg:sticky lg:top-2 lg:w-1/2 lg:shadow-custom_shadow ${status !== "PENDING" ? "cursor-pointer" : ""}`}
      onClick={handleNavigate}
    >
      <div className="flex w-full flex-col items-center">
        <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-[3px] border-secondary-400 bg-white text-neutral-500">
          {avatar ? (
            <Image
              src={avatar as string}
              alt=""
              width={800}
              height={800}
              className="rounded-full"
            />
          ) : (
            <User className="h-6 w-6 md:h-8 md:w-8" />
          )}
        </div>
        <div className="mt-3 flex items-center gap-1">
          <p>{displayName}</p>
          {is_verified && (
            <ShieldTick
              size={16}
              color="currentColor"
              className="text-primary-700"
            />
          )}
        </div>
      </div>
      {showPhone && (
        <Button
          onMouseEnter={(e) => {
            e.stopPropagation(); // Prevent navigation when hovering over button
            setIsShowNumber(true);
          }}
          className="mt-5 h-14 w-full border-2 border-primary-700 bg-transparent text-base font-medium text-primary-700 hover:border-primary-800 lg:mt-10"
        >
          <CallTwo size={24} />
          {translate("ContactInformation")}
        </Button>
      )}
      {showPhone && isShowNumber && (
        <div
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsShowNumber(false);
          }}
          className="mt-4 flex w-full justify-between gap-2"
        >
          <div className="flex h-14 w-full items-center justify-between rounded-md bg-neutral-50 px-3">
            <p className="text-base font-medium">Phone number</p>
            <p className="text-base font-medium">{showPhone && phone_number}</p>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking on the copy button
              copyToClipboard(
                showPhone && phone_number ? String(phone_number) : "",
              );
            }}
            className="h-14 w-14 rounded-md bg-neutral-50"
          >
            <Copy size={24} />
          </Button>
        </div>
      )}
      {sellerId !== userInfo.id && (
        <Button
          disabled={!token}
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking message button
            setTempSellerInfo({
              id: Number(sellerId),
              full_name: full_name || "",
              avatar: avatar as string | null,
            });
            router.push(`${PageUrls.Message.message}?sellerId=${sellerId}`);
          }}
          className="mt-4 h-14 w-full bg-primary-700 text-base font-medium text-white lg:mt-6"
        >
          <Message color="currentColor" size={24} />
          {translate("message")}
        </Button>
      )}
    </div>
  );
};

export default SellerInformation;
