"use client";
import { CLoseCircle } from "@/components/icons/CLoseCircle";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { useDelete } from "@/hooks";
import { ResponseType } from "@/types";
import { useTranslations } from "next-intl";
import { FC } from "react";
import toast from "react-hot-toast";
interface IRemoveAdModalProps {
  id: number;
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}
const RemoveFavoriteAdModal: FC<IRemoveAdModalProps> = ({
  onClose,
  id,
  open,
  refetch,
}) => {
  const t = useTranslations("UserProfile.FavoriteAdvertisement");
  const { loading: deleteLoading, execute: deleteExecute } = useDelete<
    ResponseType<object>,
    null
  >(`${API_URL.User.Bookmark}/${id}`, {
    onSuccess: (res) => {
      toast.success(res.message);
      refetch();
      onClose();
    },
  });

  const onRemoveBookMark = () => {
    deleteExecute();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="rounded-lg border-2 bg-white px-4 py-2 pb-4 md:px-6">
        <Button
          onClick={onClose}
          className="w-full flex-1 justify-items-start bg-transparent px-0"
        >
          <CLoseCircle color="#3D3D3D" size={24} />
        </Button>
        <h4 className="font-bold text-primary-700 lg:text-xl">
          {t("RemoveModalTitle")}
        </h4>
        <p className="mt-3 text-xs font-light text-neutral-900 lg:text-base">
          {t("ModalDescription")}
        </p>
        <div className="mt-8 flex w-full justify-between gap-6">
          <Button
            loading={deleteLoading}
            onClick={onRemoveBookMark}
            className="h-12 w-[160px] border-2 border-primary-800 bg-transparent text-primary-800 lg:w-[185px]"
          >
            {t("ModalRemoveButton")}
          </Button>
          <Button
            onClick={onClose}
            className="h-12 w-[160px] bg-primary-800 text-white lg:w-[185px]"
          >
            {t("ModalCancelButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveFavoriteAdModal;
