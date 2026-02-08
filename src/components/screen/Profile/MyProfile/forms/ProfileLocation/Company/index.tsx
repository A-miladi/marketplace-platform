"use client";

import TextInput from "@/components/ui/TextInput";
import { UpdateCompanyRequest } from "@/types/user";
import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ProfileLocationProps {
  register: UseFormRegister<UpdateCompanyRequest>;
  errors: FieldErrors<UpdateCompanyRequest>;
}

const CompanyProfileLocation = ({ errors, register }: ProfileLocationProps) => {
  const t = useTranslations("UserProfile.MyProfile");

  return (
    <div>
      <div className="flex flex-col gap-4">
        <TextInput
          label={t("zipCode")}
          labelClassName="text-sm text-neutral-900"
          {...register("zip_code")}
          placeholder={t("zipCode")}
          className="w-full border border-neutral-400 bg-white text-sm font-normal"
          helperText={errors?.zip_code?.message}
          error={!!errors.zip_code}
          type="number"
        />

        <TextInput
          label={t("Address")}
          labelClassName="text-sm text-neutral-900"
          {...register("address")}
          helperText={errors?.address?.message}
          error={!!errors.address}
          placeholder={t("Address")}
          className="w-full border border-neutral-400 bg-white text-sm font-normal"
        />
      </div>
    </div>
  );
};

export default CompanyProfileLocation;
