"use client";

import { create } from "zustand";

interface TokenWithUidStore {
  token: string;
  setToken: (param: string) => void;
  uid: string;
  setUid: (param: string) => void;
}

const useTokenWithUidStore = create<TokenWithUidStore>((set) => {
  let storedToken = "";
  let storedUid = "";

  if (typeof window !== "undefined") {
    storedToken = localStorage.getItem("token") || "";
    storedUid = localStorage.getItem("uid") || "";
  }

  return {
    token: storedToken,
    setToken: (param) => {
      set({ token: param });
      localStorage.setItem("token", param);
    },
    uid: storedUid,
    setUid: (param) => {
      set({ uid: param });
      localStorage.setItem("uid", param);
    },
  };
});

export default useTokenWithUidStore;
