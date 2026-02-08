"use client";

import { Edit } from "@/components/icons/Edit";
import TextInput from "@/components/ui/TextInput";
import { UpdateProfileRequest } from "@/types/user";
import { useTranslations } from "next-intl";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface ProfileLocationProps {
  register: UseFormRegister<UpdateProfileRequest>;
  errors: FieldErrors<UpdateProfileRequest>;
  watch: UseFormWatch<UpdateProfileRequest>;
  setValue: UseFormSetValue<UpdateProfileRequest>;
}

const UserProfileLocation = ({ errors, register }: ProfileLocationProps) => {
  const t = useTranslations("UserProfile.MyProfile");

  return (
    <div className="flex flex-col gap-4">
      <TextInput
        label={t("zipCode")}
        labelClassName="text-sm text-neutral-900"
        {...register("zip_code")}
        placeholder={t("zipCode")}
        icon={<Edit size={24} color="#6D6D6D" />}
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
  );
};

export default UserProfileLocation;
