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

    // if (!req.body || typeof req.body !== "object") {
    //   throw new Error("Request body is not an object");
    // }

    // const bodyData = await req.json();
    // console.log("bodyData", bodyData);

    // if (
    //   !bodyData ||
    //   typeof bodyData !== "object" ||
    //   !("data" in bodyData) ||
    //   !("token" in bodyData.data)
    // ) {
    //   throw new Error("Invalid request body structure");
    // }

    // const { data, token } = bodyData;

    const fcmUrl = "https://fcm.googleapis.com/fcm/send";

    const requestData = {
      to: token, // 알림을 수신할 디바이스의 토큰
      notification: {
        title: data.title, // 알림 제목
        body: data.body, // 알림 내용
        image: data.image,
      },
    };

    const response = await fetch(fcmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer AAAABonBoiU:APA91bGf7Vf3u4DAO6WhouMB-QD0qHrWMCD5-2qJPQglMg-PAye6HL9aU78WcIyuSRdcYUll6aGpMy5rKw1lTbJT-YXsLhLJvBjTqOWlEZD-yfuHopo_rujBpsX39J94oVNAQGor1k11",
      },
      body: JSON.stringify(requestData),
    });
    console.log("rrresponse", response);

    if (response.ok) {
      return NextResponse.json({ message: "success" });
    } else {
      return NextResponse.json({ message: "failed" });
    }
  } catch (error) {
    console.error("error발생", error);
    return NextResponse.json({ message: "error" });
  }
}
