import { CloseSquare } from "@/components/icons/CloseSquare";
import { Tick } from "@/components/icons/Tick";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/Button";
import { CompanyProfile, User } from "@/types/user";

interface CompanyDetailsProps {
  company: User | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const CompanyDetails = ({
  company,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: CompanyDetailsProps) => {
  if (!company) return null;

  const profile = company.profile as CompanyProfile;
  const extraData =
    typeof profile.extra_data === "string"
      ? JSON.parse(profile.extra_data)
      : profile.extra_data;

  const renderActionButtons = () => {
    if (profile.is_verified === null) {
      return (
        <>
          <Button
            onClick={onReject}
            color="primary"
            variant="outlined"
            className="h-12 w-full md:w-32"
          >
            Reject
          </Button>
          <Button
            onClick={onApprove}
            color="primary"
            className="h-12 w-full md:w-32"
          >
            Approve
          </Button>
        </>
      );
    }

    if (profile.is_verified) {
      return (
        <>
          <Button
            className="h-12 w-full cursor-text border-green-500 text-green-500 md:w-32"
            variant="outlined"
          >
            Verified <Tick color="currentColor" size={16} />
          </Button>
          <Button
            onClick={onReject}
            color="primary"
            variant="outlined"
            className="h-12 w-full md:w-32"
          >
            Reject
          </Button>
        </>
      );
    }

    return (
      <>
        <Button
          className="h-12 w-full cursor-text border-red-500 text-red-500 md:w-32"
          variant="outlined"
        >
          Rejected
        </Button>
        <Button
          onClick={onApprove}
          color="primary"
          className="h-12 w-full md:w-32"
        >
          Approve
        </Button>
      </>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-3xl rounded-lg border-2 bg-white p-6">
        <div className="flex w-full flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-primary-700">
              Company Details
            </h3>
            <Button onClick={onClose} className="bg-transparent p-0">
              <CloseSquare color="#3D3D3D" size={24} />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="mb-1 text-sm font-medium text-neutral-500">
                  Company Name
                </h4>
                <p className="text-base text-neutral-900">
                  {profile.company_name}
                </p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-neutral-500">
                  Contact Person
                </h4>
                <p className="text-base text-neutral-900">{`${profile.first_name} ${profile.last_name}`}</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-neutral-500">
                  Job Title
                </h4>
                <p className="text-base text-neutral-900">{profile.role}</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-neutral-500">
                  Email
                </h4>
                <p className="text-base text-neutral-900">{company.email}</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-neutral-500">
                  Phone
                </h4>
                <p className="text-base text-neutral-900">
                  {company.phone_number || "-"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-1 text-sm font-medium text-neutral-500">
                  Address
                </h4>
                <p className="text-base text-neutral-900">{profile.address}</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-neutral-500">
                  Zip Code
                </h4>
                <p className="text-base text-neutral-900">{profile.zip_code}</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-neutral-500">
                  Side
                </h4>
                <p className="text-base text-neutral-900">{profile.side}</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-neutral-500">
                  Brand Priority
                </h4>
                <p className="text-base text-neutral-900">
                  {extraData?.brand_priority || "-"}
                </p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-neutral-500">
                  Budget
                </h4>
                <p className="text-base text-neutral-900">
                  {extraData?.budget || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:justify-end">
            {renderActionButtons()}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CompanyDetails;
