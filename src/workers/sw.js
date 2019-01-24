self.addEventListener('install', function(event) {
  event.waitUntil(precache());
});


self.addEventListener('fetch', event => {
  console.log('in fetch listener');
   event.respondWith(fromCache(event.request)
    .catch(function () {
       console.log('nothing in cache to to network');
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
 
    console.log('fromNetwork');
    console.log(request.method);
    let timeoutId = setTimeout(reject, timeout);
 
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      console.log('fetch in fromNetwork');

    }.then( function(response) {

      console.log('then fetch in fromNetwork');
      if(request.method == "GET"){
        console.log('if get then fetch in fromNetwork');
        let responseToCache = response.clone();

        caches.open('v1')
          .then(function(cache) {
            cache.put(request, responseToCache);
          });

        }

        console.log('before fulfill then fetch in fromNetwork');
        fulfill(response);

      })




    , reject);
  });
}

