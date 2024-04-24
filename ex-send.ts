// import { db } from "@/libs/prisma/db";
// import { NextApiRequest, NextApiResponse } from "next";

// const admin = require("firebase-admin");

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const { message } = req.body;
//     console.log("message", message);

//     const serviceAccount = require("/serviceAccountKey.json");

//     if (!admin.apps.length) {
//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//       });
//     }

//     // 푸시 데이터
//     // api 호출할 때 받아올 데이터와 방금 불러온 토큰
//     let tokenList: Array<string> = [];
//     const user = await db.user.findUnique({
//       where: {
//         uid: message.uid,
//       },
//       select: {
//         token: true,
//       },
//     });

//     if (user) {
//       tokenList = user.token;
//     } else {
//       return;
//     }

//     const notificationData = {
//       ...message,
//       tokens: tokenList,
//     };

//     // 푸시 발송
//     // sendMulticast()는 여러개의 토큰으로 푸시를 전송한다.
//     // 외에도 단일 토큰에 발송하는 등의 다양한 메소드 존재
//     const res = await admin.messaging().sendMulticast(notificationData);
//     return res;
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }

// // export const sendFCMNotification = async ({ data }: NotificationData) => {
// //   const serviceAccount = require("/serviceAccountKey.json");
// //   if (!admin.apps.length) {
// //     admin.initializeApp({
// //       credential: admin.credential.cert(serviceAccount),
// //     });
// //   }
// //   // 푸시 데이터
// //   // api 호출할 때 받아올 데이터와 방금 불러온 토큰
// //   let tokenList: Array<string> = [];
// //   const user = await db.user.findUnique({
// //     where: {
// //       uid: data.uid,
// //     },
// //     select: {
// //       token: true,
// //     },
// //   });
// //   if (user) {
// //     tokenList = user.token;
// //   } else {
// //     return;
// //   }
// //   const notificationData = {
// //     ...data,
// //     tokens: tokenList,
// //   };
// //   // 푸시 발송
// //   // sendMulticast()는 여러개의 토큰으로 푸시를 전송한다.
// //   // 외에도 단일 토큰에 발송하는 등의 다양한 메소드 존재
// //   const res = await admin.messaging().sendMulticast(notificationData);
// //   return res;
// // };
