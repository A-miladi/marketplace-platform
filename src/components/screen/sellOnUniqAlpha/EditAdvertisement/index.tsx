"use client";

import { PriceInput } from "@/components/common/PriceInput";
import PhotoUpload from "@/components/PhotoUpload";
import { Spinner, TextArea } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { PageUrls } from "@/constants";
import { API_URL } from "@/constants/api";
import { useFetch, usePost } from "@/hooks";
import { ResponseType } from "@/types";
import { AdvertisementFormData, IAdvertisement } from "@/types/advertisement";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";

import BlockModal from "@/components/BlockModal";
import { useRouter } from "@/i18n/routing";
import { useUserInfoStore } from "@/store/useUserInfo";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import CategoryForm from "../forms/CategoryForm";
import CategoryPropertiesForm from "../forms/CategoryPropertiesForm";
import LocationForm from "../forms/LocationForm";
import RegisterButtons from "../forms/RegisterButtons";
import ToggleForm from "../forms/ToggleForm";

const schema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title cannot exceed 100 characters")
    .required("Advertisement title is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .max(Number.MAX_SAFE_INTEGER, "Price is too high")
    .required("Price is required"),
  description: yup
    .string()
    .min(5, "Description must be at least 5 characters long")
    .max(250, "Description cannot exceed 250 characters")
    .required("Description is required"),
  category_id: yup.number().required("Category is required"),
  zip_code: yup
    .string()
    .required("Zip code is required")
    .matches(/^\d{5}(-\d{4})?$/, "Please enter a valid zip code"),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters long")
    .max(200, "Address cannot exceed 200 characters"),
});

const EditAdvertisement = ({ id }: { id: string }) => {
  const router = useRouter();

  const { userInfo } = useUserInfoStore();

  const { data: SingleAd, loading: SingleAdLoading } = useFetch<
    ResponseType<IAdvertisement>
  >(`${API_URL.Public.ad}/${id}`);

  const [showPhone, setShowPhone] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [currency, setCurrency] = useState<"USD" | "EURO">("USD");
  const [formattedPrice, setFormattedPrice] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    trigger,
    formState,
  } = useForm<AdvertisementFormData>({
    resolver: yupResolver(schema),
  });

  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (SingleAd?.data) {
      // Populate form with existing advertisement data
      const properties = SingleAd.data.properties.reduce(
        (acc, prop) => {
          // Handle multi-select values
          if (
            prop.property_definition.type === "SELECT" &&
            prop.property_definition.validation?.multiple
          ) {
            // Split comma-separated values into array and trim whitespace
            const values =
              typeof prop.value === "string"
                ? prop.value.split(",").map((v) => v.trim())
                : Array.isArray(prop.value)
                  ? prop.value.map((v) => String(v))
                  : [String(prop.value)];
            acc[`properties.${prop.property_definition.id}`] = values;
          } else {
            acc[`properties.${prop.property_definition.id}`] = prop.value;
          }
          return acc;
        },
        {} as Record<string, string | number | string[]>,
      );

      reset({
        title: SingleAd.data.title,
        price: SingleAd.data.price,
        description: SingleAd.data.description,
        category_id: SingleAd.data.category.id,
        ...properties,
      });

      setValue("title", SingleAd.data.title);
      setValue("price", SingleAd.data.price);
      setValue("description", SingleAd.data.description);
      setValue("category_id", SingleAd.data.category.id);
      setValue("zip_code", SingleAd.data.zip_code || "");
      setValue("address", SingleAd.data.address || "");
      setCurrency(SingleAd.data.currency);
      setShowPhone(SingleAd.data.show_phone);
      setLocation(SingleAd.data.location);
      setImagePreviews(SingleAd.data.images);
      setZipCode(SingleAd.data.zip_code || "");
      setAddress(SingleAd.data.address || "");

      setFormattedPrice(SingleAd.data.price.toLocaleString("en-US"));
    }
  }, [SingleAd?.data, setValue, reset]);

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
  };

  const categoryId = watch("category_id");

  useEffect(() => {
    if (categoryId) {
      setSelectedCategoryId(categoryId);
      // Clear properties when category changes
      setValue("properties", []);
    }
  }, [categoryId, setValue]);

  const { loading, execute } = usePost<ResponseType<IAdvertisement>, FormData>(
    `${API_URL.User.Ad}/${id}`,
    {
      onSuccess: (data) => {
        reset();
        toast.success(data.message);
        router.push(`${PageUrls.Advertisement.advertisement}/${data.data.id}`);
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const onSubmit = (data: AdvertisementFormData) => {
    const fixedData = {
      ...data,
      price: Math.floor(Number(data.price)),
      currency,
      show_phone: showPhone,
      properties: Array.isArray(data.properties)
        ? data.properties
            .map((value, index) => ({
              property_definition_id: index,
              value: Array.isArray(value) ? value : String(value || ""),
            }))
            .filter(
              (prop) =>
                prop.value !== "" &&
                prop.value !== "null" &&
                prop.value !== null &&
                (!Array.isArray(prop.value) || prop.value.length > 0),
            )
        : Object.entries(data.properties || {})
            .map(([id, value]) => ({
              property_definition_id: Number(id.split(".")[1]),
              value: Array.isArray(value) ? value : String(value || ""),
            }))
            .filter(
              (prop) =>
                prop.value !== "" &&
                prop.value !== "null" &&
                prop.value !== null &&
                (!Array.isArray(prop.value) || prop.value.length > 0),
            ),
    };

    const formData = new FormData();

    formData.append("title", fixedData.title);
    formData.append("description", fixedData.description);
    formData.append("price", String(fixedData.price));
    formData.append("currency", fixedData.currency);
    formData.append("category_id", String(fixedData.category_id));
    formData.append("show_phone", String(fixedData.show_phone));
    formData.append("zip_code", fixedData.zip_code);
    formData.append("address", fixedData.address);

    if (location) {
      formData.append(
        "location",
        JSON.stringify({
          lat: location.lat,
          lng: location.lng,
        }),
      );
    }

    // Only append properties if they exist and are not empty
    if (fixedData.properties && fixedData.properties.length > 0) {
      formData.append("properties", JSON.stringify(fixedData.properties));
    }

    // Handle old images as comma-separated string
    const remainingOldImages = imagePreviews
      .filter(
        (imageUrl) =>
          typeof imageUrl === "string" && imageUrl.startsWith("http"),
      )
      .map((imageUrl) => imageUrl);

    // Send old images as comma-separated string, or empty string if no old images remain
    const imagesOldString =
      remainingOldImages.length > 0 ? remainingOldImages.join(",") : "";

    formData.append("images_old", imagesOldString);

    // Then append new images
    images.forEach((image) => {
      formData.append("images", image);
    });

    execute(formData);
  };

  const t = useTranslations("SellOnUniq.AdvertisementRegistrationForm");

  return (
    <div className="relative flex min-h-72 w-full justify-center md:pt-12">
      {SingleAdLoading ? (
        <Spinner />
      ) : userInfo.profile.status === "BLOCKED" ? (
        <BlockModal />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-[1224px] flex-col justify-center px-5 py-16 md:py-0 lg:flex-row lg:gap-[88px] xl:px-0"
        >
          <div className="w-full lg:w-2/4">
            <div className="lg:hidden">
              <PhotoUpload
                imagePreviews={imagePreviews}
                setImagePreviews={setImagePreviews}
                onImagesChange={handleImagesChange}
              />
            </div>
            <div className="border-b pb-4 pt-6 lg:pt-0">
              <h2 className="text-xl font-medium text-neutral-950 lg:text-2xl lg:font-bold">
                {t("AdvertisementRegistration")}
              </h2>
            </div>

            <div className="flex flex-col pt-4 lg:pt-6">
              <TextInput
                label="Advertisement title"
                placeholder="Enter your ad title"
                {...register("title")}
                error={!!formState.errors.title}
                helperText={formState.errors?.title?.message}
                className="h-10 border border-neutral-400 bg-white text-sm font-normal md:h-12"
                labelClassName="mb-3 lg:mb-4 font-normal text-sm lg:font-medium lg:text-base"
              />
            </div>

            <CategoryForm control={control} errors={formState.errors} />

            {selectedCategoryId && (
              <CategoryPropertiesForm
                categoryId={selectedCategoryId}
                control={control}
                errors={formState.errors}
                existingProperties={SingleAd?.data?.properties?.reduce(
                  (acc, prop) => {
                    acc[prop.property_definition.id] = prop.value;
                    return acc;
                  },
                  {} as Record<number, string | number>,
                )}
              />
            )}

            <LocationForm
              zipCode={zipCode}
              setZipCode={setZipCode}
              address={address}
              setAddress={setAddress}
              location={location}
              setLocation={setLocation}
              errors={formState.errors}
              setValue={setValue}
              trigger={trigger}
            />

            <PriceInput
              currency={currency}
              setCurrency={setCurrency}
              formattedPrice={formattedPrice}
              setFormattedPrice={setFormattedPrice}
              setValue={setValue}
              trigger={trigger}
              errors={formState.errors}
            />

            <div className="flex flex-col pt-4 lg:pt-6">
              <TextArea
                label="Description"
                placeholder="Enter your description of the device"
                {...register("description")}
                error={!!formState.errors.description}
                helperText={formState.errors.description?.message}
                className="h-40 resize-none border border-neutral-400 bg-white text-sm font-normal md:h-52"
                labelClassName="mb-3 lg:mb-4 font-normal text-sm lg:font-medium lg:text-base"
              />
            </div>
          </div>

          <div className="flex w-full flex-col lg:w-3/4">
            <div className="hidden lg:flex">
              <PhotoUpload
                imagePreviews={imagePreviews}
                setImagePreviews={setImagePreviews}
                onImagesChange={handleImagesChange}
              />
            </div>
            <ToggleForm showPhone={showPhone} setShowPhone={setShowPhone} />
            <RegisterButtons isEdit loading={loading} />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditAdvertisement;
