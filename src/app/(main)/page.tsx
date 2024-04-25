"use client";

import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { firebaseConfig } from "@/config/firebase-config";

import UserPage from "./user/page";
import Title from "./(_components)/title";
import ExamplePage from "../(example)/example-page";

import { useEffect, useState } from "react";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { Toaster } from "sonner";
import Swal from "sweetalert2";
import { initializingApp } from "@/libs/initialize-app";

const Page = () => {
  useEffect(() => {
    // console.log("NOTI", Notification.permission);
    const getAlert = function () {
      if (Notification.permission === "granted") {
        return console.log("granted");
      } else {
        Swal.fire({
          //message, callback
          text: "이 웹사이트는 알람기능을 사용하기 위해 사용자의 동의가 필요합니다.",
          showCancelButton: true,
          allowOutsideClick: false,
        }).then(async function (result) {
          if (result.isConfirmed) {
            let permission = await Notification.requestPermission();
            if (permission === "granted") {
              console.log("granted");
            } else {
              console.log("denied");
            }
          } else return;
        });
      }
    };
    getAlert();

    const firebaseApps = getApps();
    const firebaseApp =
      firebaseApps.length === 0
        ? initializeApp(firebaseConfig)
        : firebaseApps[0];
    if (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined"
    ) {
      const messaging = getMessaging();

      getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      }).then((currentToken: string) => {
        if (currentToken) {
          console.log("기기 등록 성공");
        } else {
          console.log("기기 등록 실패");
        }
      });
    }
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

