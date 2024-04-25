import { sendFCMNotification } from "@/actions/send-fcm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      data,
      token,
    }: {
      data: { title: string; body: string; time: string; image: string };
      token: string;
    } = await req.json();

    if (
      !data ||
      typeof data !== "object" ||
      !data.title ||
      !data.body ||
      !data.time ||
      !data.image ||
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

    await sendFCMNotification({ ...data, token });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("error발생", error);
    return NextResponse.json({ message: "error" });
  }
}
