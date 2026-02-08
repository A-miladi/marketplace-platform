"use client";
import { Edit } from "@/components/icons/Edit";
import { Button } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { API_URL } from "@/constants/api";
import { usePost } from "@/hooks";
import { useUserInfoStore } from "@/store/useUserInfo";

import { ResponseType } from "@/types";
import { UpdateProfileRequest, User } from "@/types/user";
import { jsonToForm } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import AddPhoto from "../addPhoto";
import UserBirthDate from "../BirthDate/User";
import EmailInput from "../EmailInput";
import PhoneInput from "../PhoneInput";
import UserProfileLocation from "../ProfileLocation/User";
import SwitchToCompany from "../SwitchToCompany";



const createValidationSchema = (t: (key: string) => string) => {
  return yup.object<UpdateProfileRequest>().shape({
    first_name: yup.string().required(t("Validation.NameRequired")),
    last_name: yup.string().required(t("Validation.LastNameRequired")),
    address: yup
      .string()
      .required(t("Validation.AddressRequired"))
      .min(5, t("Validation.AddressMinLength"))
      .max(100, "Address cannot exceed 100 characters"),
    zip_code: yup
      .string()
      .min(2, t("Validation.ZipCodeMinLength"))
      .required(t("Validation.ZipCodeRequired"))
      .matches(/^\d{5}(-\d{4})?$/, "Please enter a valid zip code"),
    birth_date: yup.string().required(t("Validation.BirthDateRequired")),
  });
};

const getDefaultValues = (
  userData: User | null,
): Partial<UpdateProfileRequest> => {
  if (!userData) return {};

  return {
    first_name: userData.profile?.first_name || "",
    last_name: userData.profile?.last_name || "",
    address: userData.profile?.address || "",
    zip_code: userData.profile?.zip_code || "",
    birth_date: userData.profile?.birth_date
      ? userData.profile.birth_date.split("T")[0]
      : "",
  };
};

function UserForm() {
  const { userInfo: userData, setUserInfo } = useUserInfoStore();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const t = useTranslations("UserProfile.MyProfile");

  const validationSchema = useMemo(() => createValidationSchema(t), [t]);
  const defaultValues = useMemo(() => getDefaultValues(userData), [userData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
    setValue,
  } = useForm<UpdateProfileRequest>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    setIsFormDirty(isDirty || !!selectedImage);
  }, [isDirty, selectedImage]);

  useEffect(() => {
    if (userData) {
      reset(getDefaultValues(userData));
    }
  }, [userData, reset]);

  const { loading, execute } = usePost<ResponseType<User>, FormData>(
    API_URL.User.User,
    {
      onSuccess: (res) => {
        toast.success(res.message);
        setUserInfo(res.data);
        setSelectedImage(null);
      },
      onError: (errorMessage: string) => {
        toast.error(errorMessage);
      },
    },
  );

  const handleFormSubmit = (data: UpdateProfileRequest) => {
    const { first_name, last_name, address, zip_code, birth_date } = data;

    const formData = jsonToForm({
      first_name,
      last_name,
      birth_date,
      address: address.trim(),
      zip_code: zip_code.trim(),
    });

    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }

    execute(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between border-b pb-4">
          <AddPhoto
            selectedImage={
              selectedImage ? URL.createObjectURL(selectedImage) : null
            }
            onSelectImage={setSelectedImage}
          />
          <SwitchToCompany />
        </div>

        <div className="flex w-full gap-2 lg:gap-4">
          <TextInput
            label={t("Name")}
            {...register("first_name")}
            labelClassName="text-sm text-neutral-900"
            error={!!errors.first_name}
            icon={<Edit size={24} color="#6D6D6D" />}
            parent="w-1/2"
            placeholder={t("Name")}
            className="w-full border border-neutral-400 bg-white text-sm font-normal"
          />
          <TextInput
            label={t("LastName")}
            {...register("last_name")}
            labelClassName="text-sm text-neutral-900"
            error={!!errors.last_name}
            icon={<Edit size={24} color="#6D6D6D" />}
            parent="w-1/2"
            placeholder={t("LastName")}
            className="w-full border border-neutral-400 bg-white text-sm font-normal"
          />
        </div>

        <EmailInput
          email={userData?.email || ""}
          emailVerified={!!userData?.profile?.email_verified_at}
        />

        <PhoneInput
          phone={userData?.phone_number || ""}
          phoneVerified={!!userData?.profile?.phone_verified_at}
        />

        <UserBirthDate
          setValue={setValue}
          watch={watch}
          error={!!errors.birth_date}
          helperText={errors?.birth_date?.message}
        />

        <UserProfileLocation
          setValue={setValue}
          watch={watch}
          errors={errors}
          register={register}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
          disabled={!isFormDirty}
          className="h-10 w-full min-w-48 bg-primary-800 px-5 text-sm font-normal md:h-12 lg:w-auto lg:text-base lg:font-medium"
        >
          {t("submitButton")}
        </Button>
      </div>
    </form>
  );
}

export default UserForm;
