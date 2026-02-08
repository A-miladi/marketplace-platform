"use client";

import { Filter } from "@/components/icons";
import { ShieldTick } from "@/components/icons/ShieldTick";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui";
import CustomeDatePicker from "@/components/ui/CustomDatePicker";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { advertisementStatusOptions, CURRENCY_SYMBOLS } from "@/constants";
import { API_URL } from "@/constants/api";
import { sortOptions } from "@/constants/SortOptions";
import { useDelete, useFetch, usePost } from "@/hooks";
import { ResponseType, ResponseWithPaginationType } from "@/types";
import { IAdvertisement, Status } from "@/types/advertisement";
import { ICategory } from "@/types/category";
import { addCommas, buildQueryString } from "@/utils";
import Image from "next/image";
import { FC, useEffect, useReducer, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import Table from "../components/Table";
import RejectAdvertisement from "./RejectAdvertisement";

const columns = [
  "title",
  "description",
  "price",
  "status",
  "user name",
  "category name",
  "address",
  "more",
  "delete",
];

type ExtendedStatus = Status | "";

type signupEvent = {
  page?: number;
  limit?: number;
  status?: ExtendedStatus;
  price_min?: number;
  price_max?: number;
  date_from?: string;
  date_to?: string;
  category_ids?: string[];
  q?: string;
  sort?: string;
  address?: string[];
};

interface IUpdateStatus {
  status: Status;
}

const AdminAdvertisementPage: FC = () => {
  const [statusAdId, setStatusAdId] = useState<string | number | null>(null);
  const [newStatus, setNewStatus] = useState<Status>("PENDING");
  const [selectedAdvertisement, setSelectedAdvertisement] =
    useState<IAdvertisement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteAdId, setDeleteAdId] = useState<string | number | null>(null);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(true);

  const [formattedMinPrice, setFormattedMinPrice] = useState<string>("");
  const [formattedMaxPrice, setFormattedMaxPrice] = useState<string>("");
  const [tempFilterValues, setTempFilterValues] = useState<
    Omit<signupEvent, "page" | "limit">
  >({
    status: "PENDING",
    price_min: undefined,
    price_max: undefined,
    date_from: undefined,
    date_to: undefined,
    category_ids: undefined,
    q: undefined,
    sort: "DATE_DESC",
    address: undefined,
  });

  const [filterValues, setFilterValues] = useState<
    Omit<signupEvent, "page" | "limit">
  >({
    status: "PENDING",
    price_min: undefined,
    price_max: undefined,
    date_from: undefined,
    date_to: undefined,
    category_ids: undefined,
    q: undefined,
    sort: "DATE_DESC",
    address: undefined,
  });

  const [event, updateEvent] = useReducer(
    (prev: signupEvent, next: signupEvent) => {
      return { ...prev, ...next };
    },
    {
      page: 1,
      limit: 10,
    },
  );

  const { data: categoryList } = useFetch<ResponseType<ICategory[]>>(
    `${API_URL.Category.Category}`,
  );

  const getQueryString = () => {
    const queryParams = {
      page: event.page || 1,
      per_page: 10,
      ...filterValues,
    };

    // Remove status from query if it's empty (All selected)
    if (queryParams.status === "") {
      delete queryParams.status;
    }

    // Convert arrays to comma-separated strings for the API
    const processedParams: Record<string, string | number | undefined> = {};
    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        processedParams[key] = value.join(",");
      } else {
        processedParams[key] = value;
      }
    });

    return buildQueryString(processedParams);
  };

  const {
    data: advertisementList,
    loading: advertisementLoading,
    refetch: advertisementListRefetch,
  } = useFetch<ResponseWithPaginationType<IAdvertisement[]>>(
    `${API_URL.Admin.Ad}?${getQueryString()}`,
  );

  const { loading: deleteLoading, execute: deleteExecute } = useDelete(
    `${API_URL.Admin.Ad}/${deleteAdId}`,
    {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        advertisementListRefetch();
        toast.success("Advertisement deleted successfully");
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const handleDeleteConfirmation = (adId: string | number) => {
    setDeleteAdId(adId);
    setIsDeleteModalOpen(true);
  };

  const { loading: updateLoading, execute: updateStatus } = usePost<
    ResponseType<IAdvertisement>,
    IUpdateStatus
  >(`${API_URL.Admin.Ad}/${statusAdId}/status`, {
    onSuccess: (data) => {
      toast.success(data.message);
      advertisementListRefetch();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleStatusChange = (adId: number, newStatus: Status) => {
    if (newStatus === "REJECTED") {
      setSelectedAdvertisement(
        advertisementList?.data?.find((ad) => ad.id === adId) || null,
      );
      setIsRejectModalOpen(true);
    } else {
      setStatusAdId(adId);
      setNewStatus(newStatus);
    }
  };

  useEffect(() => {
    if (statusAdId) {
      updateStatus({
        status: newStatus,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusAdId, newStatus]);

  const handlePageChange = (page: number) => {
    updateEvent({ page });
  };

  const handleDeleteAdvertisement = () => {
    deleteExecute();
  };

  const handleShowImages = (advertisement: IAdvertisement) => {
    setSelectedAdvertisement(advertisement);
    setIsImagesModalOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterValues(tempFilterValues);
    updateEvent({
      page: 1,
      ...tempFilterValues,
    });
  };

  const handleRemoveFilter = () => {
    setTempFilterValues({
      status: "PENDING",
      price_min: undefined,
      price_max: undefined,
      date_from: undefined,
      date_to: undefined,
      category_ids: undefined,
      q: undefined,
      sort: "DATE_DESC",
      address: undefined,
    });
    setFilterValues({
      status: "PENDING",
      price_min: undefined,
      price_max: undefined,
      date_from: undefined,
      date_to: undefined,
      category_ids: undefined,
      q: undefined,
      sort: "DATE_DESC",
      address: undefined,
    });
    updateEvent({
      page: 1,
      status: "PENDING",
      price_min: undefined,
      price_max: undefined,
      date_from: undefined,
      date_to: undefined,
      category_ids: undefined,
      q: undefined,
      sort: "DATE_DESC",
      address: undefined,
    });
    setOpenFilter(false);
  };

  // Price formatting effects
  useEffect(() => {
    if (
      filterValues.price_min === null ||
      filterValues.price_min === undefined
    ) {
      setFormattedMinPrice("");
    } else {
      setFormattedMinPrice(addCommas(String(filterValues.price_min)));
    }
  }, [filterValues.price_min]);

  useEffect(() => {
    if (
      filterValues.price_max === null ||
      filterValues.price_max === undefined
    ) {
      setFormattedMaxPrice("");
    } else {
      setFormattedMaxPrice(addCommas(String(filterValues.price_max)));
    }
  }, [filterValues.price_max]);

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Advertisements
        </h2>
        <Button
          className="h-9 gap-2 bg-primary-600"
          onClick={() => setOpenFilter(!openFilter)}
        >
          <Filter color="#ffff" size={16} />
          Filter
        </Button>
      </div>

      {openFilter && (
        <form
          onSubmit={handleSearch}
          className="mb-4 flex w-full flex-wrap items-center justify-between gap-2 rounded-lg bg-white p-4 shadow-sm"
        >
          <div className="w-[48%] md:w-[24%]">
            <Select
              options={advertisementStatusOptions}
              value={tempFilterValues.status || "PENDING"}
              onChange={(value) =>
                setTempFilterValues((prev) => ({
                  ...prev,
                  status: value as ExtendedStatus,
                }))
              }
              placeholder="Select status"
            />
          </div>

          <div className="w-[48%] md:w-[24%]">
            <TextInput
              type="text"
              className="h-10 border border-neutral-400 bg-white md:h-12"
              placeholder="Min Price"
              value={formattedMinPrice}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                const formattedValue = addCommas(numericValue);
                setFormattedMinPrice(formattedValue);
                const rawValue = formattedValue.replace(/,/g, "");
                setTempFilterValues((prev) => ({
                  ...prev,
                  price_min: Number(rawValue) || undefined,
                }));
              }}
            />
          </div>

          <div className="w-[48%] md:w-[24%]">
            <TextInput
              type="text"
              placeholder="Max Price"
              className="h-10 border border-neutral-400 bg-white md:h-12"
              value={formattedMaxPrice}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                const formattedValue = addCommas(numericValue);
                setFormattedMaxPrice(formattedValue);
                const rawValue = formattedValue.replace(/,/g, "");
                setTempFilterValues((prev) => ({
                  ...prev,
                  price_max: Number(rawValue) || undefined,
                }));
              }}
            />
          </div>

          <div className="w-[48%] md:w-[24%]">
            <Select
              options={
                categoryList?.data.map((category) => ({
                  value: category.id.toString(),
                  label: category.name,
                })) || []
              }
              value={tempFilterValues.category_ids?.[0] || ""}
              onChange={(value) =>
                setTempFilterValues((prev) => ({
                  ...prev,
                  category_ids: [value as string],
                }))
              }
              placeholder="Select category"
              isSearch
            />
          </div>

          <div className="w-[48%] md:w-[24%]">
            <TextInput
              placeholder="Search"
              value={tempFilterValues.q || ""}
              className="h-10 border border-neutral-400 bg-white md:h-12"
              onChange={(e) =>
                setTempFilterValues((prev) => ({
                  ...prev,
                  q: e.target.value,
                }))
              }
            />
          </div>

          <div className="w-[48%] md:w-[24%]">
            <Select
              options={sortOptions}
              value={filterValues.sort || "DATE_DESC"}
              onChange={(value) =>
                setFilterValues((prev) => ({
                  ...prev,
                  sort: value as string,
                }))
              }
              placeholder="Sort by"
            />
          </div>

          <div className="w-[48%] md:w-[24%]">
            <TextInput
              placeholder="Search by city"
              value={tempFilterValues.address?.[0] || ""}
              className="h-10 border border-neutral-400 bg-white md:h-12"
              onChange={(e) =>
                setTempFilterValues((prev) => ({
                  ...prev,
                  address: e.target.value ? [e.target.value] : undefined,
                }))
              }
            />
          </div>

          <div className="w-[48%] md:w-[24%]">
            <DatePicker
              selected={
                tempFilterValues.date_from
                  ? new Date(tempFilterValues.date_from)
                  : null
              }
              dateFormat="yyyy-MM-dd"
              onChange={(date) =>
                setTempFilterValues((prev) => ({
                  ...prev,
                  date_from: date
                    ? date.toISOString().split("T")[0]
                    : undefined,
                }))
              }
              placeholderText="From Date"
              customInput={<CustomeDatePicker placeholder="From Date" />}
              popperPlacement="bottom-end"
            />
          </div>

          <div className="w-[48%] md:w-[24%]">
            <DatePicker
              selected={
                tempFilterValues.date_to
                  ? new Date(tempFilterValues.date_to)
                  : null
              }
              dateFormat="yyyy-MM-dd"
              onChange={(date) =>
                setTempFilterValues((prev) => ({
                  ...prev,
                  date_to: date ? date.toISOString().split("T")[0] : undefined,
                }))
              }
              placeholderText="To Date"
              customInput={<CustomeDatePicker placeholder="To Date" />}
            />
          </div>

          <div className="flex w-full justify-between gap-2 md:w-[24%]">
            <Button
              className="h-10 w-[48%] bg-primary-600 text-white md:w-1/2"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setFilterValues(tempFilterValues);
                updateEvent({
                  page: 1,
                  ...tempFilterValues,
                });
              }}
            >
              Search
            </Button>
            <Button
              className="h-10 w-[48%] bg-red-400 text-white md:w-1/2"
              onClick={handleRemoveFilter}
            >
              Clear
            </Button>
          </div>
        </form>
      )}

      <div className="flex max-h-[50vh] w-full flex-col justify-between overflow-x-auto overflow-y-auto pb-5">
        <Table
          loading={advertisementLoading || updateLoading}
          columns={columns}
        >
          {advertisementList?.data?.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-neutral-100 transition-colors duration-200 hover:bg-neutral-50"
            >
              <td className="max-w-[320px] truncate px-6 py-4 text-center text-xs text-neutral-900">
                {row.title}
              </td>

              <td className="max-w-[320px] truncate px-6 py-4 text-center text-xs text-neutral-900">
                {row.description}
              </td>

              <td className="truncate px-6 py-4 text-center text-xs text-neutral-900">
                {addCommas(String(row.price))}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                <Select
                  value={row.status}
                  onChange={(value: string | string[]) =>
                    handleStatusChange(row.id, value as Status)
                  }
                  options={advertisementStatusOptions}
                  placeholder="Select status"
                  className="w-32 font-normal text-neutral-900"
                  error={false}
                  helperText=""
                />
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {row.user.profile.full_name}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {row.category.name}
              </td>

              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {row.address ? row.address : ""}
              </td>

              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                <Button
                  onClick={() => handleShowImages(row)}
                  color="primary"
                  className="cursor-pointer bg-transparent text-xs text-green-700"
                >
                  Show
                </Button>
              </td>

              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                <Button
                  onClick={() => handleDeleteConfirmation(row.id)}
                  className="cursor-pointer bg-transparent text-xs text-red-600"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </Table>
        {advertisementList?.data?.length === 0 ? (
          <div className="mt-5 flex h-full w-full items-center justify-center">
            <p className="text-xs text-neutral-500">No advertisements found</p>
          </div>
        ) : (
          <Pagination
            className="mt-10"
            totalPages={advertisementList?.meta.lastPage}
            currentPage={advertisementList?.meta.currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="h-auto w-5/6 md:w-2/4"
      >
        <div className="flex h-auto flex-col gap-4 rounded-lg bg-white p-4">
          <h3 className="text-center text-xl font-bold">
            Are you sure you want to delete advertisement {deleteAdId}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleDeleteAdvertisement}
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

      {/* Images Modal */}
      <Modal
        isOpen={isImagesModalOpen}
        onClose={() => setIsImagesModalOpen(false)}
        className="h-auto w-5/6 md:w-3/4 lg:w-2/3"
      >
        <div className="flex h-auto flex-col gap-6 rounded-lg bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-neutral-900">
              {selectedAdvertisement?.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                {selectedAdvertisement?.category?.name}
              </span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                {selectedAdvertisement?.city?.name}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-xs font-medium text-neutral-500">
                  Description:
                </h4>
                <p className="text-neutral-700">
                  {selectedAdvertisement?.description}
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-medium text-neutral-500">
                  Price:
                </h4>
                <p className="font-bold text-primary-700 md:text-2xl">
                  {selectedAdvertisement?.currency
                    ? CURRENCY_SYMBOLS[selectedAdvertisement?.currency]
                    : ""}
                  {addCommas(String(selectedAdvertisement?.price))}
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-medium text-neutral-500">
                  Status:
                </h4>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    selectedAdvertisement?.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : selectedAdvertisement?.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedAdvertisement?.status}
                </span>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-medium text-neutral-500">
                  Posted by:
                </h4>
                <div className="flex items-center gap-2">
                  <p className="text-neutral-700">
                    {selectedAdvertisement?.user.profile.company_name
                      ? `${selectedAdvertisement?.user.profile.company_name} Company`
                      : selectedAdvertisement?.user?.profile?.full_name}
                  </p>

                  {selectedAdvertisement?.user.profile.is_verified && (
                    <p className="text-primary-800">
                      <ShieldTick color="currentColor" size={18} />
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-medium text-neutral-500">Images:</h4>
              <div className="grid grid-cols-3 gap-4">
                {selectedAdvertisement?.images.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative w-full overflow-hidden rounded-lg"
                  >
                    <Image
                      src={image}
                      width={200}
                      height={200}
                      alt={`Advertisement Image ${idx + 1}`}
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <RejectAdvertisement
        advertisement={selectedAdvertisement}
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        refetch={advertisementListRefetch}
      />
    </div>
  );
};

export default AdminAdvertisementPage;
