"use client";

import "react-international-phone/style.css";

import { Refresh } from "@/components/icons";
import Modal from "@/components/Modal";
import OtpInput from "@/components/OtpInput";
import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { usePost, useTimer } from "@/hooks";
import { ResponseType } from "@/types";
import { SendVerification, User, VerificationRequest } from "@/types/user";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

import { CLoseCircle } from "@/components/icons/CLoseCircle";
import { Countries } from "@/constants";
import { useUserInfoStore } from "@/store/useUserInfo";
import { isPhoneValid } from "@/utils";
import { PhoneInput as CountryPhoneInput } from "react-international-phone";

interface PhoneInputProps {
  phoneVerified?: boolean;
  phone: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneVerified,
  phone: initialPhone,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [phone, setPhone] = useState(initialPhone);
  const isValid = isPhoneValid(phone);
  const t = useTranslations("UserProfile.MyProfile.PhoneVerification");

  const { execute } = usePost<ResponseType<string>, SendVerification>(
    API_URL.User.SendVerification,
    {
      onSuccess: (res) => {
        toast.success(res.data);
        setOpenModal(true);
      },
      onError: (errorMessage: string) => {
        toast.error(errorMessage);
      },
    },
  );

  const handleClickVerify = () => {
    execute({ type: "PHONE", value: phone });
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="w-full">
        <p className="mb-1 text-sm font-medium text-neutral-900">Phone</p>
        <CountryPhoneInput
          forceDialCode
          disabled={phoneVerified}
          defaultCountry={"de"}
          inputStyle={{
            width: "100%",
            height: "100%",
            padding: "0.5rem",
            borderRadius: "0 8px 8px 0",
            border: "1px solid #888888",
            fontSize: "14px",
            color: "#000000",
            backgroundColor: phoneVerified ? "#E7E7E7" : "white",
            cursor: phoneVerified ? "not-allowed" : "text",
          }}
          countrySelectorStyleProps={{
            style: {
              height: "100%",
            },
            buttonStyle: {
              height: "100%",
              paddingLeft: "8px",
              paddingRight: "8px",
              border: "1px solid #888888",
              backgroundColor: phoneVerified ? "#E7E7E7" : "white",
              cursor: phoneVerified ? "not-allowed" : "text",
              borderRadius: "8px 0px 0px 8px",
            },
          }}
          value={phone}
          onChange={(value) => {
            setPhone(value);
          }}
          countries={Countries}
          className="h-10 md:h-12"
        />

        {!phoneVerified && (
          <div className="mt-3 flex items-center gap-1">
            <p className="text-sm text-neutral-500">{t("NotVerified")}</p>

            {isValid ? (
              <p
                onClick={handleClickVerify}
                className="cursor-pointer text-sm text-primary-800"
              >
                {t("VerifyNow")}
              </p>
            ) : (
              <p className="cursor-pointer text-sm text-neutral-500">
                {t("VerifyNow")}
              </p>
            )}
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
            phone={phone}
            onClose={onCloseModal}
            onResendCode={handleClickVerify}
          />
        </div>
      </Modal>
    </>
  );
};

export default PhoneInput;

interface VerifyProps {
  onResendCode: () => void;
  onClose: () => void;
  phone: string | number;
}

const Verify = ({ onResendCode, onClose, phone }: VerifyProps) => {
  const [code, setCode] = useState("");
  const t = useTranslations("UserProfile.MyProfile.PhoneVerification");
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

  const { seconds, timerEnded, restart } = useTimer({ initialSeconds: 120 });

  const onResendOtp = () => {
    restart();
    onResendCode();
  };

  const onVerificationClick = () => {
    execute({ type: "PHONE", value: phone, code: code });
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
