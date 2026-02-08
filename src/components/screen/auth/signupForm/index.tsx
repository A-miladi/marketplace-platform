"use client";
import { ArrowDown } from "@/components/icons";
import { Tick } from "@/components/icons/Tick";
import { Button } from "@/components/ui";
import Checkbox from "@/components/ui/CheckBox";
import TextInput from "@/components/ui/TextInput";
import { PageUrls, USER_TOKEN } from "@/constants";
import { API_URL } from "@/constants/api";
import { usePost, useRecaptcha } from "@/hooks";
import { Link, useRouter } from "@/i18n/routing";
import { useUserInfoStore } from "@/store/useUserInfo";
import { ResponseType } from "@/types";
import { ISignUpEvent, ISignUpResponse } from "@/types/auth";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

import { UserRole } from "@/types/user";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import UserType from "../../sellOnUniqAlpha/forms/UserType";

interface IProps {
  setIsSignup: () => void;
}

const SignupForm: React.FC<IProps> = ({ setIsSignup }) => {
  const t = useTranslations("signup");
  const { getToken } = useRecaptcha();

  const [userType, setUserType] = useState<UserRole>("USER");

  const signupSchema = yup.object().shape({
    first_name: yup.string().required(t("requiredName")),
    last_name: yup.string().required(t("requiredLastName")),
    email: yup.string().email(t("invalidEmail")).required(t("requiredEmail")),
    password: yup
      .string()
      .min(8, t("minPassword"))
      .matches(/[a-z]/, t("uppercaseAndLowercaseLetters"))
      .matches(/[A-Z]/, t("uppercaseAndLowercaseLetters"))
      .matches(/\d/, t("IncludesNumber"))
      .matches(/[\W_]+/, t("includeSpecialCharacters")) // Special character validation
      .required(t("requiredPassword")),
  });

  const [isChecked, setIsChecked] = useState(false);

  const { setUserInfo } = useUserInfoStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.get("return") || "/";

  const { loading, execute } = usePost<
    ResponseType<ISignUpResponse>,
    ISignUpEvent
  >(API_URL.Authentication.Signup, {
    onSuccess: (data) => {
      toast.success(data?.message);
      Cookies.set(USER_TOKEN, data?.data?.access_token, { expires: 7 });
      setUserInfo(data?.data?.user);

      // Redirect the user to the return URL after successful signup
      router.push(returnUrl);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = async (data: ISignUpEvent) => {
    try {
      const token = await getToken("signup");
      const newData = {
        ...data,
        role: userType,
        captchaToken: token,
      };

      execute(newData);
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast.error(t("recaptchaError"));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start justify-center lg:justify-start"
      >
        <Button
          onClick={setIsSignup}
          className="h-6 w-6 cursor-pointer border-2 border-neutral-950 bg-transparent p-0"
        >
          <ArrowDown className="rotate-90" size={12} color="#000" />
        </Button>

        <h2 className="mt-10 text-xl font-medium leading-6 text-neutral-950 lg:text-2xl lg:font-bold">
          {t("title")}
        </h2>

        <div className="mt-10 flex w-full flex-wrap justify-between gap-6 md:gap-8">
          <div className="flex w-full items-center gap-3">
            <TextInput
              {...register("first_name")}
              error={!!errors.first_name}
              helperText={errors?.first_name?.message}
              parent=" w-[48%]"
              placeholder={t("firstName")}
              className={cn("w-full border border-neutral-400 bg-white")}
            />
            <TextInput
              {...register("last_name")}
              error={!!errors.last_name}
              parent=" w-[48%]"
              placeholder={t("lastName")}
              helperText={errors?.last_name?.message}
              className="w-full border border-neutral-400 bg-white"
            />
          </div>
          <TextInput
            {...register("email")}
            error={!!errors.email}
            parent=" w-full "
            helperText={errors?.email?.message}
            placeholder={t("Email")}
            className="w-full border border-neutral-400 bg-white"
          />
          <TextInput
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors?.password?.message}
            parent=" w-full"
            placeholder={t("password")}
            className="w-full border border-neutral-400 bg-white"
          />
        </div>

        <div className="mt-8 w-full">
          <UserType onSelect={setUserType} />
        </div>

        <div className="mt-8 flex w-full items-start gap-5">
          <Checkbox
            icon={<Tick color="#fff" size={14} />}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="h-5 w-5 rounded-xl"
          />
          <p className="w-full text-start text-xs font-medium leading-5 text-neutral-500">
            {t("Privacy")}
          </p>
        </div>

        <Button
          disabled={!isChecked}
          loading={loading}
          type="submit"
          className="mt-10 h-12 w-full cursor-pointer bg-primary-800"
        >
          {t("createAccount")}
        </Button>

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
      </form>
    </>
  );
};

export default SignupForm;
