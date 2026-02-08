"use client";
import { ArrowDown } from "@/components/icons";
import { Button } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageUrls } from "@/constants";

interface IProps {
  backToSigninByEmail: () => void;
}
const SigninPassword: React.FC<IProps> = ({ backToSigninByEmail }) => {
  const t = useTranslations("signin");

  return (
    <div className="flex w-full flex-col items-start justify-center gap-10 lg:justify-start">
      <Button
        onClick={backToSigninByEmail}
        className="h-6 w-6 cursor-pointer border-2 border-neutral-950 bg-transparent p-0"
      >
        <ArrowDown className="rotate-90" size={12} color="#000" />
      </Button>

      <h2 className="text-xl font-medium leading-6 text-neutral-950 lg:text-2xl lg:font-bold">
        {t("enterPassword")}
      </h2>

      <div className="flex w-full flex-col gap-4">
        <TextInput
          parent=" w-full"
          placeholder={t("username")}
          className="h-12 w-full border border-neutral-400 bg-white"
        />
        <Link
          href={PageUrls?.Auth?.forgotpass}
          className="cursor-pointer bg-transparent text-xs font-medium text-neutral-500"
        >
          {t("forgotPassword")}
        </Link>
      </div>

      <Button className="h-12 w-full cursor-pointer bg-primary-800">
        {t("signin")}
      </Button>
      <Button className="h-12 w-full cursor-pointer border-2 border-primary-800 bg-transparent text-primary-800">
        {t("signinWithDisposablePassword")}
      </Button>
    </div>
  );
};
export default SigninPassword;
