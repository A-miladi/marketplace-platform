import { CloseSquare } from "@/components/icons";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui";
import { Roles, USER_TOKEN } from "@/constants";
import { API_URL } from "@/constants/api";
import { usePost } from "@/hooks";
import { useUserInfoStore } from "@/store/useUserInfo";
import { ResponseType } from "@/types";
import { cn } from "@/utils";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

interface SwitchToCompanyResponse {
  access_token: string;
}

const SwitchToCompany = () => {
  const [openModal, setOpenModal] = useState(false);
  const t = useTranslations("UserProfile.MyProfile.SwitchToCompany");
  const { userInfo } = useUserInfoStore();

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const { execute, loading } = usePost<
    ResponseType<SwitchToCompanyResponse>,
    null
  >(API_URL.User.ConvertToCompany, {
    onSuccess: (res) => {
      Cookies.set(USER_TOKEN, res.data.access_token);
      toast.success(res.message);
      window.location.reload();
      onCloseModal();
    },

    onError: (err) => {
      toast.error(err);
    },
  });

  const onSwitchClick = () => {
    execute(null);
  };

  const isCompany = userInfo.role === Roles.COMPANY;

  return (
    <div>
      <Button
        type="button"
        onClick={() => setOpenModal(true)}
        variant="outlined"
        color="primary"
        className={cn("h-10 rounded-lg md:h-12", {
          hidden: isCompany,
        })}
      >
        {t("Button")}
      </Button>

      <Modal isOpen={openModal} onClose={onCloseModal}>
        <div className="max-w-[526px] rounded-lg border-2 bg-white px-4 py-4 md:px-6">
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center justify-end">
              <div
                onClick={onCloseModal}
                className="w-fit cursor-pointer text-neutral-500"
              >
                <CloseSquare color="currentColor" size={22} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-center text-base font-medium text-primary-700 md:text-xl md:font-bold">
                {t("Title")}
              </p>

              <p className="text-center text-xs text-neutral-900 md:text-sm">
                {t("Description")}
              </p>
            </div>

            <div className="mt-3 flex flex-col items-center gap-3 md:mt-6 md:flex-row md:gap-5">
              <Button
                onClick={onCloseModal}
                type="button"
                variant="outlined"
                color="primary"
                className="h-10 w-full rounded-lg md:h-12"
              >
                {t("Cancel")}
              </Button>

              <Button
                loading={loading}
                type="button"
                onClick={onSwitchClick}
                variant="contained"
                color="primary"
                className="h-10 w-full rounded-lg md:h-12"
              >
                {t("Accept")}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SwitchToCompany;
