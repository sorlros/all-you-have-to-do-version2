"use client";

import { create } from "zustand";

interface TimerStore {
  content: string;
  setContent: (param: string) => void;
  time: string;
  setTime: (param: string) => void;
  day: string;
  setDay: (param: string) => void;
}

const useTimerStore = create<TimerStore>((set) => {
  return {
    content: "",
    setContent: (param) => {
      set({ content: param });
    },
    time: "",
    setTime: (param) => {
      set({ time: param });
    },
    day: "",
    setDay: (param) => {
      set({ day: param });
    },
  };
});

export default useTimerStore;
