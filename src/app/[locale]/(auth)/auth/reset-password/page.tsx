"use client";
import SigninByEmail from "@/components/screen/auth/sighninByEmail";
import { Button } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { PageUrls } from "@/constants";
import { API_URL } from "@/constants/api";
import { usePost, useRecaptcha } from "@/hooks";
import { useRouter } from "@/i18n/routing";
import { ResponseType } from "@/types";
import { INewPasswordEvent, INewPasswordRequest } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const ResetPassword = () => {
  const t = useTranslations("newPassword");
  const [isSigninByEmail, setSignByEmail] = useState(false);
  const { getToken } = useRecaptcha();
  const router = useRouter();

  // State to track password validity for each condition
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercaseLowercase: false,
    containsNumber: false,
    containsSpecialCharacter: false, // New state for special characters
  });

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const email = searchParams?.get("email");

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, t("minPassword"))
      .matches(/[a-z]/, t("uppercaseAndLowercaseLetters"))
      .matches(/[A-Z]/, t("uppercaseAndLowercaseLetters"))
      .matches(/\d/, t("IncludesNumber"))
      .matches(/[\W_]+/, t("includeSpecialCharacters")) // Special character validation
      .required(t("requiredPassword")),
    confirm_password: yup
      .string()
      .min(8, t("minPassword"))
      .required(t("requiredPassword"))
      .oneOf([yup.ref("password")], t("passwordsDontMatch")),
  });

  const { loading, execute } = usePost<ResponseType<null>, INewPasswordRequest>(
    API_URL.Authentication.resetPassword,
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        router.push(PageUrls.Auth.signin);
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const onSubmit = async (data: INewPasswordEvent) => {
    const recaptchaToken = await getToken("reset_password");
    const newData = {
      ...data,
      captchaToken: recaptchaToken,
      token: token || "",
      email: email || "",
    };

    execute(newData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewPasswordEvent>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const validatePassword = (password: string) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercaseLowercase: /[a-z]/.test(password) && /[A-Z]/.test(password),
      containsNumber: /\d/.test(password),
      containsSpecialCharacter: /[\W_]+/.test(password), // Check for special characters
    });
  };

  return (
    <>
      {!isSigninByEmail ? (
        <div className="flex w-full flex-col items-start lg:justify-start">
          <h2 className="text-xl font-medium leading-6 text-neutral-950 lg:text-2xl lg:font-bold">
            {t("title")}
          </h2>

          <div className="mt-10 flex w-full flex-col gap-8">
            <TextInput
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors?.password?.message}
              onChange={(e) => validatePassword(e.target.value)}
              parent="w-full"
              placeholder={t("newPassword")}
              className="h-12 w-full rounded-lg border border-neutral-400 bg-white"
            />
            <TextInput
              type="password"
              {...register("confirm_password")}
              error={!!errors.confirm_password}
              helperText={errors?.confirm_password?.message}
              onChange={(e) => validatePassword(e.target.value)}
              parent="w-full"
              placeholder={t("repeatNewPassword")}
              className="h-12 w-full rounded-lg border border-neutral-400 bg-white"
            />
          </div>

          <div className="mt-6 flex w-full flex-col gap-4">
            <div
              className={`w-full rounded-md px-3 py-[9px] ${
                passwordCriteria.length
                  ? "bg-green-50 text-green-500"
                  : "bg-neutral-50 text-neutral-400"
              }`}
            >
              <p className="text-xs font-normal leading-[14.5px]">
                {t("eightCharacters")}
              </p>
            </div>

            <div
              className={`w-full rounded-md px-3 py-[9px] ${
                passwordCriteria.uppercaseLowercase
                  ? "bg-green-50 text-green-500"
                  : "bg-neutral-50 text-neutral-400"
              }`}
            >
              <p className="text-xs font-normal leading-[14.5px]">
                {t("uppercaseAndLowercaseLetters")}
              </p>
            </div>

            <div
              className={`w-full rounded-md px-3 py-[9px] ${
                passwordCriteria.containsNumber
                  ? "bg-green-50 text-green-500"
                  : "bg-neutral-50 text-neutral-400"
              }`}
            >
              <p className="text-xs font-normal leading-[14.5px]">
                {t("IncludesNumber")}
              </p>
            </div>

            <div
              className={`w-full rounded-md px-3 py-[9px] ${
                passwordCriteria.containsSpecialCharacter
                  ? "bg-green-50 text-green-500"
                  : "bg-neutral-50 text-neutral-400"
              }`}
            >
              <p className="text-xs font-normal leading-[14.5px]">
                {t("includeSpecialCharacters")}
              </p>
            </div>
          </div>

          <Button
            loading={loading}
            onClick={handleSubmit(onSubmit)}
            className="mt-10 h-12 w-full bg-primary-800 text-sm font-normal leading-4 lg:h-12 lg:text-xs lg:font-medium xl:text-base"
          >
            {t("VerifyButton")}
          </Button>
        </div>
      ) : (
        <SigninByEmail backToSignin={() => setSignByEmail(false)} />
      )}
    </>
  );
};

export default ResetPassword;
