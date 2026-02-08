"use client";
import { Google } from "@/components/icons/Google";
import SignupForm from "@/components/screen/auth/signupForm";
import { Button } from "@/components/ui";
import { PageUrls } from "@/constants";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import Modal from "@/components/Modal";
import AuthWithGoogle from "@/components/screen/auth/authWithGoogle";

export default function Signup() {
  const [isSignup, setIsSignup] = useState(false);
  const t = useTranslations("signup");

  const [showModal, setShowModal] = useState(false);

  const onShowGoogleAuthModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {!isSignup ? (
        <div className="flex w-full flex-col items-start justify-center lg:justify-start">
          <h2 className="text-xl font-medium leading-6 text-neutral-950 lg:text-2xl lg:font-bold">
            {" "}
            {t("title")}
          </h2>
          <Button
            type="button"
            onClick={onShowGoogleAuthModal}
            className="mt-10 h-12 w-full bg-primary-800 py-3"
          >
            <Google color="#fff" size={24} />
            {t("emailButton")}
          </Button>

          <div className="relative mt-8 flex w-full items-center">
            <hr className="w-full bg-neutral-200" />
            <p className="absolute right-1/2 m-auto bg-white p-1 text-base font-normal text-neutral-500">
              or
            </p>
          </div>

          <Button
            type="button"
            onClick={() => setIsSignup(true)}
            className="mt-8 h-12 min-h-12 w-full border border-primary-800 bg-transparent text-sm font-normal leading-4 text-primary-800 lg:border-2 lg:font-medium xl:text-base"
          >
            {t("ContinueWithEmailButton")}
          </Button>

          <p className="mt-8 w-full text-center text-xs font-medium leading-5 text-neutral-500 lg:mt-10">
            {t("description")}
          </p>

          <div className="mt-8 flex w-full items-center justify-center lg:mt-12">
            <p className="text-xs font-medium text-neutral-500">
              {t("haveAccount")}
            </p>
            <Link
              href={PageUrls?.Auth?.signin}
              className="cursor-pointer bg-transparent p-1 text-xs font-medium text-neutral-500 underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      ) : (
        <SignupForm setIsSignup={() => setIsSignup(false)} />
      )}

      {/* Modals */}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="rounded-lg bg-white px-4 py-4 md:px-6">
          <AuthWithGoogle />
        </div>
      </Modal>
    </>
  );
}
