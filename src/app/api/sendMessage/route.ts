// "use server";

import { db } from "@/libs/prisma/db";
import * as admin from "firebase-admin";
import schedule from 'node-schedule';
import { NextRequest, NextResponse } from "next/server";

interface NotificationData {
    title: string;
    body: string;
    time: string;
    image: string;
    icon: string;
    day: number;
    isDay: string;
    uid: string;
}
interface MessageParam {
  data: NotificationData;
  token: string;
}

// const serviceAccountKey2 = JSON.parse(process.env.MY_SERVICE_ACCOUNT_KEY as string);
// const serviceAccountKey = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
// const projectId = process.env.NEXT_PUBLIC_NEXT_PUBLIC_PROJECT_ID as string;
// const clientMail = process.env.NEXT_PUBLIC_CLIENT_MAIL as string;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID as string,
      clientEmail: process.env.FIREBASE_CLIENT_MAIL as string,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') as string,
    })
  });
  console.log("SET SDK");
}

export async function POST(req: NextRequest) {
    try {
      const { data, token } = await req.json();
      console.log("data, token", data, token);
      
      const message: admin.messaging.Message = {
        data: {
          title: data.title,
          body: data.body,
          image: data.image,
          icon: data.icon,
        },
        token: token,
      }
  
      // 시간 설정
      const daynight = data.isDay;
      const splitTime = data.time.split(/:| /);
      console.log("시간", splitTime[0], splitTime[1]);
  
      let hour = parseInt(splitTime[0]);
      const min = parseInt(splitTime[1]);
      const day = data.day;
  
      if (daynight === "PM") {
        console.log("PM")
        hour += 12;
      }
  
      const currentDate = new Date();
      console.log(currentDate.getDay());
      currentDate.toLocaleString("en-US", {timeZone: "Asia/Seoul"});
  
      // 예약할 날짜를 설정 (현재 요일 + 목표 요일)
      const targetDate = new Date(currentDate);
      const daysUntilTargetDay = (day - currentDate.getDay() + 7) % 7;
      targetDate.setDate(currentDate.getDate() + daysUntilTargetDay);
  
      targetDate.setHours(hour);
      targetDate.setMinutes(min);
      targetDate.setSeconds(0);
  
      schedule.scheduleJob(targetDate, async function() {
        const alarm = await db.schedule.findUnique({
          where: {
            uid: data.uid,
            content: data.body
          }
        })

        if (alarm) {
          const fcmUrl = "https://fcm.googleapis.com/fcm/send";

          const requestData = {
            to: token,
            notification: {
              title: data.title,
              body: data.body,
              icon: data.icon,
              image: data.image,
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

          admin.messaging().send(message).then(function (response) {
            console.log("FCM 알림 전송 성공: ", response);
          })
          .catch(function (error) {
            console.log("FCM 알림 전송 실패: ", error)
          })
        }
      })

      return NextResponse.json({ message: "알람이 예약되었습니다." });
      
    } catch (error) {
      return NextResponse.json({ error: "Failed"});
    }
}
