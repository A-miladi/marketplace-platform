import { Profile, VerticalDots } from "@/components/icons";
import { Delete } from "@/components/icons/Delete";
import { Button } from "@/components/ui";
import { useOutSideClick } from "@/hooks";
import { Chat } from "@/types/chat";
import { cn, truncateText } from "@/utils";
import Image from "next/image";
import React, { RefObject, useRef, useState } from "react";
import DeleteChat from "../DeleteChat";

interface IMessageCardProps {
  chat: Chat;
  isSelected: boolean;
  refetchChatList: () => void;
  onClick: () => void;
  setSelectedChatId: (id: string | null) => void;
}

const MessageCard: React.FC<IMessageCardProps> = ({
  chat,
  isSelected,
  refetchChatList,
  onClick,
  setSelectedChatId,
}) => {
  const [openCardModal, setOpenCardModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useOutSideClick(ref as RefObject<HTMLDivElement>, () =>
    setOpenCardModal(false),
  );

  const handleDeleteChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    chatId: string,
  ) => {
    e.stopPropagation();
    setSelectedChatId(chatId);
    setShowDeleteModal(true);
    setOpenCardModal(false);
  };

  const handleOpenCard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setOpenCardModal(true);
  };

  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <div
      className={cn(
        "h-24 w-full cursor-pointer rounded-xl border border-neutral-100 p-3",
        {
          "border-2 border-primary-700": isSelected,
        },
      )}
      onClick={onClick}
    >
      <div className="flex gap-3">
        {chat.user.avatar ? (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border bg-neutral-50 text-neutral-400">
            <Image
              src={chat.user.avatar}
              alt="profile"
              width={56}
              height={56}
              className="flex-shrink-0 rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border bg-neutral-50 text-neutral-400">
            <Profile color="currentColor" size={24} />
          </div>
        )}

        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex w-full items-center justify-between gap-3">
              <h1 className="text-sm font-medium">{chat.user.full_name}</h1>
              <div className="relative">
                <Button
                  className="h-6 w-6 rounded-full bg-transparent hover:bg-neutral-50"
                  onClick={(e) => handleOpenCard(e)}
                >
                  <VerticalDots color="#3D3D3D" />
                </Button>
                {openCardModal && (
                  <div
                    ref={ref}
                    className="rounded-t-r absolute right-3 top-6 flex w-[160px] flex-col gap-2 rounded-l-xl rounded-br-xl bg-white p-1 shadow-custom_shadow"
                  >
                    <Button
                      className="flex h-full w-full items-start bg-transparent py-1 text-sm font-normal text-neutral-900 transition-colors duration-200 hover:bg-neutral-50 hover:text-red-500"
                      onClick={(e) => handleDeleteChat(e, chat.id)}
                    >
                      <Delete size={20} color="currentColor" />
                      <p>Delete Chat</p>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
              <p className="overflow-hidden truncate text-sm text-neutral-400">
                {truncateText(lastMessage?.text, 45) || "No messages yet"}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-end mt-2 gap-2">
            <p className="text-xs text-neutral-400">
              {new Date(
                lastMessage?.created_at || chat.created_at,
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteChat
          openModal={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedChatId(null);
          }}
          setSelectedChatId={setSelectedChatId}
          chatId={parseInt(chat.id)}
          refetchChatList={refetchChatList}
          refetchChat={() => {}} // Add your chat refetch function here if needed
        />
      )}
    </div>
  );
};

export default MessageCard;
