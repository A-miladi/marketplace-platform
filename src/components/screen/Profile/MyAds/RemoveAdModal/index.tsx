"use client";
import { CloseSquare } from "@/components/icons";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { useDelete } from "@/hooks";
import { ResponseType } from "@/types";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { toast } from "react-hot-toast";

interface IRemoveAdModalProps {
  onClose: (isOpen: boolean) => void;
  refetch: () => void;
  adId: number;
}

const RemoveAdModal: FC<IRemoveAdModalProps> = ({ onClose, refetch, adId }) => {
  const t = useTranslations("UserProfile.MyAds");

  const { execute, loading } = useDelete<ResponseType<object>, null>(
    `${API_URL.User.Ad}/${adId}`,
    {
      onSuccess: (res) => {
        toast.success(res.message);
        refetch();
        onClose(false);
      },
      onError: (err) => {
        toast.error(err);
      },
    },
  );

  const handleDelete = () => {
    execute();
  };

  return (
    <Modal isOpen={true} onClose={() => onClose(false)}>
      <div className="rounded-lg border-2 bg-white px-4 py-2 pb-4 md:px-6">
        <Button
          onClick={() => onClose(false)}
          className="w-full flex-1 justify-items-end bg-transparent px-0"
        >
          <CloseSquare color="#3D3D3D" size={24} />
        </Button>
        <h4 className="font-bold text-center text-primary-700 lg:text-xl">
          {t("RemoveModalTitle")}
        </h4>
        <p className="mt-3 text-center text-xs font-light text-neutral-900 lg:text-base">
          {t("ModalDescription")}
        </p>
        <div className="mt-8 flex w-full justify-between gap-6">
          <Button
            loading={loading}
            onClick={handleDelete}
            className="h-12 w-full min-w-[160px] border-2 border-primary-800 bg-transparent text-primary-800 "
          >
            {t("ModalRemoveButton")}
          </Button>
          <Button
            onClick={() => onClose(false)}
            className="h-12 w-full min-w-[160px] bg-primary-800 text-white "
          >
            {t("ModalCancelButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveAdModal;
