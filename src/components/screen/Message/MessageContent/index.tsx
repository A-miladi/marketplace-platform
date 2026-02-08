"use client";
import { Profile, Send } from "@/components/icons";
import { Button } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { API_URL } from "@/constants/api";
import { useFetch, usePost } from "@/hooks";
import { useChatStore } from "@/store/useChatStore";
import { useUserInfoStore } from "@/store/useUserInfo";
import { ResponseType, ResponseWithPaginationType } from "@/types";
import { Chat, NewMessageRequest } from "@/types/chat";
import { cn } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import DeleteChat from "../DeleteChat";

const messageSchema = yup.object().shape({
  message: yup
    .string()
    .required("Message is required")
    .min(1, "Message cannot be empty")
    .max(350, "Message is too long"),
});

type MessageFormData = {
  message: string;
};

interface MessageContentProps {
  chatId: string;
  sellerId?: string | null;
  refetchChatList: () => void;
  setSelectedChatId: (id: string | null) => void;
}

const MessageContent = ({
  chatId,
  sellerId,
  refetchChatList,
  setSelectedChatId,
}: MessageContentProps) => {
  const { userInfo } = useUserInfoStore();
  const { tempMessages, addTempMessage, tempSellerInfo } = useChatStore();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: yupResolver(messageSchema),
  });

  // this is where we get single chat
  const {
    data: chats,
    loading,
    refetch: refetchChats,
  } = useFetch<ResponseWithPaginationType<Chat[]>>(
    `${API_URL.User.Chat.chat}/${chatId}`,
    {
      autoFetch: false,
    },
  );

  useEffect(() => {
    if (chatId && chatId !== "new") {
      refetchChats();
    }
  }, [chatId, refetchChats]);

  useEffect(() => {
    if (chatId !== "new") {
      const intervalId = setInterval(() => {
        refetchChats();
      }, 10000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [refetchChats, chatId]);

  const { execute: sendMessage, loading: sendMessageLoading } = usePost<
    ResponseType<object>,
    NewMessageRequest
  >(`${API_URL.User.Chat.chat}`, {
    onSuccess: () => {
      if (chatId === "new") {
        refetchChatList();
      } else {
        refetchChats();
      }

      reset({
        message: "",
      });
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });

  const onSubmit = (data: MessageFormData) => {
    if (chatId === "new" && sellerId) {
      // For new chat, add message to temp state
      const newMessage = {
        id: Date.now(), // Temporary ID
        text: data.message,
        sender_id: userInfo.id,
        created_at: new Date().toISOString(),
        read_at: null,
      };
      addTempMessage(newMessage);
      reset({ message: "" });

      // Send message to create new chat
      sendMessage({
        text: data.message,
        chat_user_id: Number(sellerId),
      });
    } else {
      // For existing chat
      sendMessage({
        text: data.message,
        chat_user_id: chats?.data[0].user.id as number,
      });
    }
  };

  const messagesToDisplay =
    chatId === "new" ? tempMessages : chats?.data[0]?.messages;
  const userToDisplay =
    chatId === "new" ? tempSellerInfo : chats?.data[0]?.user;

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            {userToDisplay?.avatar ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border text-neutral-400">
                <Image
                  alt=""
                  width={800}
                  height={800}
                  src={userToDisplay.avatar as string}
                  className="h-8 w-8 rounded-full"
                />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border text-neutral-400">
                <Profile color="currentColor" size={16} />
              </div>
            )}
            <div className="flex flex-col">
              <p className="text-sm font-normal text-neutral-950 md:text-base md:font-medium">
                {userToDisplay?.full_name || "New Chat"}
              </p>
              <p className="text-xs text-neutral-400">
                {chatId === "new"
                  ? dayjs().format("DD MMMM YYYY")
                  : chats?.data[0]?.created_at &&
                    dayjs(chats?.data[0]?.created_at).format("DD MMMM YYYY")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[26px] flex max-h-[492px] min-h-[330px] w-full flex-col justify-start gap-5 overflow-auto pr-2 md:max-h-[592px]">
          {messagesToDisplay?.map((item, idx) => {
            const isSenderMessage = item.sender_id === userInfo.id;
            return (
              <div
                key={idx}
                className={cn("flex w-fit max-w-[80%] items-start px-3 py-2", {
                  "ml-auto rounded-l-lg rounded-tr-lg bg-primary-700 text-white":
                    isSenderMessage,
                  "rounded-r-lg rounded-tl-lg bg-neutral-50 text-neutral-900":
                    !isSenderMessage,
                })}
              >
                <div className="flex flex-col gap-1">
                  <p className="break-words text-sm">{item.text}</p>
                  <p
                    className={cn("text-xs", {
                      "text-white/70": isSenderMessage,
                      "text-neutral-400": !isSenderMessage,
                    })}
                  >
                    {new Date(item.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex items-center border-t pb-1 pt-3"
        >
          <TextInput
            {...register("message")}
            error={!!errors.message}
            parent="w-full"
            className="flex h-14 w-full resize-none items-center rounded-r-none border-r-0 bg-neutral-50"
            placeholder="Write your message"
          />
          <Button
            loading={sendMessageLoading || loading}
            type="submit"
            variant="contained"
            className="h-14 w-14 rounded-l-none bg-neutral-300 text-neutral-600 transition-colors duration-200 hover:bg-primary-700 hover:text-white"
          >
            <Send color="currentColor" />
          </Button>
        </form>
        {!!errors.message && (
          <p className="text-xs text-red-500">{errors.message?.message}</p>
        )}
      </div>

      {chatId !== "new" && (
        <DeleteChat
          openModal={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          chatId={Number(chatId)}
          refetchChatList={refetchChatList}
          refetchChat={refetchChats}
          setSelectedChatId={setSelectedChatId}
        />
      )}
    </div>
  );
};

export default MessageContent;
