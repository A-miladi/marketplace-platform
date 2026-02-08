"use client";

import { ArrowDown } from "@/components/icons";
import { Button } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { PageUrls } from "@/constants";
import { API_URL } from "@/constants/api";
import { usePost, useRecaptcha } from "@/hooks";
import { useRouter } from "@/i18n/routing";
import { ResponseType } from "@/types";
import { IForgotPassEvent } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import * as yup from "yup";

const ForgotPassword = () => {
  const t = useTranslations("forgotPassword");
  const { getToken } = useRecaptcha();

  const router = useRouter();

  const [isSend, setIsSend] = useState(false);

  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email(t("invalidEmail")).required(t("requiredEmail")),
  });

  const { loading, execute } = usePost<ResponseType<null>, IForgotPassEvent>(
    API_URL.Authentication.ForgetPassword,
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        setIsSend(true);
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const onSubmit = async (data: IForgotPassEvent) => {
    const token = await getToken("forgot_password");
    const newData = {
      ...data,
      captchaToken: token,
    };

    execute(newData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassEvent>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  return (
    <div className="w-full">
      {isSend ? (
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <p className="text-center text-sm text-neutral-500">{t("request")}</p>

          <Button
            onClick={() => router.push(PageUrls.Home.home)}
            variant="outlined"
            size="lg"
            className="h-12 w-full text-sm"
            color="primary"
          >
            {t("back")}
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-start justify-center lg:justify-start"
        >
          <Button
            type="button"
            onClick={router.back}
            className="h-6 w-6 cursor-pointer border-2 border-neutral-950 bg-transparent p-0"
          >
            <ArrowDown className="rotate-90" size={12} color="#000" />
          </Button>

          <h2 className="mt-10 text-xl font-medium leading-6 text-neutral-950 lg:text-2xl lg:font-bold">
            {t("title")}
          </h2>
          <p className="mt-8 bg-white text-xs font-medium text-neutral-500">
            {t("description")}
          </p>
          <p className="mt-6 bg-white text-xs font-medium text-neutral-500">
            {t("security")}
          </p>
          <TextInput
            {...register("email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
            parent=" w-full"
            placeholder={t("email")}
            className="mt-8 h-12 w-full rounded-lg border border-neutral-400 bg-white"
          />
          <div className="w-full">
            <Button
              type="submit"
              loading={loading}
              className="mt-10 h-12 w-full cursor-pointer rounded-lg bg-primary-800 lg:w-auto lg:px-[45.5px]"
            >
              {t("sendResetInstructions")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
