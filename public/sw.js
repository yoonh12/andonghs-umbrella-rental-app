self.addEventListener('push', event => {
  const data = event.data.json();
  const { title, body } = data;
  
  const options = {
    body,
    icon: 'android-chrome-192x192.png', // icon that will show to users
    vibrate: [100, 50, 100],
    data: {
      url: 'https://umbrella.andong.hs.kr/return', // redirect to the URL when users click push alert
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
