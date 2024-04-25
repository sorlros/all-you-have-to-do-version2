export function subscribeUserToPush() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            process.env.NEXT_PUBLIC_FCM_SERVER_KEY
        })
        .then(function (subscription) {
          console.log("사용자가 알림 서비스에 구독되었습니다.", subscription);
          // 서버로 구독 정보 전송
          sendSubscriptionToServer(subscription);
        })
        .catch(function (err) {
          console.error("알림 구독에 실패했습니다.", err);
        });
    });
  }
}

// 서버로 구독 정보 전송
export function sendSubscriptionToServer(subscription) {
  // 서버로 전송할 데이터 준비
  const requestData = {
    subscription: subscription
  };

  // 서버 엔드포인트 URL
  const serverEndpoint = "https://example.com/subscribe";

  // HTTP POST 요청을 보내는 fetch 함수 사용
  fetch(serverEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('서버 응답이 실패했습니다.');
    }
    // 성공적으로 요청이 처리된 경우
    console.log('구독 정보를 서버에 전송했습니다.');
  })
  .catch(error => {
    console.error('구독 정보를 서버에 전송하는 중 오류가 발생했습니다.', error);
  });
}