const NotificationText = () => {
  const sendMessage = () => {
    const title = "All you have to do!";
    const body = "웹의 알람 기능을 사용하기 위해 권한 수락이 필요합니다.";
    const icon = "/images/logo.png";
    const options = { body, icon };

    const notific = new Notification(title, options);
  };

  const handleClick = async () => {
    const result = await Notification.requestPermission();

    if (result === "granted") {
      sendMessage();
    } else {
      return console.log("알림 권한을 얻지 못했습니다.");
    }
  };

  return <button onClick={handleClick}>알림 보내기</button>;
};
