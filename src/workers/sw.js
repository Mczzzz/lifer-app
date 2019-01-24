self.addEventListener('install', function(event) {
  event.waitUntil(precache());
});


self.addEventListener('fetch', event => {
  console.log('in fetch listener');
   event.respondWith(fromCache(event.request)
    .catch(function () {
       console.log('nothing in cache to to network');
      return fromNetwork(event.request,400).catch(function(){
        console.log('aiiiiieeeee');
        throw Error('response status ' + response.status);
      });
    }));
});



function fromCache(request) {
  console.log(request.method);
  if(request.method == "GET"){
    return caches.open('v1').then(function (cache) {
      return cache.match(request).then(function (matching) {
        return matching || Promise.reject('no-match');
      });
    });
  }else{
    console.log("in else rejet no get from cache");
    return Promise.reject('no-match');
  }
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

  console.log('fromNetworkFirst');
    return new Promise(function (fulfill, reject) {
   console.log('fromNetwork');
    console.log(request);
    console.log(timeout);
    let timeoutId = setTimeout(reject, timeout);
    
    fetch(request).then(function (response) {
      console.log('in fetch');
        clearTimeout(timeoutId);
        fulfill(response);
 
    }).catch(function () {
       console.log('in fecth catch');
      return reject(response);
    })

  });

}
  


/*).then( function(response) {

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
          

      })*/