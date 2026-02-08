import Select from "@/components/ui/Select";
import { API_URL } from "@/constants/api";
import { useFetch } from "@/hooks";
import { ResponseWithPaginationType } from "@/types";
import { AdvertisementFormData } from "@/types/advertisement";
import { ICategory } from "@/types/category";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface CategoryFormProps {
  control: Control<AdvertisementFormData>;
  errors: FieldErrors<AdvertisementFormData>;
}

const CategoryForm = ({ control, errors }: CategoryFormProps) => {
  const { data: categoryList } = useFetch<
    ResponseWithPaginationType<ICategory[]>
  >(`${API_URL.Public.category}?page=1&per_page=100`);

  const categoryOptions =
    categoryList?.data.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    })) || [];

  return (
    <div className="flex flex-col pt-4">
      <h3 className="mb-3 text-sm font-normal lg:mb-4 lg:text-base lg:font-medium">
        Category
      </h3>

      {/* Using Controller to wrap the Select component */}
      <Controller
        name="category_id"
        control={control} // Pass control from useFormContext
        rules={{ required: "Category is required" }} // Validation rules
        render={({ field }) => (
          <Select
            {...field}
            error={!!errors.category_id}
            helperText={errors.category_id?.message}
            value={field.value ? field.value.toString() : ""}
            options={categoryOptions}
            className="text-sm font-normal lg:text-base lg:font-medium"
            placeholder="Choose your category"
          />
        )}
      />
    </div>
  );
};

export default CategoryForm;
