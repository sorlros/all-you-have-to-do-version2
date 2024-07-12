"use client";

import { create } from "zustand";

interface MessageStore {
  title: string;
  setTitle: (param: string) => void;
  body: string;
  setBody: (param: string) => void;
  image: string;
  setImage: (param: string) => void;
}

const useMessageStore = create<MessageStore>((set) => {
  return {
    title: "",
    setTitle: (param) => {
      set({ title: param });
    },
    body: "",
    setBody: (param) => {
      set({ body: param });
    },
    image: "",
    setImage: (param) => {
      set({ image: param });
    },
  };
});

export default useMessageStore;
