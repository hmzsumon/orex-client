/* ────────── push event: show rich notification ────────── */
self.addEventListener("push", (event) => {
  try {
    const data = event.data ? event.data.json() : {};

    const {
      title = "Orex Trade",
      body = "You have a new update.",
      icon = "/icons/icon-192.png", // square, color
      badge = "/icons/badge-72.png", // monochrome (Android)
      image, // big banner image (optional)
      url = "https://www.orextrade.live/notifications",
      tag = "orex-trade", // group by tag
      requireInteraction = false, // stay until user interacts
      actions = [
        { action: "open", title: "Open", icon: "/icons/action-open.png" },
        {
          action: "dismiss",
          title: "Dismiss",
          icon: "/icons/action-close.png",
        },
      ],
      timestamp = Date.now(),
      vibrate = [80, 40, 80], // Android vibration pattern
      renotify = true, // same tag => buzz again
    } = data;

    const opts = {
      body,
      icon,
      badge,
      tag,
      renotify,
      requireInteraction,
      timestamp,
      vibrate,
      actions,
      data: { url }, // later used in click
    };

    if (image) opts.image = image;

    event.waitUntil(self.registration.showNotification(title, opts));
  } catch (e) {
    // fallback
    event.waitUntil(
      self.registration.showNotification("Orex Trade", {
        body: "You have a new notification.",
        icon: "/icons/icon-192.png",
        badge: "/icons/badge-72.png",
      })
    );
  }
});

/* ────────── notification click: focus/open tab ────────── */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || "https://www.orextrade.live";

  // actions (buttons)
  if (event.action === "dismiss") {
    return; // just close
  }

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      // focus existing tab if open
      for (const client of allClients) {
        if (client.url.includes(new URL(url).origin)) {
          client.focus();
          client.navigate(url);
          return;
        }
      }
      // otherwise open new
      await clients.openWindow(url);
    })()
  );
});
