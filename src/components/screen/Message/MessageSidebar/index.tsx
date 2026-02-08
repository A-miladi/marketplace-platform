"use client";
import { MessageCardSkeleton } from "@/components/Skeletons";
import { Chat } from "@/types/chat";
import { useClearSearchParams } from "@/utils/clearSearchParams";
import Image from "next/image";
import { useState } from "react";
import MessageCard from "../MessageCard";

type MessageStatus = "UNREAD" | "READ";

interface MessageSidebarProps {
  refetchChatList: () => void;
  chatList: Chat[];
  loading: boolean;
  onSelectChat: (chatId: string) => void;
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
}

function MessageSidebar({
  refetchChatList,
  chatList,
  loading,
  onSelectChat,
  selectedChatId,
  setSelectedChatId,
}: MessageSidebarProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<MessageStatus>("UNREAD");

  const { clearParam } = useClearSearchParams();

  const filteredChats =
    chatList?.filter((chat) => {
      const lastMessage = chat.messages[chat.messages.length - 1];
      if (activeTab === "UNREAD") {
        return lastMessage?.read_at === null;
      } else {
        return lastMessage?.read_at !== null;
      }
    }) || [];

  const onChatClick = (id: string) => {
    clearParam("sellerId");
    onSelectChat(id);
  };

  return (
    <div>
      {/* <div className="flex w-full gap-6 border-b-2 border-neutral-100 bg-transparent lg:gap-12">
        <Button
          onClick={() => setActiveTab("UNREAD")}
          className={`rounded-none bg-transparent px-0 ${
            activeTab === "UNREAD"
              ? "border-b border-primary-700 text-primary-700"
              : "text-neutral-950"
          }`}
        >
          Unread messages
        </Button>

        <Button
          onClick={() => setActiveTab("READ")}
          className={`rounded-none bg-transparent px-0 ${
            activeTab === "READ"
              ? "border-b border-primary-700 text-primary-700"
              : "text-neutral-950"
          }`}
        >
          Read messages
        </Button>
      </div> */}
      <div className=" flex max-h-[704px] flex-col gap-4 overflow-auto ">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <MessageCardSkeleton key={idx} />
          ))
        ) : filteredChats.length === 0 ? (
          <div className="mt-10 flex h-[40vh] flex-col items-center justify-center gap-4">
            <Image
              src="/assets/image/comment.png"
              width={188}
              height={188}
              alt="messages"
              className="h-[108px] w-[108px] md:h-[188px] md:w-[188px]"
            />
            <p className="font-bold text-neutral-300">
              There is no message to display
            </p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <MessageCard
              key={chat.id}
              chat={chat}
              isSelected={selectedChatId === chat.id}
              refetchChatList={refetchChatList}
              onClick={() => onChatClick(chat.id)}
              setSelectedChatId={setSelectedChatId}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MessageSidebar;
