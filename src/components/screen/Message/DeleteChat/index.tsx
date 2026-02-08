import { CloseSquare } from "@/components/icons";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { useDelete } from "@/hooks";
import { useChatStore } from "@/store/useChatStore";
import { ResponseType } from "@/types";
import { useClearSearchParams } from "@/utils/clearSearchParams";
import toast from "react-hot-toast";

interface DeleteChatProps {
  openModal: boolean;
  onClose: () => void;
  chatId: number;
  refetchChatList: () => void;
  refetchChat: () => void;
  setSelectedChatId: (id: string | null) => void;
}

const DeleteChat = ({
  onClose,
  chatId,
  refetchChat,
  refetchChatList,
  openModal,
  setSelectedChatId,
}: DeleteChatProps) => {
  const { clearParam } = useClearSearchParams();
  const { setCurrentChatId, clearTempMessages } = useChatStore();

  const { execute, loading } = useDelete<ResponseType<object>, object>(
    `${API_URL.User.Chat.chat}/${chatId}`,
    {
      onSuccess: (res) => {
        toast.success(res.message);
        refetchChat();
        refetchChatList();
        clearParam("sellerId");
        setSelectedChatId(null);
        setCurrentChatId(null);
        clearTempMessages();
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const onDeleteChat = () => {
    execute();
  };

  return (
    <Modal className="h-auto md:w-3/5" isOpen={openModal} onClose={onClose}>
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4">
        <div
          onClick={onClose}
          className="cursor-pointer justify-items-end text-neutral-500"
        >
          <CloseSquare color="currentColor" size={22} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-center font-bold text-primary-700 md:font-bold">
            Are you sure you want to delete this chat?
          </p>

          <p className="text-center text-sm text-neutral-500">
            By deleting the chat, you will no longer be able to view these
            messages
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
            className="h-10 w-full md:h-12"
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            type="button"
            onClick={onDeleteChat}
            variant="contained"
            color="primary"
            className="h-10 w-full rounded-lg text-white md:h-12"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteChat;
