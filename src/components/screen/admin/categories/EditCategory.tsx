import { CloseSquare, Gallery } from "@/components/icons";
import { AddImage } from "@/components/icons/AddImage";
import { Button, TextArea } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { API_URL } from "@/constants/api";
import { usePost } from "@/hooks";
import { ICategory } from "@/types/category";
import { jsonToForm } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { categorySchema } from "./validation";

interface EditCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: ICategory | null;
}

interface CategoryFormData {
  name: string;
  description: string;
  image?: File | null;
}

export const EditCategory = ({
  onClose,
  onSuccess,
  category,
}: EditCategoryProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      image: null,
    },
  });

  const { loading: editLoading, execute: editExecute } = usePost<
    { data: ICategory },
    FormData
  >(`${API_URL.Admin.Category}/${category?.id}`, {
    onSuccess: () => {
      onSuccess();
      onClose();
      reset();
      setSelectedImage(null);
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  const onSubmit = (data: CategoryFormData) => {
    const formData = jsonToForm({
      name: data.name,
      description: data.description,
    });

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    editExecute(formData);
  };

  return (
    <div className="flex h-auto flex-col gap-4 rounded-lg bg-white p-4">
      <h3 className="text-center text-xl font-bold">Edit Category</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <div className="mt-1 flex items-center">
            <div
              onClick={handleClick}
              className="relative flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-primary-700 text-primary-700 lg:h-[88px] lg:w-[88px]"
            >
              {selectedImage ? (
                <>
                  <Image
                    alt="selected"
                    src={URL.createObjectURL(selectedImage)}
                    width={88}
                    height={88}
                    className="h-full w-full rounded-full object-cover"
                  />
                  <button
                    onClick={(e) => handleRemove(e)}
                    className="absolute right-1 top-0 rounded-md bg-white p-0.5 text-xs text-white shadow-md"
                  >
                    <CloseSquare color="#ef5e5e" size={16} />
                  </button>
                </>
              ) : category?.image ? (
                <>
                  <Image
                    alt="current"
                    src={category.image}
                    width={88}
                    height={88}
                    className="h-full w-full rounded-full object-cover"
                  />
                </>
              ) : (
                <>
                  <AddImage
                    color="currentColor"
                    size={24}
                    className="lg:hidden"
                  />
                  <Gallery
                    color="currentColor"
                    size={16}
                    className="hidden lg:flex"
                  />
                  <p className="mt-2 hidden text-xs font-normal lg:flex">Add</p>
                  <p className="hidden text-xs font-normal lg:flex">Photo</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-900">
            Name <span className="text-red-500">*</span>
          </label>
          <TextInput
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            type="text"
            parent="w-full"
            className="mt-1 block w-full border border-neutral-400 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-900">
            Description <span className="text-red-500">*</span>
          </label>
          <TextArea
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            className="h-40 resize-none border border-neutral-400 bg-white text-sm font-normal md:h-52"
          />
        </div>

        <div className="flex justify-center gap-4">
          <Button
            type="submit"
            className="w-24 bg-primary-600 text-white"
            loading={editLoading}
          >
            Update
          </Button>
          <Button
            type="button"
            onClick={onClose}
            color="primary"
            variant="outlined"
            className="w-24"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
