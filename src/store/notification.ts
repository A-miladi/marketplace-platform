import { create } from "zustand";

interface NotificationState {
  shouldRefetch: boolean;
  setShouldRefetch: (value: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  shouldRefetch: false,
  setShouldRefetch: (value) => set({ shouldRefetch: value }),
}));
