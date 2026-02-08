"use client";
import { Refresh } from "@/components/icons";
import { CLoseCircle } from "@/components/icons/CLoseCircle";
import { Tick } from "@/components/icons/Tick";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui";
import Checkbox from "@/components/ui/CheckBox";
import { API_URL } from "@/constants/api";
import { usePost, useTimer } from "@/hooks";
import { ResponseType } from "@/types";
import { IVerifyDeleteAccount } from "@/types/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "use-intl";

import TextInput from "@/components/ui/TextInput";
import { PageUrls, USER_TOKEN } from "@/constants";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function DeleteAccount() {
  const t = useTranslations("UserProfile.DeleteAccount");
  const [isChecked, setIsChecked] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const { execute, loading } = usePost<ResponseType<object>, null>(
    API_URL.User.DeleteAccount.request,
    {
      onSuccess: (res) => {
        toast.success(res.message);
        setOpenModal(true);
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const requestDeleteAccount = () => {
    execute(null);
  };

  return (
    <div className="flex w-full flex-col">
      <h4 className="border-b-2 pb-2 font-normal text-neutral-950 lg:text-xl">
        {t("DeleteAccount")}
      </h4>
      <h4 className="mt-4 text-base font-medium text-neutral-950 lg:mt-6">
        {t("PermanentlyDeleteAccount")}
      </h4>
      <p className="mt-3 text-justify text-sm font-normal text-neutral-600 lg:mt-[14px]">
        {t("description")}
      </p>

      <div className="mt-4 flex w-full flex-col gap-3 lg:mt-6 lg:gap-5">
        <h4 className="text-base font-medium text-neutral-950">
          {t("deletingYourAccountMean")}
        </h4>
        <div className="flex w-full items-start gap-2">
          <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-700"></div>
          <div className="rounded">
            <p className="text-justify text-sm font-normal text-neutral-600">
              {t("PermanentDataDeletion")}
            </p>
          </div>
        </div>

        <div className="flex w-full items-start gap-2">
          <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-700"></div>
          <div className="rounded">
            <p className="text-justify text-sm font-normal text-neutral-600">
              {t("LossOfAccess")}
            </p>
          </div>
        </div>

        <div className="flex w-full items-start gap-2">
          <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-700"></div>
          <div className="rounded">
            <p className="text-justify text-sm font-normal text-neutral-600">
              {t("IrreversibleAction")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col gap-3 lg:mt-6 lg:gap-5">
        <h4 className="text-base font-medium text-neutral-950">
          {t("ConsiderBeforeDeleting")}
        </h4>
        <div className="flex w-full items-start gap-2">
          <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-700"></div>
          <div className="rounded">
            <p className="text-justify text-sm font-normal text-neutral-600">
              {t("SupportHelp")}
              <br className="hidden xl:flex" />
              <span className="text-primary-700">{t("ContactSupport")}</span>
            </p>
          </div>
        </div>

        <div className="flex w-full items-start gap-2">
          <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-700"></div>
          <div className="rounded">
            <p className="text-justify text-sm font-normal text-neutral-600">
              {t("TemporaryDeactivation")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col gap-3 lg:mt-6 lg:gap-5">
        <h4 className="text-base font-medium text-neutral-950">
          {t("FinalConfirmation")}
        </h4>

        <p className="text-justify text-sm font-normal text-neutral-600">
          {t("ConfirmDeletionMessage")}
        </p>
      </div>

      <div className="mt-3 flex w-full items-center gap-3 lg:mt-5">
        <Checkbox
          icon={<Tick color="#fff" size={14} />}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="h-5 w-5 rounded-xl"
        />
        <p className="w-full text-start text-xs font-medium leading-[14.52px] text-neutral-500 lg:text-sm">
          {t("ConfirmDeleteCheckbox")}
        </p>
      </div>

      <div className="mt-8 flex w-full justify-end lg:mt-10">
        <Button
          loading={loading}
          onClick={requestDeleteAccount}
          disabled={!isChecked}
          className="h-12 w-full bg-primary-800 px-6 lg:w-auto"
        >
          {t("DeleteAccountButton")}
        </Button>
      </div>

      {/* Modals */}

      <Modal isOpen={openModal} onClose={onCloseModal}>
        <div className="rounded-lg border-2 bg-white px-4 py-4 md:px-6">
          <VerifyDeleteAccount
            onResendCode={requestDeleteAccount}
            onClose={onCloseModal}
          />
        </div>
      </Modal>
    </div>
  );
}

export default DeleteAccount;

interface VerifyProps {
  onResendCode: () => void;
  onClose: () => void;
}

const VerifyDeleteAccount = ({ onResendCode, onClose }: VerifyProps) => {
  const [code, setCode] = useState("");

  const router = useRouter();

  const { execute, loading } = usePost<
    ResponseType<object>,
    IVerifyDeleteAccount
  >(API_URL.User.DeleteAccount.delete, {
    onSuccess: (res) => {
      toast.success(res.message);

      Cookies.remove(USER_TOKEN);

      router.push(PageUrls.Home.home);
      onClose();
    },

    onError: (errorMessage: string) => {
      toast.error(errorMessage);
    },
  });

  const t = useTranslations("otp");

  const { seconds, timerEnded, restart } = useTimer({ initialSeconds: 120 });

  const onResendOtp = () => {
    restart();
    onResendCode();
  };

  const onVerificationClick = () => {
    execute({ code: code });
  };

  const handleChange = (value: string) => {
    setCode(value);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div onClick={onClose} className="cursor-pointer text-neutral-500">
        <CLoseCircle color="currentColor" size={22} />
      </div>

      <p className="text-center font-bold text-primary-700 md:font-bold">
        Verify your phone number with the code sent
      </p>

      <div className="flex items-center justify-center">
        <TextInput
          onChange={(e) => handleChange(e.target.value)}
          disabled={loading}
          parent=" w-full"
          placeholder={t("enterYourCode")}
          className="h-12 w-full border border-neutral-400 bg-white"
        />
      </div>

      <div className="w-full">
        <Button
          type="button"
          className={`flex items-center justify-center gap-2 bg-transparent p-0 text-sm font-normal text-primary-800 ${timerEnded && "bg-transparent text-primary-700"}`}
        >
          <p onChange={() => {}} className={`${timerEnded && "hidden"}`}>
            {t("resendCode")}({Math.floor(seconds / 60)}:
            {seconds % 60 < 10 && <span>0</span>}
            {seconds % 60})
          </p>
          <div
            onClick={onResendOtp}
            className={`cursor-pointer items-center gap-2 ${timerEnded ? "flex" : "hidden"}`}
          >
            <Refresh color="currentColor" />

            <p>{t("resendCode")}</p>
          </div>
        </Button>
      </div>

      <Button
        loading={loading}
        type="button"
        onClick={onVerificationClick}
        variant="contained"
        color="primary"
        className="h-10 rounded-lg text-white md:h-12"
      >
        Verify Now
      </Button>
    </div>
  );
};
