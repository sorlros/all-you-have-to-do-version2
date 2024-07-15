"use client";

import Title from "./(_components)/title";
import ExamplePage from "../(example)/example-page";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Swal from "sweetalert2";

import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebase-config";
import { getMessaging, onMessage } from "firebase/messaging";

const Apps = getApps();
const firebaseApp = Apps.length == 0 ? initializeApp(firebaseConfig) : Apps[0];
const messaging = getMessaging(firebaseApp);

const Page = () => {
  useEffect(() => {
    // console.log("NOTI", Notification.permission);
    const getAlert = function () {
      if (Notification.permission === "granted") {
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
  }, []);

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('onMessage: ', payload);

      const title = "All you have to do 알람 서비스";
      const options = {
        body: payload.data?.body || "새로운 알림이 도착했습니다.",
        icon: payload.data?.icon || "아이콘",
        // data: payload.data,
        image: payload.data?.image || "이미지"
      };

      if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title, options);
        });
      }
    });
  }, [onMessage])

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

