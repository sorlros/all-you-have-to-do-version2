"use client";

import Title from "./(_components)/title";
import ExamplePage from "../(example)/example-page";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Swal from "sweetalert2";

import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebase-config";
import { getMessaging, onMessage } from "firebase/messaging";

// const Apps = getApps();
// const firebaseApp = Apps.length == 0 ? initializeApp(firebaseConfig) : Apps[0];
// const messaging = getMessaging(firebaseApp);

const Page = () => { 
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, [])

  useEffect(() => {
    const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const messaging = getMessaging(firebaseApp);

    const initializeMessaging = () => {
      if (typeof window !== "undefined") {
        // navigator가 정의된 경우에만 실행
        if (Notification.permission === "granted") {
          // 알림 권한이 이미 허용된 경우
          onMessage(messaging, (payload) => {
            console.log('onMessage: ', payload);
            
            const title = "All you have to do 알람 서비스";
            const options = {
              body: payload.data?.body || "새로운 알림이 도착했습니다.",
              icon: payload.data?.icon || "https://all-you-have-to-do-version2.vercel.app/icon-192x192.png",
              // data: payload.data,
              image: payload.data?.image || "https://all-you-have-to-do-version2.vercel.app/images/logo.png"
            };
  
            if (Notification.permission === "granted") {
              navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, options);
              });
            }
          });
        } else {
          Swal.fire({
            text: "이 웹사이트는 알람기능을 사용하기 위해 사용자의 동의가 필요합니다.",
            showCancelButton: true,
          }).then(async (result) => {
            if (result.isConfirmed) {
              const permission = await Notification.requestPermission();
              console.log(permission === "granted" ? "granted" : "denied");
            }
          });
        }

        
      }
    };

    initializeMessaging();
  }, []);
  

  return (
    <main className="bg-slate-100 w-full h-full">
      <div className="bg-slate-100 flex flex-col max-w-6xl h-full mx-auto">
        <Toaster />
        <Title />
        <ExamplePage />
      </div>
    </main>
  );
};

export default Page;

