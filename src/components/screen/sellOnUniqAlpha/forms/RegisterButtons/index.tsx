"use client";
import { Button } from "@/components/ui";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "use-intl";

interface RegisterButtonsProps {
  loading: boolean;
  isEdit?: boolean;
}

function RegisterButtons({ loading, isEdit = false }: RegisterButtonsProps) {
  const router = useRouter();

  const t = useTranslations("SellOnUniq.RegisterButtons");
  return (
    <div className="w-full py-8">
      <div className="flex w-full flex-col gap-4 rounded-2xl py-8 lg:flex-row lg:gap-2 lg:px-6 lg:shadow-custom_shadow">
        <Button
          loading={loading}
          type="submit"
          className="h-14 bg-primary-800 text-base font-medium lg:w-1/2"
        >
          {isEdit ? t("Edit") : t("RegisterAnAd")}
        </Button>
        <Button
          type="button"
          onClick={() => router.back()}
          className="h-14 border-2 border-primary-800 bg-transparent text-base font-medium text-primary-800 lg:w-1/2"
        >
          {t("Cancellation")}
        </Button>
      </div>
    </div>
  );
}

export default RegisterButtons;
