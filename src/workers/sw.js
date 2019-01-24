self.addEventListener('install', function(event) {
  event.waitUntil(precache());
});


self.addEventListener('fetch', event => {
   event.respondWith(fromCache(event.request)
    .catch(function () {
      return fromNetwork(evt.request,400);
    }));
});



function fromCache(request) {
  return caches.open('v1').then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}


function precache() {
  return caches.open('v1').then(function (cache) {
    return cache.addAll([
      '/lifer.js',
      '/index.html',
      '/'
    ]);
  });
}



function fromNetwork(request, timeout) {

  return new Promise(function (fulfill, reject) {
 
    let timeoutId = setTimeout(reject, timeout);
 
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
 

    }.then( function(response) {

      if(request.method == "GET"){
      
        let responseToCache = response.clone();

        caches.open('v1')
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });

        }

        fulfill(response);

      })




    , reject);
  });
}

