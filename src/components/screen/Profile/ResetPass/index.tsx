"use client";

import { Button } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { PageUrls } from "@/constants";
import { API_URL } from "@/constants/api";
import { usePost } from "@/hooks";
import { useRouter } from "@/i18n/routing";
import { ResponseType } from "@/types";
import { INewPasswordEvent } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "use-intl";

import * as yup from "yup";

function ResetPass() {
  const t = useTranslations("UserProfile.ResetPass");

  const errorTranslate = useTranslations("newPassword");

  const router = useRouter();

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, errorTranslate("minPassword"))
      .matches(/[a-z]/, errorTranslate("uppercaseAndLowercaseLetters"))
      .matches(/[A-Z]/, errorTranslate("uppercaseAndLowercaseLetters"))
      .matches(/\d/, errorTranslate("IncludesNumber"))
      .matches(/[\W_]+/, errorTranslate("includeSpecialCharacters")) // Special character validation
      .required(errorTranslate("requiredPassword")),
    confirm_password: yup
      .string()
      .min(8, errorTranslate("minPassword"))
      .required(errorTranslate("requiredPassword"))
      .oneOf([yup.ref("password")], errorTranslate("passwordsDontMatch")),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<INewPasswordEvent>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const { loading, execute } = usePost<ResponseType<object>, INewPasswordEvent>(
    API_URL.User.ChangePassword,
    {
      onSuccess: (res) => {
        toast.success(res.message);
        router.push(PageUrls.Profile.profile);
      },

      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const onFormSubmit = (data: INewPasswordEvent) => {
    execute({
      ...data,
    });

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex w-full flex-col"
    >
      <h4 className="border-b-2 pb-2 font-normal text-neutral-950 lg:text-xl">
        {t("ResetPass")}
      </h4>
      <p className="mt-4 text-[10px] font-normal text-neutral-700 md:text-base lg:mt-6">
        {t("description")}
      </p>

      <div className="mt-8 flex w-full flex-col gap-6 lg:mt-10">
        <TextInput
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors?.password?.message}
          placeholder={t("NewPassword")}
          labelClassName="font-normal text-sm"
          className="border border-neutral-400 bg-white"
        />
        <TextInput
          type="password"
          {...register("confirm_password")}
          error={!!errors.confirm_password}
          helperText={errors?.confirm_password?.message}
          placeholder={t("Re-typeNewPassword")}
          labelClassName="font-normal text-sm"
          className="border border-neutral-400 bg-white"
        />
      </div>

      <div className="mt-8 flex w-full gap-5 lg:mt-10 lg:justify-end">
        <Button
          loading={loading}
          className="h-10 w-full rounded-lg md:h-12 md:w-48"
          variant="contained"
          color="primary"
        >
          Change password
        </Button>
      </div>
    </form>
  );
}

export default ResetPass;
