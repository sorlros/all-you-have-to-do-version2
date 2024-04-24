import { NextPage } from "next";

const Test: NextPage = () => {
  const sendMessage = () => {
    const title = "타이틀";
    const body = "바디";
    const icon = "";
    const options = { body, icon };

    const notification = new Notification(title, options);
  };

  const btnClickHandler = async () => {
    const result = await Notification.requestPermission();
    if (result === "granted") {
      sendMessage();
    } else {
      console.log("error");
    }
  };

  return <button onClick={btnClickHandler}>알림 보내기</button>;
};

export default Test;
