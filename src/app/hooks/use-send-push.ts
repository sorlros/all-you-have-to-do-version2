import axios from "axios";

interface SendPushProps {
  uid: string;
  title: string;
  body: string;
  icon: string;
  image: string;
  time: string;
}

//수정할것
const useSendPush = () => {
  const sendPush = async ({
    uid,
    title,
    icon,
    body,
    image,
    time,
  }: SendPushProps) => {
    const message = {
      data: {
        uid,
        title,
        icon,
        body,
        image,
        time,
      },
    };
    // const url = `${window?.location?.origin}/api/send-fcm`;
    // console.log("url", url);
    console.log("use-send-push-data", message);

    try {
      const response = await axios.post(
        `${window?.location?.origin}/api/send-fcm`,
        { message },
      );
      console.log("Response:", response.data); // 서버로부터 받은 응답을 로그에 출력하거나 처리합니다.
      return response.data; // 필요에 따라 응답 데이터를 반환합니다.
    } catch (error) {
      console.error("Error:", error); // 요청이 실패했을 때 에러를 로그에 출력합니다.
      throw error; // 필요에 따라 에러를 처리합니다.
    }
  };

  return sendPush;
};

export default useSendPush;
