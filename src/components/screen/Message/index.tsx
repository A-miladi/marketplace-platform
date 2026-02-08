"use client";
import { ArrowDown } from "@/components/icons";
import { Button } from "@/components/ui";
import { API_URL } from "@/constants/api";
import { PageUrls } from "@/constants/PageUrls";
import { useFetch } from "@/hooks";
import { useChatStore } from "@/store/useChatStore";
import { ResponseType } from "@/types";
import { Chat } from "@/types/chat";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MessageContent from "./MessageContent";
import MessageSidebar from "./MessageSidebar";

const Message = () => {
  const router = useRouter();
  const params = useSearchParams();
  const sellerId = params.get("sellerId");
  const { setCurrentChatId, clearTempMessages } = useChatStore();

  const {
    data: chatList,
    loading,
    refetch: refetchChatList,
  } = useFetch<ResponseType<Chat[]>>(API_URL.User.Chat.chat);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  console.log(selectedChatId);

  useEffect(() => {
    const checkScreenSize = () => {
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobile(isSmallScreen);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Add interval for chat list polling
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!selectedChatId) {
        refetchChatList();
      }
    }, 10000); // 10 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [refetchChatList, selectedChatId]);

  useEffect(() => {
    if (sellerId && chatList?.data) {
      // Check if there's an existing chat with this seller
      const existingChat = chatList.data.find(
        (chat) => chat.user.id === Number(sellerId),
      );
      if (existingChat) {
        setSelectedChatId(existingChat.id);
        setCurrentChatId(existingChat.id);
      } else {
        // If no existing chat, we'll handle it in MessageContent
        setSelectedChatId("new");
        setCurrentChatId("new");
      }
    }

    return () => {
      clearTempMessages();
      setCurrentChatId(null);
    };
  }, [sellerId, chatList?.data, setCurrentChatId, clearTempMessages]);

  return (
    <div>
      {(chatList?.data && chatList.data.length > 0) || sellerId ? (
        <div className="m-auto mt-[72px] flex max-w-[1160px] flex-col gap-6 px-5 xl:px-0">
          {selectedChatId && (
            <Button
              type="button"
              onClick={() => {
                setSelectedChatId(null);
                setCurrentChatId(null);
                clearTempMessages();
                router.push(PageUrls.Message.message);
              }}
              className="h-6 w-6 cursor-pointer border-2 border-neutral-950 bg-transparent p-0 lg:hidden"
            >
              <ArrowDown className="rotate-90" size={12} color="#000" />
            </Button>
          )}

          <p className="text-2xl font-bold">Message</p>
          <div className="flex w-full flex-col rounded-2xl border lg:flex-row">
            {isMobile ? (
              selectedChatId ? (
                <div className="w-full p-4">
                  <MessageContent
                    chatId={selectedChatId}
                    sellerId={sellerId}
                    refetchChatList={refetchChatList}
                    setSelectedChatId={setSelectedChatId}
                  />
                </div>
              ) : (
                <div className="w-full p-4">
                  <MessageSidebar
                    refetchChatList={refetchChatList}
                    chatList={chatList?.data || []}
                    loading={loading}
                    onSelectChat={setSelectedChatId}
                    selectedChatId={selectedChatId}
                    setSelectedChatId={setSelectedChatId}
                  />
                </div>
              )
            ) : (
              <>
                <div className="w-full p-4 lg:w-[40%]">
                  <MessageSidebar
                    refetchChatList={refetchChatList}
                    chatList={chatList?.data || []}
                    loading={loading}
                    onSelectChat={setSelectedChatId}
                    selectedChatId={selectedChatId}
                    setSelectedChatId={setSelectedChatId}
                  />
                </div>

                <div className="w-full border-l p-4 lg:w-[60%]">
                  {selectedChatId ? (
                    <MessageContent
                      refetchChatList={refetchChatList}
                      chatId={selectedChatId}
                      sellerId={sellerId || undefined}
                      setSelectedChatId={setSelectedChatId}
                    />
                  ) : (
                    <div className="mt-10 flex h-[40vh] flex-col items-center justify-center gap-4">
                      <Image
                        src="/assets/image/comment.png"
                        width={188}
                        height={188}
                        alt="messages"
                        className="h-[108px] w-[108px] md:h-[188px] md:w-[188px]"
                      />
                      <p className="font-bold text-neutral-300 md:text-2xl">
                        Select a message to start chatting
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-10 flex h-[40vh] flex-col items-center justify-center gap-4">
          <Image
            src="/assets/image/comment.png"
            width={188}
            height={188}
            alt="messages"
            className="h-[108px] w-[108px] md:h-[188px] md:w-[188px]"
          />
          <p className="font-bold text-neutral-300 md:text-2xl">
            There is no message to display
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;
