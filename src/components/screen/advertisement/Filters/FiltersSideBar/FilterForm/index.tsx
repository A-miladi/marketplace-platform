"use client";

import { FormContainer, FormInputs } from "@/components/Form";
import { Button } from "@/components/ui";
import Accordion from "@/components/ui/Accordion";
import Select from "@/components/ui/Select";
import { API_URL } from "@/constants/api";
import { sortOptions } from "@/constants/SortOptions";
import { useFetch } from "@/hooks";
import { useFilterStore } from "@/store/useFilters";
import { ResponseType } from "@/types";
import { ICategory } from "@/types/category";
import { IInput } from "@/types/Forms";
import { IFilters } from "@/types/general";
import { cleanObject, formatDateToYYYYMMDD } from "@/utils";
import { buildAdvertisementUrl } from "@/utils/url";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DateFilter from "./DateFilter";
import PriceFilter from "./PriceFilter";

interface FiltersSideBarProps {
  onClose: () => void;
}

const FilterForm = ({ onClose }: FiltersSideBarProps) => {
  const searchParams = useSearchParams()!;

  const { setFilters, resetFilters, filters } = useFilterStore();
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isLoading },
    control,
  } = useForm<IFilters>({
    defaultValues: {
      date_from: filters.date_from || null,
      date_to: filters.date_to || null,
      price_min: filters.price_min || null,
      price_max: filters.price_max || null,
      sort: filters.sort || searchParams?.get("sort") || "DATE_DESC",
      category_ids:
        searchParams?.get("category_ids") || filters.category_ids || "",
      properties:
        filters.properties ||
        (() => {
          try {
            const propertiesParam = searchParams?.get("properties");
            return propertiesParam ? JSON.parse(propertiesParam) : [];
          } catch {
            return [];
          }
        })(),
    },
  });

  const { data: categoryList } = useFetch<ResponseType<ICategory[]>>(
    `${API_URL.Public.category}?page=1&per_page=100`,
  );

  const selectedCategoryId = watch("category_ids");
  const { data: categoryData, refetch } = useFetch<ResponseType<ICategory>>(
    selectedCategoryId
      ? `${API_URL.Category.Category}/${selectedCategoryId}`
      : "",
    {
      autoFetch: false,
    },
  );

  useEffect(() => {
    if (selectedCategoryId) {
      refetch();
      // Clear previous properties when category changes
      setValue("properties", []);

      // Update URL to remove old properties
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.delete("properties");
      const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
      window.history.pushState({}, "", newUrl);
    }
  }, [selectedCategoryId, refetch, setValue]);

  useEffect(() => {
    const urlFilters: Partial<IFilters> = {};

    // Get all filter parameters from URL
    const sort = searchParams?.get("sort");
    const category_ids = searchParams?.get("category_ids");
    const date_from = searchParams?.get("date_from");
    const date_to = searchParams?.get("date_to");
    const price_min = searchParams?.get("price_min");
    const price_max = searchParams?.get("price_max");
    const properties = searchParams?.get("properties");

    if (sort) urlFilters.sort = sort;
    if (category_ids) urlFilters.category_ids = category_ids;
    if (date_from) urlFilters.date_from = new Date(date_from);
    if (date_to) urlFilters.date_to = new Date(date_to);
    if (price_min) urlFilters.price_min = Number(price_min);
    if (price_max) urlFilters.price_max = Number(price_max);
    if (properties) {
      try {
        const parsedProperties = JSON.parse(properties);
        urlFilters.properties = parsedProperties;
        // Set each property value in the form
        parsedProperties.forEach(
          (prop: { property_definition_id: string; value: string }) => {
            setValue(
              `properties.${prop.property_definition_id}` as keyof IFilters,
              prop.value,
            );
          },
        );
      } catch (e) {
        console.error("Error parsing properties from URL:", e);
      }
    }

    // Update both the form and the store with URL parameters
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
  }, [searchParams, setFilters, setValue]);

  // Load initial properties from URL
  useEffect(() => {
    const properties = searchParams?.get("properties");
    if (properties) {
      try {
        const parsedProperties = JSON.parse(properties);
        parsedProperties.forEach(
          (prop: { property_definition_id: string; value: string }) => {
            setValue(
              `properties.${prop.property_definition_id}` as keyof IFilters,
              prop.value,
            );
          },
        );
      } catch (e) {
        console.error("Error parsing properties from URL:", e);
      }
    }
  }, [searchParams, setValue]);

  const categoryPropertiesInputs: IInput[] =
    categoryData?.data?.properties?.map((property) => ({
      type: property.type,
      name: `properties.${property.id}`,
      placeholder: `Enter ${property.name.toLowerCase()}`,
      validation: property.validation || undefined,
      options: property.validation?.enum?.map((option) => ({
        label: option,
        value: option,
      })),
      control,
      className: "h-10 md:h-12 bg-white text-sm font-normal",
    })) || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      date_from: formatDateToYYYYMMDD(data.date_from),
      date_to: formatDateToYYYYMMDD(data.date_to),
      category_ids: data.category_ids ? [data.category_ids] : undefined,
      properties:
        data.properties && Object.keys(data.properties).length > 0
          ? Object.entries(data.properties)
              .map(([id, value]) => ({
                property_definition_id: id,
                value: value,
              }))
              .filter(
                (prop) =>
                  prop.value !== "" &&
                  prop.value !== null &&
                  prop.value !== undefined &&
                  (!Array.isArray(prop.value) || prop.value.length > 0),
              )
          : undefined,
    };

    // Remove properties if the filtered array is empty
    if (formattedData.properties && formattedData.properties.length === 0) {
      delete formattedData.properties;
    }

    const cleanedData = cleanObject<IFilters>(formattedData);
    setFilters(cleanedData);

    // Get existing URL parameters
    const existingParams = new URLSearchParams(window.location.search);

    // Update URL with new filters while preserving existing parameters and locale
    const newUrl = buildAdvertisementUrl(
      cleanedData,
      window.location.pathname,
      existingParams,
    );
    window.history.pushState({}, "", newUrl);

    onClose();
  };

  const onCancelClick = () => {
    reset({
      date_from: null,
      date_to: null,
      price_min: null,
      price_max: null,
      sort: "DATE_DESC",
      category_ids: "",
      properties: [],
    });
    onClose();
    resetFilters();
    // Reset URL to base path while preserving locale
    window.history.pushState({}, "", window.location.pathname);
  };

  return (
    <form
      className="relative flex max-h-screen flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        {/* Sort Filter */}
        <div className="mt-2 border-b border-t-neutral-100 pb-2">
          <Accordion className="py-4" label={"Sort"}>
            <Select
              options={sortOptions}
              value={watch("sort") || "DATE_DESC"}
              onChange={(value) => setValue("sort", value as string)}
              placeholder="Sort by"
            />
          </Accordion>
        </div>

        {/* Category Filter */}
        <div className="mt-2 border-b border-t-neutral-100 pb-2">
          <Accordion className="py-4" label={"Category"}>
            <Select
              options={
                categoryList?.data.map((category) => ({
                  value: category.id.toString(),
                  label: category.name,
                })) || []
              }
              value={watch("category_ids") || ""}
              onChange={(value) => setValue("category_ids", value as string)}
              placeholder="Select category"
              isSearch
            />
          </Accordion>
        </div>

        {/* Category Properties Filter */}
        {selectedCategoryId && categoryPropertiesInputs.length > 0 && (
          <div className="mt-2 border-b border-t-neutral-100 pb-2">
            <Accordion className="py-4" label={"Category Properties"}>
              <FormContainer>
                <FormInputs
                  inputs={categoryPropertiesInputs}
                  control={control}
                  className="grid-cols-1 gap-4 py-2"
                />
              </FormContainer>
            </Accordion>
          </div>
        )}

        {/* Date Filter */}
        <div className="mt-2 border-b border-t-neutral-100 pb-2">
          <Accordion className="py-4" label={"Date"}>
            <DateFilter setValue={setValue} watch={watch} />
          </Accordion>
        </div>

        {/* Price Filter */}
        <div className="mt-2 border-b border-t-neutral-100 pb-2">
          <Accordion className="py-4" label={"Price"}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm text-neutral-900">At least</p>
                <Image
                  src={"/assets/image/Line-dashed.png"}
                  width={1}
                  height={39}
                  alt="uniq-filter"
                />
                <p className="text-sm text-neutral-900">Maximum</p>
              </div>
              <PriceFilter watch={watch} setValue={setValue} />
            </div>
          </Accordion>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bottom-10 mt-5 flex w-full items-center justify-center gap-4 py-2">
        <Button
          onClick={onCancelClick}
          type="button"
          className="h-12 w-full"
          variant="outlined"
          color="primary"
        >
          Reset
        </Button>
        <Button
          loading={isLoading}
          type="submit"
          color="primary"
          variant="contained"
          className="h-12 w-full"
        >
          Apply filter
        </Button>
      </div>
    </form>
  );
};

export default FilterForm;
