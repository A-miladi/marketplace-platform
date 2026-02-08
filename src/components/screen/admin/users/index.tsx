"use client";

import { Filter } from "@/components/icons";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { API_URL } from "@/constants/api";
import { userStatusOptions } from "@/constants/Status";
import { useFetch, usePost } from "@/hooks";
import { ResponseType, ResponseWithPaginationType } from "@/types";
import { IUserInfo } from "@/types/admin";
import { ProfileStatus, User, UserRole } from "@/types/user";
import { buildQueryString } from "@/utils";
import { FC, useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import Table from "../components/Table";
import UserDetails from "../components/UserDetails";
import ApproveCompany from "./ApproveCompany";
import CompanyDetails from "./CompanyDetails";
import RejectCompany from "./RejectionCompany";

const columns = [
  "first name ",
  "last name",
  "role",
  "phone",
  "email",
  "status",
  "company status",
];

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "USER", label: "User" },
  { value: "COMPANY", label: "Company" },
];

type signupEvent = {
  page?: number;
  limit?: number;
  email?: string;
  search?: string;
  country?: string;
  city?: string;
  role?: UserRole;
  status?: ProfileStatus[];
};

interface IUpdateStatus {
  status: ProfileStatus;
}

const Users: FC = () => {
  const [isShowModal, setIsShowModal] = useState<IUserInfo | null>(null);
  const [openFilter, setOpenFilter] = useState(true);
  const [newStatus, setNewStatus] = useState<ProfileStatus>("PENDING");
  const [userId, setUserId] = useState<string | number | null>(null);

  const [selectedCompany, setSelectedCompany] = useState<User | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  const [filterValues, setFilterValues] = useState<
    Omit<signupEvent, "page" | "limit">
  >({
    email: undefined,
    role: undefined,
    search: undefined,
    status: undefined,
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

  const getQueryString = () => {
    const queryParams = {
      page: event.page || 1,
      per_page: 10,
      email: event.email,

      role: event.role,
      search: event.search,
    };

    // Add status parameters separately
    const statusParams =
      event.status?.map((status) => `status=${status}`).join("&") || "";

    return (
      buildQueryString(queryParams) + (statusParams ? `&${statusParams}` : "")
    );
  };

  const {
    data: usersLists,
    loading: usersListsLoading,
    refetch: usersRefetch,
  } = useFetch<ResponseWithPaginationType<User[]>>(
    `${API_URL.Admin.User}?${getQueryString()}`,
    {},
  );

  const handlePageChange = (page: number) => {
    updateEvent({ page });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent({
      page: 1,
      ...filterValues,
    });
  };

  const handleRemoveFilter = () => {
    setFilterValues({
      email: undefined,
      role: undefined,
      search: undefined,
      status: undefined,
    });
    updateEvent({
      page: 1,
      email: undefined,
      role: undefined,
      search: undefined,
      status: undefined,
    });
    setOpenFilter(false);
  };

  const handleStatusChange = (userId: number, newStatus: ProfileStatus) => {
    setNewStatus(newStatus);
    setUserId(userId);
  };

  const { loading: updateStatusLoading, execute: updateStatus } = usePost<
    ResponseType<object>,
    IUpdateStatus
  >(`${API_URL.Admin.User}/${userId}/status`, {
    onSuccess: (data) => {
      toast.success(data.message);
      usersRefetch();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onOpenApproveModal = (company: User) => {
    setSelectedCompany(company);
    setShowApproveModal(true);
  };

  const onOpenRejectModal = (company: User) => {
    setSelectedCompany(company);
    setShowRejectModal(true);
  };

  const onOpenCompanyDetails = (company: User) => {
    setSelectedCompany(company);
    setShowCompanyDetails(true);
  };

  useEffect(() => {
    if (userId) {
      updateStatus({
        status: newStatus,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, newStatus]);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
        <h2 className="text-2xl font-semibold text-neutral-900">Users</h2>
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
          className="mb-4 flex w-full flex-wrap items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
        >
          <TextInput
            name="search"
            placeholder="Search by name"
            className="h-9 w-full rounded-md border border-neutral-400 bg-white px-2 focus:border-2"
            parent="w-[48%] md:w-[24%]"
            value={filterValues.search || ""}
            onChange={(e) =>
              setFilterValues((prev) => ({ ...prev, search: e.target.value }))
            }
          />
          <TextInput
            name="email"
            placeholder="Search by email"
            className="h-9 w-full rounded-md border border-neutral-400 bg-white px-2 focus:border-2"
            parent="w-[48%] md:w-[24%]"
            value={filterValues.email || ""}
            onChange={(e) =>
              setFilterValues((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <div className="w-[48%] md:w-[24%]">
            <Select
              options={roleOptions}
              value={filterValues.role || ""}
              onChange={(value) =>
                setFilterValues((prev) => ({
                  ...prev,
                  role: (value as UserRole) || undefined,
                }))
              }
              placeholder="Select role"
              className="border-neutral-50 outline-neutral-50"
            />
          </div>
          <div className="w-[48%] md:w-[24%]">
            <Select
              options={[
                { value: "all", label: "All Statuses" },
                { value: "VERIFIED", label: "Verified" },
                { value: "BLOCKED", label: "Blocked" },
                { value: "PENDING", label: "Pending" },
              ]}
              value={
                filterValues.status?.length === 2
                  ? "all"
                  : filterValues.status?.[0] || "all"
              }
              onChange={(value) =>
                setFilterValues((prev) => ({
                  ...prev,
                  status:
                    value === "all" ? undefined : [value as ProfileStatus],
                }))
              }
              placeholder="Select status"
              className="border-neutral-50 outline-neutral-50"
            />
          </div>
          <div className="flex w-full justify-between gap-2 md:w-[24%]">
            <Button
              className="w-[48%] bg-primary-600 text-white md:h-12 md:w-1/2"
              type="submit"
            >
              Search
            </Button>
            <Button
              className="w-[48%] bg-red-400 text-white md:h-12 md:w-1/2"
              onClick={handleRemoveFilter}
            >
              Clear
            </Button>
          </div>
        </form>
      )}

      <div className="h-[50vh] w-full overflow-x-auto overflow-y-auto">
        <Table
          loading={usersListsLoading || updateStatusLoading}
          columns={columns}
        >
          {usersLists?.data?.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-neutral-100 transition-colors duration-200 hover:bg-neutral-50"
            >
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {row.profile?.first_name}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {row.profile?.last_name}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {row.role}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {row.phone_number ? row.phone_number : "-"}
              </td>
              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {row.email ? row.email : "-"}
              </td>
              <td className="px-6 py-2 text-center text-xs md:text-xs">
                {row.profile.status === "PENDING" ? (
                  <span className="text-yellow-600">Profile not completed</span>
                ) : (
                  <Select
                    value={row.profile.status}
                    onChange={(value: string | string[]) =>
                      handleStatusChange(row.id, value as ProfileStatus)
                    }
                    options={userStatusOptions}
                    placeholder="Select status"
                    className="w-32 font-normal text-neutral-900"
                    error={false}
                    helperText=""
                  />
                )}
              </td>

              <td className="px-6 py-4 text-center text-xs text-neutral-900">
                {row.role === "COMPANY" ? (
                  !row.profile?.company_name ? (
                    <span className="text-yellow-600">
                      Company profile not completed
                    </span>
                  ) : (
                    <Button
                      onClick={() => onOpenCompanyDetails(row)}
                      color="primary"
                      className="h-12 w-3/4 text-xs"
                      variant="outlined"
                    >
                      View Detail
                    </Button>
                  )
                ) : (
                  "Not a company"
                )}
              </td>
            </tr>
          ))}
        </Table>
        <div className="my-4 flex justify-center">
          <Pagination
            currentPage={event.page || 1}
            totalPages={usersLists?.meta?.lastPage || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {isShowModal && (
        <Modal isOpen={!!isShowModal} onClose={() => setIsShowModal(null)}>
          <UserDetails
            userInfo={isShowModal}
            onClose={() => setIsShowModal(null)}
          />
        </Modal>
      )}

      <CompanyDetails
        company={selectedCompany}
        isOpen={showCompanyDetails}
        onClose={() => setShowCompanyDetails(false)}
        onApprove={() => {
          setShowCompanyDetails(false);
          onOpenApproveModal(selectedCompany!);
        }}
        onReject={() => {
          setShowCompanyDetails(false);
          onOpenRejectModal(selectedCompany!);
        }}
      />

      <ApproveCompany
        company={selectedCompany}
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        refetch={usersRefetch}
      />
      <RejectCompany
        company={selectedCompany}
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        refetch={usersRefetch}
      />
    </div>
  );
};

export default Users;
