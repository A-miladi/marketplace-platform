import { Button, TextArea } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { API_URL } from "@/constants/api";
import { usePost } from "@/hooks";
import { useUserInfoStore } from "@/store/useUserInfo";
import { ResponseType } from "@/types";
import { CompanyProfile, UpdateCompanyRequest, User } from "@/types/user";
import { jsonToForm } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import EmailInput from "../EmailInput";
import PhoneInput from "../PhoneInput";
import CompanyProfileLocation from "../ProfileLocation/Company";
import PurchaseSchedule from "../PurchaseSchedule";
import SideSelection from "../SideSelection";
import AddPhoto from "../addPhoto";

interface ExtraData {
  hear_about_us: string;
  brand_priority: string;
  budget: string;
  equipment_type: string;
  suggestions: string;
  purchase_schedule: string;
}

const getDefaultValues = (
  userData: User | null,
): Partial<UpdateCompanyRequest> => {
  if (!userData) return {};

  const profile = userData.profile as CompanyProfile;
  let extraData: ExtraData = {
    hear_about_us: "",
    brand_priority: "",
    budget: "",
    equipment_type: "",
    suggestions: "",
    purchase_schedule: "",
  };

  try {
    if (typeof profile?.extra_data === "string") {
      extraData = JSON.parse(profile.extra_data);
    } else {
      extraData = profile?.extra_data || extraData;
    }
  } catch (error) {
    console.error("Error parsing extra_data:", error);
  }

  return {
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    address: profile?.address || "",
    zip_code: profile?.zip_code || "",
    company_name: profile?.company_name || "",
    is_email_subscribed: profile?.is_email_subscribed || false,
    side: profile?.side || "BOTH",
    role: profile?.role || "",
    extra_data: extraData,
  };
};

const createValidationSchema = (t: (key: string) => string) => {
  return yup.object<UpdateCompanyRequest>().shape({
    first_name: yup.string().required(t("Validation.NameRequired")),
    last_name: yup.string().required(t("Validation.LastNameRequired")),
    address: yup
      .string()
      .required(t("Validation.AddressRequired"))
      .min(5, t("Validation.AddressMinLength"))
      .max(100, "Address cannot be longer than 100 characters"),
    zip_code: yup
      .string()
      .required(t("Validation.ZipCodeRequired"))
      .min(2, t("Validation.ZipCodeMinLength"))
      .matches(/^\d{5}(-\d{4})?$/, "Please enter a valid zip code"),
    company_name: yup
      .string()
      .required(t("CompanyForm.Validation.CompanyNameRequired")),
    role: yup.string().required(t("CompanyForm.Validation.JobTitleRequired")),
    side: yup
      .string()
      .oneOf(["BUYER", "SELLER", "BOTH"])
      .required(t("CompanyForm.Validation.SideRequired")),
    is_email_subscribed: yup.boolean().optional(),
    extra_data: yup
      .object()
      .shape({
        hear_about_us: yup.string().default(""),
        brand_priority: yup.string().default(""),
        budget: yup.string().default(""),
        equipment_type: yup.string().default(""),
        suggestions: yup.string().default(""),
        purchase_schedule: yup.string().default(""),
      })
      .optional(),
  });
};

const CompanyForm = () => {
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
  } = useForm<UpdateCompanyRequest>({
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
    API_URL.User.Company,
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

  const onSubmit = (data: UpdateCompanyRequest) => {
    const formData = jsonToForm({
      ...data,
    });

    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }

    execute(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        </div>

        <div className="flex w-full items-center gap-2 md:gap-4">
          <TextInput
            label={t("CompanyForm.FirstName")}
            labelClassName="text-sm text-neutral-900"
            parent="w-full"
            {...register("first_name")}
            placeholder={t("CompanyForm.FirstName")}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
            className="w-full border border-neutral-400 bg-white text-sm font-normal"
          />
          <TextInput
            label={t("CompanyForm.LastName")}
            labelClassName="text-sm text-neutral-900"
            parent="w-full"
            {...register("last_name")}
            placeholder={t("CompanyForm.LastName")}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
            className="w-full border border-neutral-400 bg-white text-sm font-normal"
          />
        </div>

        <TextInput
          label={t("CompanyForm.JobTitle")}
          labelClassName="text-sm text-neutral-900"
          parent="w-full"
          {...register("role")}
          placeholder={t("CompanyForm.JobTitle")}
          error={!!errors.role}
          helperText={errors.role?.message}
          className="w-full border border-neutral-400 bg-white text-sm font-normal"
        />

        <TextInput
          label={t("CompanyForm.CompanyName")}
          labelClassName="text-sm text-neutral-900"
          parent="w-full"
          {...register("company_name")}
          placeholder={t("CompanyForm.CompanyName")}
          error={!!errors.company_name}
          helperText={errors.company_name?.message}
          className="w-full border border-neutral-400 bg-white text-sm font-normal"
        />

        <SideSelection
          register={register}
          errors={errors}
          defaultSide={userData?.profile?.side}
        />

        <EmailInput
          email={userData?.email || ""}
          emailVerified={!!userData?.profile?.email_verified_at}
        />

        <PhoneInput
          phone={userData?.phone_number || ""}
          phoneVerified={!!userData?.profile?.phone_verified_at}
        />

        <CompanyProfileLocation errors={errors} register={register} />

        <TextInput
          label={t("CompanyForm.HowDidYouHearAboutUs")}
          labelClassName="text-sm text-neutral-900"
          {...register("extra_data.hear_about_us")}
          placeholder={t("CompanyForm.HowDidYouHearAboutUs")}
          error={!!errors.extra_data?.hear_about_us}
          helperText={errors.extra_data?.hear_about_us?.message}
          className="w-full border border-neutral-400 bg-white text-sm font-normal"
        />
        <TextInput
          label={t("CompanyForm.BrandPriority")}
          labelClassName="text-sm text-neutral-900"
          {...register("extra_data.brand_priority")}
          placeholder={t("CompanyForm.BrandPriority")}
          error={!!errors.extra_data?.brand_priority}
          helperText={errors.extra_data?.brand_priority?.message}
          className="w-full border border-neutral-400 bg-white text-sm font-normal"
        />
        <TextInput
          label={t("CompanyForm.Budget")}
          labelClassName="text-sm text-neutral-900"
          {...register("extra_data.budget")}
          placeholder={t("CompanyForm.Budget")}
          error={!!errors.extra_data?.budget}
          helperText={errors.extra_data?.budget?.message}
          className="w-full border border-neutral-400 bg-white text-sm font-normal"
        />
        <TextInput
          label={t("CompanyForm.EquipmentType")}
          labelClassName="text-sm text-neutral-900"
          {...register("extra_data.equipment_type")}
          placeholder={t("CompanyForm.EquipmentType")}
          error={!!errors.extra_data?.equipment_type}
          helperText={errors.extra_data?.equipment_type?.message}
          className="w-full border border-neutral-400 bg-white text-sm font-normal"
        />
        <PurchaseSchedule
          setValue={setValue}
          watch={watch}
          error={!!errors.extra_data?.purchase_schedule}
          helperText={errors.extra_data?.purchase_schedule?.message}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("is_email_subscribed")}
            className="h-4 w-4 rounded border-neutral-400 text-primary-800 focus:ring-primary-800"
          />
          <label className="text-sm text-neutral-600">
            {t("CompanyForm.NewsletterLabel")}
          </label>
        </div>

        <TextArea
          label={t("CompanyForm.Suggestions")}
          labelClassName="text-sm text-neutral-900 font-medium"
          {...register("extra_data.suggestions")}
          placeholder={t("CompanyForm.Suggestions")}
          error={!!errors.extra_data?.suggestions}
          helperText={errors.extra_data?.suggestions?.message}
          className="min-h-32 w-full border border-neutral-400 bg-white text-sm font-normal"
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
          disabled={!isFormDirty}
          className="h-10 w-full min-w-48 bg-primary-800 px-5 text-sm font-normal md:h-12 lg:w-auto lg:text-base lg:font-medium"
        >
          {t("CompanyForm.submitButton")}
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;
