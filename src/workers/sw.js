let iterator = 0;

self.addEventListener('install', function(event) {
  event.waitUntil(precache());
});


self.addEventListener('fetch', event => {
  console.log('in fetch listener');
   event.respondWith(fromCache(event.request)
    .catch(reject => {
       console.log('nothing in cache to to network');

      return fromNetwork(event.request,800)
        .catch(reject => {
  //      console.log('aiiiiieeeee');
        throw Error('ca a merdé ');
      });
   /*     .then( response => {
          console.log(response);
          return response;

        })
        .catch(reject => {
  //      console.log('aiiiiieeeee');
        throw Error('ca a merdé ');
      });*/
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
  return new Promise(function (fulfill, reject) {

   // var timeoutId = setTimeout(reject, timeout);

 
    fetch(request).then(function (response) {
   //   clearTimeout(timeoutId);


       if(request.method == "GET" && response.status != 404){

          let responseToCache = response.clone();
          console.log("on cache le reponse")
          caches.open('v1')
            .then(function(cache) {
               cache.put(request, responseToCache);
            });


        }else{
          console.log("on cache pas la réponse")

        }





      fulfill(response);

 
    }, reject);
  });
}
  

/*   if(request.method == "GET" && response.status != 404){

          let responseToCache = response.clone();
          console.log("on cache le reponse")
          caches.open('v1')
            .then(function(cache) {
               cache.put(request, responseToCache);
            });


        }else{
          console.log("on cache pas la réponse")

        }*/