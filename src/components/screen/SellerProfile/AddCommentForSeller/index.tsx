"use client";
import { Add } from "@/components/icons/Add";
import { Comment } from "@/components/icons/Comment";
import { Button } from "@/components/ui";
import { PageUrls, USER_TOKEN } from "@/constants";
import { useRouter } from "@/i18n/routing";
import { useUserInfoStore } from "@/store/useUserInfo";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { FC } from "react";
import toast from "react-hot-toast";

interface IModalProps {
  showModal: () => void;
  sellerId: string;
}

const AddCommentForSeller: FC<IModalProps> = ({ showModal, sellerId }) => {
  const t = useTranslations("SellerProfile");
  const { userInfo } = useUserInfoStore();
  const router = useRouter();
  const token = Cookies.get(USER_TOKEN);

  const handleClick = () => {
    if (!token) {
      router.push(PageUrls.Auth.signin);
      toast(t("LoginRequired"));
      return;
    }

    if (userInfo.id === Number(sellerId)) {
      return;
    }

    showModal();
  };

  return (
    <div className="relative w-full rounded-2xl bg-white p-4 shadow-custom_shadow lg:p-8">
      <div className="hidden w-full items-center justify-center gap-2 lg:flex">
        <Comment size={20} color="#000" />
        <p className="text-xs font-normal text-neutral-950 lg:text-sm lg:font-medium xl:text-lg">
          {t("AddCommentTitle")}
        </p>
      </div>
      <Button
        disabled={userInfo.id === Number(sellerId)}
        onClick={handleClick}
        className="h-12 w-full bg-primary-800 lg:mt-8"
      >
        {t("AddCommaButton")}
        <Add color="currentColor" size={24} />
      </Button>
    </div>
  );
};

export default AddCommentForSeller;
