export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          let serviceWorker;
          if (registration.installing) {
            serviceWorker = registration.installing;
            console.log("Service Worker: Installing");
          } else if (registration.waiting) {
            serviceWorker = registration.waiting;
            console.log("Service Worker: Installed & Waiting");
          } else if (registration.active) {
            serviceWorker = registration.active;
            console.log("Service Worker: Active");
          }
          console.log("Service Worker registration successful");
          // If successful, try to subscribe
          if (serviceWorker) {
            console.log("SW current state", serviceWorker.state);
            if (serviceWorker.state === "activated") {
              console.log("SW already activated");
            }
            serviceWorker.addEventListener("statechange", function (e) {
              console.log("SW statechange: ", e.target.state);
              if (e.target.state === "activated") {
                console.log(
                  "Just now activated. Now we can subscribe for push notifications."
                );
                subscribeToPushNotifications(registration);
              }
            });
          }
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  } else {
    console.log("Service Worker is not supported");
  }
}

async function subscribeToPushNotifications(registration) {
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_PUBLIC_KEY, // VAPID Public Key
    });

    console.log("Web Push subscription successful:", subscription);
    // await sendSubscriptionToServer(subscription);
  } catch (error) {
    console.error("Web Push subscription failed:", error);
  }
}

// async function sendSubscriptionToServer(subscription) {
//   try {
//     // 서버의 엔드포인트 URL을 정의합니다.
//     const serverEndpoint = `${process.env.REACT_APP_API_URL}/api/save-subscription`; // 원하는 서버의 엔드포인트 URL로 변경

//     // 서버로 전송할 데이터를 준비합니다.
//     const data = {
//       subscription: subscription,
//     };

//     // 서버로 POST 요청을 보냅니다.
//     const response = await fetch(serverEndpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (response.ok) {
//       console.log('Send subscription to server successful');
//     } else {
//       console.error('Send subscription to server failed:', response.status, response.statusText);
//     }
//   } catch (error) {
//     console.error('Send subscription to server failed:', error);
//   }
// }
