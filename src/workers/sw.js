self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/public/dist/lifer.js',
        '/public/dist/sw.js',
        '/public/index.html',
        '/public/manifest.json',
        'https://fonts.googleapis.com/css?family=Berkshire+Swash'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
  );
});