"use client";
import { Google } from "@/components/icons/Google";
import Modal from "@/components/Modal";
import AuthWithGoogle from "@/components/screen/auth/authWithGoogle";
import SigninByEmail from "@/components/screen/auth/sighninByEmail";
import { Button } from "@/components/ui";
import { PageUrls } from "@/constants";
import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";
import { useState } from "react";

const Signin = () => {
  const t = useTranslations("signin");
  const [isSigninByEmail, setSignByEmail] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onShowGoogleAuthModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      {!isSigninByEmail ? (
        <div className="flex w-full flex-col items-start gap-8 lg:justify-start">
          <h2 className="text-xl font-medium leading-6 text-neutral-950 lg:text-2xl lg:font-bold">
            {t("title")}
          </h2>
          <Button
            onClick={onShowGoogleAuthModal}
            className="mt-2 h-12 min-h-12 w-full bg-primary-800 text-sm font-normal leading-4 lg:h-12 lg:text-xs lg:font-medium xl:text-base"
          >
            <Google color="#fff" size={24} />
            {t("googleButton")}
          </Button>
          <div className="relative flex w-full items-center justify-center">
            <hr className="w-full bg-neutral-200" />
            <p className="absolute transform bg-white p-1 text-center text-base font-normal text-neutral-500">
              {t("description")}
            </p>
          </div>

          <Button
            onClick={() => setSignByEmail(true)}
            className="h-12 w-full cursor-pointer border-2 border-primary-800 bg-transparent text-sm text-primary-800"
          >
            {t("signinByEmail")}
          </Button>

          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex w-full items-center justify-center">
              <p className="text-xs font-medium text-neutral-500">
                {t("haveAccount")}
              </p>

              <Link
                href={PageUrls?.Auth?.signup}
                className="cursor-pointer bg-transparent p-1 text-xs font-medium text-neutral-500 underline"
              >
                {t("signup")}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <SigninByEmail backToSignin={() => setSignByEmail(false)} />
      )}

      {/* Modals */}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="rounded-lg bg-white px-4 py-4 md:px-6">
          <AuthWithGoogle />
        </div>
      </Modal>
    </>
  );
};
export default Signin;
