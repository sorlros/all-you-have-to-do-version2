// "use server";

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
// const sendNotificationToBackend = async ({ data, token }: NotificationData) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:3000/api/sendNotification",
//       { data, token },
//       // {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`, // 요청 헤더에 토큰 추가
//       //   },
//       // }
//     );
//     console.log("Response from backend:", response.data);
//   } catch (error) {
//     // console.error("Error sending notification to backend:", error);
//     console.log("error")
//   }
// };

// export default sendNotificationToBackend;


// 클라이언트 앱 코드

interface NotificationData {
  data: {
    title: string;
    body: string;
    time: string;
    image: string;
  };
  token: string;
}

const useSendNotificationToBackend = () => {
  // const router = useRouter();
  const sendNotification = async ({
    data: {
      title,
      body,
      time,
      image,
    },   
    token
  }: NotificationData) => {
    try {
      const data = {
        data: {
          title,
          body,
          time,
          image,
        }
      }
      const basePath = "http://localhost:3000";
      const res = await fetch(`${basePath}/api/sendNotification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, token }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to send notification to backend");
      }
  
      const responseData = await res.json();
      console.log("Response from backend:", responseData);
    } catch (error) {
      console.error("Error sending notification to backend:", error);
    }
  }
  
  return sendNotification
};

export default useSendNotificationToBackend;



