"use client";

import { Add } from "@/components/icons/Add";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { PageUrls } from "@/constants/PageUrls";
import { useDelete, useFetch } from "@/hooks";
import { useRouter } from "@/i18n/routing";
import { ICategory } from "@/types/category";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import Table from "../components/Table";
import { AddCategory } from "./AddCategory";
import { EditCategory } from "./EditCategory";

const columns = ["ID", "Name", "Description", "Image", "Actions"];

const CategoriesPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );

  const {
    data: categories,
    loading,
    refetch,
  } = useFetch<{ data: ICategory[] }>(API_URL.Category.Category);

  const { loading: deleteLoading, execute: deleteExecute } = useDelete(
    `${API_URL.Admin.Category}/${deleteCategoryId}`,
    {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        refetch();
        toast.success("Category deleted successfully");
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const handleDeleteConfirmation = (categoryId: string) => {
    setDeleteCategoryId(categoryId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCategory = () => {
    deleteExecute();
  };

  const handleEditCategory = (category: ICategory) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const router = useRouter();

  const handleViewCategory = (category: ICategory) => {
    router.push(`${PageUrls.AdminRoutes.categories}/${category.id}`);
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
        <h2 className="font-semibold text-neutral-900 md:text-2xl">
          Categories
        </h2>
        <Button
          className="h-9 gap-2 bg-primary-600 text-xs md:text-xs"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Add color="#fff" size={24} />
          Add New Category
        </Button>
      </div>

      <div className="h-[60vh] w-full overflow-x-auto overflow-y-auto">
        <Table loading={loading} columns={columns}>
          {categories?.data?.map((category) => (
            <tr
              key={category.id}
              className="border-b border-neutral-100 transition-colors duration-200 hover:bg-neutral-50"
            >
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {category.id}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {category.name}
              </td>
              <td className="max-w-[200px] px-6 py-4 text-center text-xs text-neutral-900">
                {category.description}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {category.image ? (
                  <Image
                    width={180}
                    height={180}
                    src={category.image}
                    alt={category.name}
                    className="mx-auto h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => handleViewCategory(category)}
                    className="cursor-pointer bg-transparent text-xs text-primary-600"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleEditCategory(category)}
                    className="cursor-pointer bg-transparent text-xs text-primary-600"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeleteConfirmation(category.id.toString())
                    }
                    className="cursor-pointer bg-transparent text-xs text-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="h-auto w-5/6 md:w-2/4"
      >
        <div className="flex h-auto flex-col gap-4 rounded-lg bg-white p-4">
          <h3 className="text-center text-xl font-bold">
            Are you sure you want to delete this category?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleDeleteCategory}
              className="w-24 bg-red-600 text-white"
              loading={deleteLoading}
            >
              Delete
            </Button>
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              color="secondary"
              className="w-24 bg-neutral-400 text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        className="h-auto w-5/6 md:w-2/4"
      >
        <AddCategory
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={refetch}
        />
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCategory(null);
        }}
        className="h-auto w-5/6 md:w-2/4"
      >
        <EditCategory
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCategory(null);
          }}
          onSuccess={refetch}
          category={editingCategory}
        />
      </Modal>
    </div>
  );
};

export default CategoriesPage;
