/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormContainer, FormInputs } from "@/components/Form";
import { Spinner } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { ResponseType } from "@/types";
import { ICategory } from "@/types/category";
import { IInput } from "@/types/Forms";
import { cn } from "@/utils";
import { useEffect } from "react";
import { Control } from "react-hook-form";

interface CategoryPropertiesFormProps {
  categoryId: number | null;
  control: Control<any>;
  errors: any;
  existingProperties?: Record<number, string | number>;
}

const CategoryPropertiesForm = ({
  categoryId,
  control,
  errors,
  existingProperties,
}: CategoryPropertiesFormProps) => {
  const {
    data: categoryData,
    refetch,
    loading,
  } = useFetch<ResponseType<ICategory>>(
    categoryId ? `${API_URL.Category.Category}/${categoryId}` : "",
    {
      autoFetch: false,
    },
  );

  useEffect(() => {
    if (categoryId) {
      refetch();
    }
  }, [categoryId, refetch]);

  if (!categoryData?.data?.properties) return null;

  const inputs: IInput[] = categoryData.data.properties.map((property) => ({
    type: property.type,
    name: `properties.${property.id}`,
    label: property.name,
    placeholder: `Enter ${property.name.toLowerCase()}`,
    is_required: property.is_required,
    validation: property.validation || undefined,
    options: property.validation?.enum?.map((option) => ({
      label: option,
      value: option,
    })),
    control,
    className: "h-10 md:h-12 bg-white text-sm font-normal",
    defaultValue: existingProperties?.[property.id] || undefined,
  }));

  return (
    <div
      className={cn("flex flex-col gap-4 pt-4", {
        "pt-0": !categoryData.data.properties.length,
      })}
    >
      {loading ? (
        <div className="my-3">
          <Spinner />
        </div>
      ) : (
        <FormContainer errors={errors}>
          <FormInputs
            inputs={inputs}
            control={control}
            className="grid-cols-1 gap-4"
          />
        </FormContainer>
      )}
    </div>
  );
};

export default CategoryPropertiesForm;
