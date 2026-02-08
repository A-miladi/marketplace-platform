import { Message } from "@/types/chat";
import { create } from "zustand";

interface SellerInfo {
  id: number;
  full_name: string;
  avatar: string | null;
}

interface ChatState {
  currentChatId: string | null;
  tempMessages: Message[];
  tempSellerInfo: SellerInfo | null;
  setCurrentChatId: (chatId: string | null) => void;
  addTempMessage: (message: Message) => void;
  clearTempMessages: () => void;
  setTempSellerInfo: (sellerInfo: SellerInfo | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  currentChatId: null,
  tempMessages: [],
  tempSellerInfo: null,
  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
  addTempMessage: (message) =>
    set((state) => ({
      tempMessages: [...state.tempMessages, message],
    })),
  clearTempMessages: () => set({ tempMessages: [] }),
  setTempSellerInfo: (sellerInfo) => set({ tempSellerInfo: sellerInfo }),
}));
