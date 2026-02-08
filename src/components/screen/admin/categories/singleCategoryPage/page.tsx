"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { API_URL } from "@/constants/api";
import { useDelete, useFetch, usePost } from "@/hooks";
import { ResponseType } from "@/types";
import { ICategory } from "@/types/category";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Table from "../../components/Table";

interface PropertyDefinition {
  id?: string;
  name: string;
  type: string;
  category_id: number;
  is_required: boolean;
  order?: number;
  validation?: {
    enum?: string[];
    multiple?: boolean;
    min?: number;
    type?: string;
  };
}

const columns = ["Name", "Type", "Required", "Order", "Actions"];

const propertyTypes = [
  { value: "SELECT", label: "Select" },
  { value: "TEXT", label: "Text" },
  { value: "NUMBER", label: "Number" },
  { value: "DATE", label: "Date" },
];

const requiredOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

const AdminSingleCategoryPage: FC<{ params: { id: string } }> = ({
  params,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePropertyId, setDeletePropertyId] = useState<string | null>(null);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [isEditPropertyModalOpen, setIsEditPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] =
    useState<PropertyDefinition | null>(null);
  const [newProperty, setNewProperty] = useState<Partial<PropertyDefinition>>({
    name: "",
    type: "SELECT",
    is_required: true,
    order: 0,
    validation: {
      enum: [],
      multiple: false,
    },
  });
  const [newOption, setNewOption] = useState("");

  const {
    data: category,
    loading,
    refetch,
  } = useFetch<ResponseType<ICategory>>(
    `${API_URL.Category.Category}/${params.id}`,
  );

  const { loading: deleteLoading, execute: deleteExecute } = useDelete(
    `${API_URL.Admin.Property}/${deletePropertyId}`,
    {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        refetch();
        toast.success("Property deleted successfully");
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const { loading: addPropertyLoading, execute: addProperty } = usePost<
    ResponseType<object>,
    PropertyDefinition
  >(`${API_URL.Admin.Property}`, {
    onSuccess: () => {
      setIsAddPropertyModalOpen(false);
      refetch();
      toast.success("Property added successfully");
      setNewProperty({
        name: "",
        type: "SELECT",
        is_required: true,
        order: 0,
        validation: {
          enum: [],
          multiple: false,
        },
      });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { loading: editPropertyLoading, execute: editProperty } = usePost<
    ResponseType<object>,
    PropertyDefinition
  >(`${API_URL.Admin.Property}/${editingProperty?.id}`, {
    onSuccess: () => {
      setIsEditPropertyModalOpen(false);
      refetch();
      toast.success("Property updated successfully");
      setEditingProperty(null);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleDeleteConfirmation = (propertyId: string) => {
    setDeletePropertyId(propertyId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProperty = () => {
    deleteExecute();
  };

  const handleAddProperty = () => {
    const order =
      newProperty.order === undefined || newProperty.order === null
        ? 0
        : newProperty.order;
    if (order < 0) {
      toast.error("Order cannot be less than 0");
      return;
    }
    addProperty({
      ...newProperty,
      order,
      category_id: Number(params.id),
    } as PropertyDefinition);
  };

  const handleEditProperty = (property: PropertyDefinition) => {
    setEditingProperty(property);
    setIsEditPropertyModalOpen(true);
  };

  const handleUpdateProperty = () => {
    if (!editingProperty) return;
    const order =
      editingProperty.order === undefined || editingProperty.order === null
        ? 0
        : editingProperty.order;
    if (order < 0) {
      toast.error("Order cannot be less than 0");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = editingProperty;
    editProperty({
      ...rest,
      order,
      category_id: Number(params.id),
    });
  };

  const handleCloseAddModal = () => {
    setIsAddPropertyModalOpen(false);
    setNewProperty({
      name: "",
      type: "SELECT",
      is_required: true,
      order: 0,
      validation: {
        enum: [],
        multiple: false,
      },
    });
    setNewOption("");
  };

  const handleCloseEditModal = () => {
    setIsEditPropertyModalOpen(false);
    setEditingProperty(null);
    setNewOption("");
  };

  const handleCancelAdd = () => {
    setNewProperty({
      name: "",
      type: "SELECT",
      is_required: true,
      order: 0,
      validation: {
        enum: [],
        multiple: false,
      },
    });
    setNewOption("");
    setIsAddPropertyModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditingProperty(null);
    setNewOption("");
    setIsEditPropertyModalOpen(false);
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
        <h2 className="font-semibold text-neutral-900 md:text-2xl">
          {category?.data?.name} Properties
        </h2>
        <Button
          className="h-9 gap-2 bg-primary-600 text-xs md:text-xs"
          onClick={() => setIsAddPropertyModalOpen(true)}
        >
          Add New Property
        </Button>
      </div>

      <div className="h-[60vh] w-full overflow-x-auto overflow-y-auto">
        <Table loading={loading} columns={columns}>
          {category?.data?.properties?.map((property, idx) => (
            <tr
              key={idx}
              className="border-b border-neutral-100 transition-colors duration-200 hover:bg-neutral-50"
            >
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {property.name}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {property.type}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {property.is_required ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {property.order}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() =>
                      handleEditProperty({
                        ...property,
                        id: property.id.toString(),
                        category_id: Number(params.id),
                      } as PropertyDefinition)
                    }
                    className="cursor-pointer bg-transparent text-xs text-primary-600"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeleteConfirmation(property.id.toString())
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
            Are you sure you want to delete this property?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleDeleteProperty}
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

      {/* Add Property Modal */}
      <Modal
        isOpen={isAddPropertyModalOpen}
        onClose={handleCloseAddModal}
        className="h-auto w-5/6 md:w-2/4"
      >
        <div className="flex h-auto flex-col gap-4 rounded-lg bg-white p-4">
          <h3 className="text-center text-xl font-bold">Add New Property</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-900">
                Name <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                value={newProperty.name}
                onChange={(e) =>
                  setNewProperty((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter a name for the property"
                className="mt-1 block w-full border border-neutral-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-900">
                Type
              </label>
              <Select
                value={newProperty.type}
                onChange={(value) =>
                  setNewProperty((prev) => ({ ...prev, type: value as string }))
                }
                options={propertyTypes}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-900">
                Required
              </label>
              <Select
                value={newProperty.is_required ? "true" : "false"}
                onChange={(value) =>
                  setNewProperty((prev) => ({
                    ...prev,
                    is_required: value === "true",
                  }))
                }
                options={requiredOptions}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-900">
                Order <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="number"
                min="0"
                value={newProperty.order ?? ""}
                onChange={(e) =>
                  setNewProperty((prev) => ({
                    ...prev,
                    order:
                      e.target.value === ""
                        ? undefined
                        : Math.max(0, parseInt(e.target.value) || 0),
                  }))
                }
                className="mt-1 block w-full border border-neutral-400 bg-white"
              />
            </div>
            {newProperty.type === "SELECT" && (
              <div>
                <label className="block text-xs font-medium text-neutral-900">
                  Options
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <TextInput
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newOption.trim()) {
                          setNewProperty((prev) => ({
                            ...prev,
                            validation: {
                              ...prev.validation,
                              enum: [
                                ...(prev.validation?.enum || []),
                                newOption.trim(),
                              ],
                            },
                          }));
                          setNewOption("");
                        }
                      }
                    }}
                    parent="w-full"
                    className="mt-1 block w-full border border-neutral-400 bg-white"
                    placeholder="Enter option and press Enter or click Add"
                  />
                  <Button
                    onClick={() => {
                      if (newOption.trim()) {
                        setNewProperty((prev) => ({
                          ...prev,
                          validation: {
                            ...prev.validation,
                            enum: [
                              ...(prev.validation?.enum || []),
                              newOption.trim(),
                            ],
                          },
                        }));
                        setNewOption("");
                      }
                    }}
                    className="h-12 w-20 whitespace-nowrap bg-primary-600 text-white"
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {newProperty.validation?.enum?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs"
                    >
                      <span>{option}</span>
                      <button
                        onClick={() => {
                          setNewProperty((prev) => ({
                            ...prev,
                            validation: {
                              ...prev.validation,
                              enum: prev.validation?.enum?.filter(
                                (_, i) => i !== index,
                              ),
                            },
                          }));
                        }}
                        className="text-neutral-500 hover:text-neutral-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newProperty.validation?.multiple || false}
                      onChange={(e) =>
                        setNewProperty((prev) => ({
                          ...prev,
                          validation: {
                            ...prev.validation,
                            multiple: e.target.checked,
                          },
                        }))
                      }
                      className="rounded border-neutral-400 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-xs text-neutral-700">
                      Allow multiple selections
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <Button
              disabled={!newProperty.name}
              onClick={handleAddProperty}
              className="w-24 bg-primary-600 text-white"
              loading={addPropertyLoading}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancelAdd}
              color="primary"
              className="w-24"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Property Modal */}
      <Modal
        isOpen={isEditPropertyModalOpen}
        onClose={handleCloseEditModal}
        className="h-auto w-5/6 md:w-2/4"
      >
        <div className="flex h-auto flex-col gap-4 rounded-lg bg-white p-4">
          <h3 className="text-center text-xl font-bold">Edit Property</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-900">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={editingProperty?.name ?? ""}
                onChange={(e) =>
                  setEditingProperty((prev) =>
                    prev ? { ...prev, name: e.target.value } : null,
                  )
                }
                className="mt-1 block w-full rounded-md border border-neutral-400 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-900">
                Type
              </label>
              <Select
                value={editingProperty?.type ?? "SELECT"}
                onChange={(value) =>
                  setEditingProperty((prev) =>
                    prev ? { ...prev, type: value as string } : null,
                  )
                }
                options={propertyTypes}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-900">
                Required
              </label>
              <Select
                value={editingProperty?.is_required ? "true" : "false"}
                onChange={(value) =>
                  setEditingProperty((prev) =>
                    prev ? { ...prev, is_required: value === "true" } : null,
                  )
                }
                options={requiredOptions}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-900">
                Order <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={editingProperty?.order ?? ""}
                onChange={(e) =>
                  setEditingProperty((prev) =>
                    prev
                      ? {
                          ...prev,
                          order:
                            e.target.value === ""
                              ? undefined
                              : Math.max(0, parseInt(e.target.value) || 0),
                        }
                      : null,
                  )
                }
                className="mt-1 block w-full rounded-md border border-neutral-400 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
              />
            </div>
            {editingProperty?.type === "SELECT" && (
              <div>
                <label className="block text-xs font-medium text-neutral-900">
                  Options
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newOption.trim() && editingProperty) {
                          setEditingProperty((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  validation: {
                                    ...prev.validation,
                                    enum: [
                                      ...(prev.validation?.enum || []),
                                      newOption.trim(),
                                    ],
                                  },
                                }
                              : null,
                          );
                          setNewOption("");
                        }
                      }
                    }}
                    className="block h-10 w-full rounded-md border border-neutral-400 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    placeholder="Enter option and press Enter or click Add"
                  />
                  <Button
                    onClick={() => {
                      if (newOption.trim() && editingProperty) {
                        setEditingProperty((prev) =>
                          prev
                            ? {
                                ...prev,
                                validation: {
                                  ...prev.validation,
                                  enum: [
                                    ...(prev.validation?.enum || []),
                                    newOption.trim(),
                                  ],
                                },
                              }
                            : null,
                        );
                        setNewOption("");
                      }
                    }}
                    className="h-10 whitespace-nowrap bg-primary-600 text-white"
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {editingProperty?.validation?.enum?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs"
                    >
                      <span>{option}</span>
                      <button
                        onClick={() => {
                          setEditingProperty((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  validation: {
                                    ...prev.validation,
                                    enum: prev.validation?.enum?.filter(
                                      (_, i) => i !== index,
                                    ),
                                  },
                                }
                              : null,
                          );
                        }}
                        className="text-neutral-500 hover:text-neutral-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingProperty?.validation?.multiple || false}
                      onChange={(e) =>
                        setEditingProperty((prev) =>
                          prev
                            ? {
                                ...prev,
                                validation: {
                                  ...prev.validation,
                                  multiple: e.target.checked,
                                },
                              }
                            : null,
                        )
                      }
                      className="rounded border-neutral-400 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-xs text-neutral-700">
                      Allow multiple selections
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <Button
              disabled={!editingProperty?.name}
              onClick={handleUpdateProperty}
              className="w-24 bg-primary-600 text-white"
              loading={editPropertyLoading}
            >
              Update
            </Button>
            <Button
              onClick={handleCancelEdit}
              color="secondary"
              className="w-24 bg-neutral-400 text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminSingleCategoryPage;
