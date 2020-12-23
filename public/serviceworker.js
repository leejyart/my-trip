const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

// install sw
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//listening
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(() => {
      return fetch(evt.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activate the sw
self.addEventListener("activate", (evt) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  evt.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
