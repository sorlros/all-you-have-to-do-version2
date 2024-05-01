import { NextResponse } from "next/server";
import * as admin from "firebase-admin";
import schedule from "node-schedule";
import { db } from "@/libs/prisma/db";
import { cert } from "firebase-admin/app";

const serviceAccountKey = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_KEY;

// if (process.env.NEXT_PUBLIC_PRIVATE_KEY) {
//   const privateKey2 = process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\n/g, '');
// }

if (!admin.apps.length) {
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount)
  // });


  // PRIVATE KEY 타입 오류 수정할 것
  admin.initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_MAIL,
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY
       
    }),
  });
  // console.log("SDK", admin.apps);
}

export async function POST(req: Request) {
  try {
    const {
      data,
      token,
    }: {
      data: { title: string; body: string; time: string; image: string, icon: string, isDay: string };
      token: string;
    } = await req.json();
    // await req.json();
    if (
      !data ||
      typeof data !== "object" ||
      !data.title ||
      !data.body ||
      !data.time ||
      !data.image ||
      !data.icon ||
      !data.isDay ||
      !token
    ) {
      throw new Error("Invalid request body structure");
    }

    const fcmUrl = "https://fcm.googleapis.com/fcm/send";

    const requestData = {
      to: token, // 알림을 수신할 디바이스의 토큰
      notification: {
        title: data.title, // 알림 제목
        body: data.body, // 알림 내용
        icon: data.icon,
        image: data.image,
        time: data.time
      },
    };

    await fetch(fcmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FCM_SERVER_KEY}`,
      },
      body: JSON.stringify(requestData),
    });
    
    const message: admin.messaging.Message = {
      data: {
        title: data.title,
        body: data.body,
        image: data.image,
        icon: data.icon,
        time: data.time,
      },
      token: token,
    }

    const response = await admin.messaging().send(message);
    console.log("FCM 알림 전송 성공:", response);
    
    // return { message: "success" };
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("error발생", error);
    return NextResponse.json({ message: "error" });
    // return { message: "error" };
  }
};