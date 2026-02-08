import { CloseSquare } from "@/components/icons/CloseSquare";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { API_URL } from "@/constants/api";
import { usePost } from "@/hooks";
import { ResponseType } from "@/types";
import { IAdvertisement } from "@/types/advertisement";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface RejectAdvertisementProps {
  advertisement: IAdvertisement | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const RejectAdvertisement = ({
  advertisement,
  isOpen,
  onClose,
  refetch,
}: RejectAdvertisementProps) => {
  const [rejectionMessage, setRejectionMessage] = useState("");

  const { loading: updateStatusLoading, execute: updateStatus } = usePost<
    ResponseType<object>,
    { status: string; rejection_msg: string }
  >(`${API_URL.Admin.Ad}/${advertisement?.id}/status`, {
    onSuccess: (data) => {
      toast.success(data.message);
      onClose();
      refetch();
      setRejectionMessage("");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleRejectAdvertisement = () => {
    updateStatus({
      status: "REJECTED",
      rejection_msg: rejectionMessage,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="rounded-lg border-2 bg-white px-4 py-4 md:px-6">
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary-700">
              Reject Advertisement
            </h3>
            <Button onClick={() => onClose()} className="bg-transparent p-0">
              <CloseSquare color="#3D3D3D" size={24} />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-neutral-900">
              Advertisement Title: {advertisement?.title}
            </p>
            <p className="text-sm text-neutral-900">
              Price: {advertisement?.price}
            </p>
          </div>

          <p className="text-center text-sm text-neutral-900">
            Are you sure you want to reject this advertisement?
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-neutral-900">
              Rejection Message
            </p>
            <TextArea
              value={rejectionMessage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setRejectionMessage(e.target.value)
              }
              className="h-32 border border-neutral-400"
              placeholder="Enter rejection reason..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                onClose();
                setRejectionMessage("");
              }}
              color="primary"
              variant="outlined"
              className="h-12 w-full"
            >
              No
            </Button>
            <Button
              onClick={handleRejectAdvertisement}
              loading={updateStatusLoading}
              disabled={!rejectionMessage.trim()}
              color="primary"
              className="h-12 w-full"
            >
              Yes, Reject
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RejectAdvertisement;
