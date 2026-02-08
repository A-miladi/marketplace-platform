"use client";
import { Button } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { useTimer } from "@/hooks";
import { ArrowDown, Refresh } from "@/components/icons";

interface IProps {
  setIsOtp: Dispatch<SetStateAction<boolean>>;
  phone?: string;
  // handleResendCode: () => void;
}

const SignupOtp = ({ setIsOtp }: IProps) => {
  const t = useTranslations("otp");
  const { seconds, timerEnded, restart } = useTimer({ initialSeconds: 5 });

  console.log(timerEnded);

  const onResendOtp = () => {
    restart();
    // handleResendCode();
  };

  return (
    <div className="flex w-full flex-col items-start justify-center lg:justify-start">
      <Button
        onClick={() => setIsOtp(false)}
        className="h-6 w-6 cursor-pointer border-2 border-neutral-950 bg-transparent p-0"
      >
        <ArrowDown className="rotate-90" size={12} color="#000" />
      </Button>

      <p className="mt-10 text-xl font-normal">{t("subTitle")}</p>
      <h2 className="mt-5 text-xl font-medium leading-6 text-neutral-950 lg:text-2xl lg:font-bold">
        {t("title")}
      </h2>

      <div className="mt-10 flex w-full flex-col gap-4">
        <TextInput
          parent=" w-full"
          placeholder={t("enterYourCode")}
          className="h-12 w-full border border-neutral-400 bg-white"
        />
        <div className="w-full">
          <Button
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
      </div>

      <Button className="mt-10 h-12 w-full cursor-pointer bg-primary-800 font-medium">
        {t("signinButton")}
      </Button>
    </div>
  );
};
export default SignupOtp;
