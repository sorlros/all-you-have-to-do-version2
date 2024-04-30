import { sendFCMNotification } from "@/actions/send-fcm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      data,
      token,
    }: {
      data: { title: string; body: string; time: string; image: string, icon: string, isDay: string };
      token: string;
    } = await req.json();

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
    
    setupScheduledJob(data, token);

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("error발생", error);
    return NextResponse.json({ message: "error" });
  }
}
