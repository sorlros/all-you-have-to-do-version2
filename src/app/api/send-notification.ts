// // 클라이언트 앱 코드
// import axios from "axios";

// // Firebase Functions을 호출하여 백엔드 작업 수행

// interface NotificationData {
//   data: {
//     title: string;
//     body: string;
//     time: string;
//     image: string;
//   };
//   token: string;
// }

// const instance = axios.create({
//   baseURL: "https://us-central1-all-you-have-to-do.cloudfunctions.net", // 백엔드 엔드포인트 URL
//   // baseURL: "127.0.0.1:5001",
//   timeout: 5000, // 타임아웃 설정 (옵션)
//   headers: {
//     "Content-Type": "application/json", // JSON 형식으로 데이터 전송을 설정
//     "Access-Control-Allow-Origin": "*",
//     // CORS 허용 설정
//   },
// });

// const sendNotificationToBackend = async ({ data, token }: NotificationData) => {
//   try {
//     console.log(location.origin);
//     const response = await instance.post(
//       "/sendNotification",
//       { data, token },
//       // { withCredentials: true },
//     );
//     // {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`, // 요청 헤더에 토큰 추가
//     //   },
//     // }
//     console.log("Response from backend:", response.data);
//   } catch (error) {
//     console.error("Error sending notification to backend:", error);
//   }
// };

// export default sendNotificationToBackend;
