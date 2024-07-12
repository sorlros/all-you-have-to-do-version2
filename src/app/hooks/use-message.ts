import { create } from "zustand";

interface MessageStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
}

export const useMessage = create<MessageStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));
