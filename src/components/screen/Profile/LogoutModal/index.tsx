"use client";

import { CloseSquare } from "@/components/icons";
import { LogOut } from "@/components/icons/LogOut";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { PageUrls, USER_TOKEN } from "@/constants";
import { useRouter } from "@/i18n/routing";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const LogOutModal = () => {
  const t = useTranslations("UserProfile.UserProfileItem");
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const router = useRouter();

  const onLogOutClick = () => {
    Cookies.remove(USER_TOKEN);

    localStorage.clear();

    router.push(PageUrls.Home.home);

    onCloseModal();
    toast.success("Logged out successfully");
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={`flex cursor-pointer items-center gap-2 py-6 text-neutral-950 transition-colors hover:text-red-500`}
      >
        <LogOut color="currentColor" size={24} />
        {t("LogOut")}
      </div>

      <Modal isOpen={showModal} onClose={onCloseModal}>
        <div className="rounded-lg border-2 bg-white px-4 py-4 md:px-6">
          <div className="flex w-full flex-col gap-4">
            <div
              onClick={onCloseModal}
              className="cursor-pointer text-neutral-500"
            >
              <CloseSquare color="currentColor" size={22} />
            </div>

            <p className="text-center font-bold text-primary-700 md:font-bold">
              Log out of account
            </p>

            <p className="text-center text-sm text-neutral-900 md:text-base">
              Do you want to log out of your account?
            </p>

            <div className="flex items-center justify-between gap-6">
              <Button
                onClick={onLogOutClick}
                type="button"
                variant="outlined"
                color="primary"
                className="h-10 w-full rounded-lg text-primary-800 md:h-12"
              >
                Yes
              </Button>

              <Button
                onClick={onCloseModal}
                type="button"
                variant="contained"
                color="primary"
                className="h-10 w-full rounded-lg text-white md:h-12"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogOutModal;
