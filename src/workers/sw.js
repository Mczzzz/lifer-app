let iterator = 0;

self.addEventListener('install', function(event) {
  event.waitUntil(precache());
});


self.addEventListener('fetch', event => {
  console.log('in fetch listener');
   event.respondWith(fromCache(event.request)
    .catch(function () {
       console.log('nothing in cache to to network');

      fromNetwork(event.request,800)
        .then(function(response){
          console.log(response);
          return response;

        })
        .catch(function(reject){
  //      console.log('aiiiiieeeee');
        throw Error('ca a merdé ');
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
  let newPromise = new Promise(function (fulfill, reject) {
/*   console.log('fromNetwork');
    console.log(request);
    console.log(timeout);*/
 //   let timeoutId = setTimeout(reject, timeout);
    
     fetch(request)
       .then(function (response) {
        console.log('in fetch');
     //     clearTimeout(timeoutId);

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
        console.log("je retourne un truc");
//        console.log(response);
        return fulfill(responseToCache);
 
      })
      .catch(function (e) {

        console.log("je retourne l'event d'erreur");
    //     console.log('in fecth catch');
        return reject(e);

    });

  });

}
  

