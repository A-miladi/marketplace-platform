"use client";

import { CloseSquare, Refresh } from "@/components/icons";
import Modal from "@/components/Modal";
import OtpInput from "@/components/OtpInput";
import { Button } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { API_URL } from "@/constants/api";
import { usePost, useTimer } from "@/hooks";
import { useUserInfoStore } from "@/store/useUserInfo";
import { ResponseType } from "@/types";
import { SendVerification, User, VerificationRequest } from "@/types/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "use-intl";

interface EmailInputProps {
  emailVerified?: boolean;
  email: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  emailVerified,
  email: initialEmail,
}) => {
  const t = useTranslations("UserProfile.MyProfile.EmailVerification");

  const [openModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState(initialEmail);

  const { execute } = usePost<ResponseType<object>, SendVerification>(
    API_URL.User.SendVerification,
    {
      onSuccess: (res) => {
        toast.success(res.message);
        setOpenModal(true);
      },
      onError: (errorMessage: string) => {
        toast.error(errorMessage);
      },
    },
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleClickVerify = () => {
    execute({ type: "EMAIL", value: email });
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="w-full">
        <TextInput
          label={t("email")}
          labelClassName="text-sm text-neutral-900"
          onChange={handleEmailChange}
          disabled={emailVerified}
          defaultValue={initialEmail}
          parent="w-full"
          placeholder={t("email")}
          className="w-full border border-neutral-400 bg-white text-sm font-normal"
        />

        {!emailVerified && (
          <div className="mt-3 flex items-center gap-1">
            <p className="text-sm text-neutral-500">{t("NotVerified")}</p>
            <p
              onClick={handleClickVerify}
              className="cursor-pointer text-sm text-primary-800"
            >
              {t("VerifyNow")}
            </p>
          </div>
        )}
      </div>

      <Modal
        className="flex items-center justify-center"
        isOpen={openModal}
        onClose={onCloseModal}
      >
        <div className="rounded-lg border-2 bg-white px-4 py-4 md:px-6">
          <Verify
            email={email}
            onClose={onCloseModal}
            onResendCode={handleClickVerify}
          />
        </div>
      </Modal>
    </>
  );
};

export default EmailInput;

interface VerifyProps {
  onResendCode: () => void;
  onClose: () => void;
  email: string;
}

const Verify = ({ onResendCode, onClose, email }: VerifyProps) => {
  const [code, setCode] = useState("");

  const { setUserInfo } = useUserInfoStore();

  const { execute, loading } = usePost<ResponseType<User>, VerificationRequest>(
    API_URL.User.Verify,
    {
      onSuccess: (res) => {
        toast.success(res.message);
        setUserInfo(res.data);
        onClose();
      },

      onError: (errorMessage: string) => {
        toast.error(errorMessage);
      },
    },
  );

  const t = useTranslations("UserProfile.MyProfile.EmailVerification");

  const { seconds, timerEnded, restart } = useTimer({ initialSeconds: 120 });

  const onResendOtp = () => {
    restart();
    onResendCode();
  };

  const onVerificationClick = () => {
    execute({ type: "EMAIL", value: email, code: code });
  };

  const handleChange = (value: string) => {
    setCode(value);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div onClick={onClose} className="cursor-pointer text-neutral-500">
        <CloseSquare color="currentColor" size={22} />
      </div>

      <p className="text-center font-bold text-primary-700 md:font-bold">
        {t("Title")}
      </p>

      <div className="flex items-center justify-center">
        <OtpInput onChange={handleChange} otp={code} disabled={loading} />
      </div>
      <div className="w-full">
        <Button
          type="button"
          className={`flex items-center justify-center gap-2 bg-transparent p-0 text-sm font-normal text-primary-800 ${timerEnded && "bg-transparent text-primary-700"}`}
        >
          <p onChange={() => {}} className={`${timerEnded && "hidden"}`}>
            {t("ResendCodeTimer", {
              minutes: Math.floor(seconds / 60),
              seconds: seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60,
            })}
          </p>
          <div
            onClick={onResendOtp}
            className={`cursor-pointer items-center gap-2 ${timerEnded ? "flex" : "hidden"}`}
          >
            <Refresh color="currentColor" />

            <p>{t("ResendCode")}</p>
          </div>
        </Button>
      </div>

      <Button
        loading={loading}
        type="button"
        onClick={onVerificationClick}
        disabled={code.length !== 5}
        variant="contained"
        color="primary"
        className="h-10 rounded-lg text-white md:h-12"
      >
        {t("VerifyNow")}
      </Button>
    </div>
  );
};
