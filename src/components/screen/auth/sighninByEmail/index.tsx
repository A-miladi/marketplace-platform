"use client";
import { ArrowDown } from "@/components/icons";
import { Button } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { PageUrls, USER_TOKEN } from "@/constants";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { API_URL } from "@/constants/api";
import { usePost, useRecaptcha } from "@/hooks";
import { useUserInfoStore } from "@/store/useUserInfo";
import { ResponseType } from "@/types";
import { ISignUpResponse } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

interface IProps {
  backToSignin: () => void;
}

interface ILoginEvent {
  email: string;
  password: string;
  captchaToken?: string;
}

const SigninByEmail: React.FC<IProps> = ({ backToSignin }) => {
  const t = useTranslations("signin");
  const { getToken } = useRecaptcha();

  const signupSchema = yup.object().shape({
    email: yup.string().email(t("invalidEmail")).required(t("requiredEmail")),
    password: yup
      .string()
      .min(8, t("minPassword"))
      .required(t("requiredPassword")),
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginEvent>({
    resolver: yupResolver(signupSchema),
  });

  const { setUserInfo } = useUserInfoStore();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.get("return") || "/";

  const { loading, execute } = usePost<
    ResponseType<ISignUpResponse>,
    ILoginEvent
  >(API_URL.Authentication.Signin, {
    onSuccess: (data) => {
      toast.success(data?.message);
      Cookies.set(USER_TOKEN, data?.data?.access_token, { expires: 7 });
      setUserInfo(data?.data?.user);

      if (data.data.user.role === "ADMIN") {
        router.push(PageUrls.AdminRoutes.dashboard);
      } else {
        router.push(returnUrl);
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = async (data: ILoginEvent) => {
    const token = await getToken("signin");
    execute({
      ...data,
      captchaToken: token,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start justify-center gap-10 lg:justify-start"
      >
        <Button
          onClick={backToSignin}
          className="h-6 w-6 cursor-pointer border-2 border-neutral-950 bg-transparent p-0"
        >
          <ArrowDown className="rotate-90" size={12} color="#000" />
        </Button>

        <h2 className="text-xl font-medium leading-6 text-neutral-950 lg:text-2xl lg:font-bold">
          {t("signinByEmail")}
        </h2>

        <div className="flex w-full flex-col gap-4">
          <TextInput
            {...register("email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
            parent=" w-full"
            placeholder={t("email")}
            className="h-12 w-full border border-neutral-400 bg-white"
          />

          <TextInput
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors?.password?.message}
            parent=" w-full"
            placeholder={t("password")}
            className="h-12 w-full border border-neutral-400 bg-white"
          />
          <Link
            href={PageUrls?.Auth?.forgotpass}
            className="cursor-pointer bg-transparent text-xs font-medium text-neutral-500"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <Button
          type="submit"
          loading={loading}
          className="h-12 w-full cursor-pointer bg-primary-800 text-base font-medium"
        >
          {t("SignIn")}
        </Button>
      </form>
    </>
  );
};

export default SigninByEmail;
