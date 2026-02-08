import { Save, Save2 } from "@/components/icons";
import { CLoseCircle } from "@/components/icons/CLoseCircle";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { useDelete, usePost } from "@/hooks";
import { ResponseType } from "@/types";
import { BookMarkRequest } from "@/types/advertisement";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface BookMarkProps {
  id: number;
  is_bookmarked: boolean;
  refetch: () => void;
}

const BookMark = ({ id, is_bookmarked, refetch }: BookMarkProps) => {
  const [openModal, setOpenModal] = useState(false);

  const { execute } = usePost<ResponseType<object>, BookMarkRequest>(
    API_URL.User.Bookmark,
    {
      onSuccess: (res) => {
        toast.success(res.message);
        refetch();
      },
    },
  );

  const handleAddBookMark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    execute({
      ad_id: id,
    });
  };

  const openRemoveBookMarkModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {is_bookmarked ? (
        <div
          onClick={(e) => openRemoveBookMarkModal(e)}
          className="cursor-pointer text-neutral-950"
        >
          <Save2
            color="currentColor"
            size={24}
            className="h-5 w-5 md:h-6 md:w-6"
          />
        </div>
      ) : (
        <div
          onClick={(e) => handleAddBookMark(e)}
          className="cursor-pointer text-neutral-950"
        >
          <Save
            color="currentColor"
            size={24}
            className="h-5 w-5 md:h-6 md:w-6"
          />
        </div>
      )}

      <RemoveBookMark
        refetch={refetch}
        open={openModal}
        onClose={onCloseModal}
        id={id}
      />
    </>
  );
};

export default BookMark;

interface RemoveBookMarkProps {
  id: number;
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const RemoveBookMark = ({
  id,
  onClose,
  open,
  refetch,
}: RemoveBookMarkProps) => {
  const t = useTranslations("UserProfile.FavoriteAdvertisement");

  const { loading: deleteLoading, execute: deleteExecute } = useDelete<
    ResponseType<object>,
    null
  >(`${API_URL.User.Bookmark}/${id}`, {
    onSuccess: (res) => {
      onClose();
      toast.success(res.message);
      refetch();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onRemoveBookMark = () => {
    deleteExecute();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="rounded-lg border-2 bg-white px-4 py-2 pb-4 md:px-6">
        <div onClick={onClose} className="cursor-pointer text-neutral-500">
          <CLoseCircle color="currentColor" size={22} />
        </div>

        <h4 className="mt-3 font-bold text-primary-700 lg:text-xl">
          {t("RemoveModalTitle")}
        </h4>

        <p className="mt-3 text-xs font-light text-neutral-900 lg:text-base">
          {t("ModalDescription")}
        </p>

        <div className="mt-8 flex items-center justify-between gap-6">
          <Button
            loading={deleteLoading}
            onClick={onRemoveBookMark}
            type="button"
            variant="outlined"
            color="primary"
            className="h-10 w-full rounded-lg text-primary-800 md:h-12"
          >
            {t("ModalRemoveButton")}
          </Button>

          <Button
            onClick={onClose}
            type="button"
            variant="contained"
            color="primary"
            className="h-10 w-full rounded-lg text-white md:h-12"
          >
            {t("ModalCancelButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
