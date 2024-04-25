"use client";

import { cn } from "@/libs/utils";
import { Poppins } from "next/font/google";
import Lists from "../(_components)/lists";
import { FcAcceptDatabase } from "react-icons/fc";

import Image from "next/image";

import { Suspense, useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";

import { Auth, getAuth } from "firebase/auth";

import Todos from "./(_components)/todos";
import Title from "../(_components)/title";
import { initializingApp } from "@/libs/initialize-app";
import useTokenWithUidStore from "@/app/hooks/use-token-with-uid-store";
import { getMessaging, onMessage } from "firebase/messaging";
import { verifyToken } from "@/libs/firebase/get-token";

const poppins = Poppins({ subsets: ["latin"], weight: "500", style: "normal" });

const Page = () => {
  const { setToken } = useTokenWithUidStore();

  useEffect(() => {
    initializingApp();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const token = await verifyToken();
      if (token) {
        setToken(token);
      }
    };
    getToken();
  }, []);

  const auth = getAuth();
  const messaging = getMessaging();

  const [pageIndex, setPageIndex] = useState<number>(0);

  const pageData = {
    titles: [
      { name: "주방" },
      { name: "운동" },
      { name: "목표" },
      { name: "지출" },
      { name: "기타" },
    ],
  };

  const handlePageChange = (index: number) => {
    setPageIndex(index);
  };

  const appendMessage = (payload: any) => {
    return (
      <div className="flex w-[500px] h-[300px]">
        <Image alt="logo" src="/images/logo.png" />
        <h5>Received message: {payload.data?.title}</h5>
        <span>{payload.data?.body}</span>
      </div>
    );
  };

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("메세지 받음", payload);

      appendMessage(payload);
    });
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered.");
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <>
      <Title auth={auth} />
      <div
        className={cn(
          "flex space-x-4 w-full h-3/4 rounded-xl",
          poppins.className,
        )}
      >
        <article className="w-1/4 h-9/10 bg-white rounded-xl mx-auto">
          <div className="flex flex-wrap w-full h-1/3 gap-2 items-center justify-center mx-auto p-3">
            <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
            <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
            <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
            <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
          </div>
          <Lists onClick={(index) => handlePageChange(index)} />
          {/* <button onClick={btnClickHandler}>알림 보내기</button> */}
        </article>
        <article className="w-2/4 h-9/10 bg-white rounded-xl p-9 pl-8 relative">
          <div className="flex justify-between -ml-2">
            <FcAcceptDatabase size="50px" />
            <h1 className="flex-1 text-2xl items-center ml-2 mt-2">
              {pageData.titles[pageIndex] && pageData.titles[pageIndex].name}
            </h1>
          </div>
          <Suspense fallback={<Spinner />}>
            <Todos pageIndex={pageIndex} />
          </Suspense>
        </article>
        <article className="w-1/4 h-9/10 bg-white rounded-xl p-3 relative">
          <Suspense fallback={<Spinner />}>
            <Image
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
              src={`/images/main-${pageIndex}.jpeg`}
              alt="image"
              priority
              fill
              sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
            />
          </Suspense>
        </article>
      </div>
    </>
  );
};

export default Page;