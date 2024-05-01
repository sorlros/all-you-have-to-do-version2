// import { sendFCMNotification } from "@/actions/send-fcm";
// import schedule from "node-schedule";
// interface Data {
//   title: string;
//   body: string;
//   time: string;
//   image: string;
//   icon: string;
//   isDay: string;
// }

// export default function reservedMessage(scheduleId: string) {
//   const rule = new schedule.RecurrenceRule();
//   rule.dayOfWeek = 3; // 화요일
//   rule.hour = 14;
//   rule.minute = 0;
//   rule.tz = "Asia/Seoul";

//   schedule.scheduleJob(rule, () => {
//     sendFCMNotification({ ...data, token });
//   });
// }

// const date = new Date(2024, 6, 1, 15, 36, 0)

// const job = schedule.scheduleJob(date, async function () {
//   try {
//     if (!admin.apps.length && serviceAccountKey) {
//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccountKey)
//       });
//     }
    
//     const scheduleData = db.schedule.find

//     const message: admin.messaging.Message = {
//       data: {
//         title: "Happy Birthday",
//         body: "Happy Birthday!",
//       },
//       token: data.token
//     };

//     const response = await admin.messaging().sendToTopic('birthday', message);
//     console.log("FCM 알림 전송 성공:", response);
//   } catch (error) {
//     console.error("FCM 알림 전송 실패:", error);
//   }
// });