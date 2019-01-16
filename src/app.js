import { Lifer } from './services/Lifer.js';
import AppController from './controller/AppController.js';

let name = "app";
Lifer.addMe(name);


let css = document.createElement("style");
			css.type = "text/css";
			css.id = "divContentEditable_css_style";
			css.innerHTML = `[contenteditable=true]:empty::before {
			  					content: attr(placeholder);
								}
							 body{
							 	overscroll-behavior-y : contain;
							 }
							`;

		document.head.appendChild(css);


if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('/ww.js').then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
  }, /*catch*/ function(error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}





var deferredPrompt;

window.addEventListener('beforeinstallprompt', function (e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  showAddToHomeScreen();

});


//creer le bouton


function showAddToHomeScreen() {

  var a2hsBtn = document.querySelector(".ad2hs-prompt");

 // a2hsBtn.style.display = "block";

  a2hsBtn.addEventListener("click", addToHomeScreen);

}















//add full size screen






/*window.addEventListener('resize', ()=>getSize());

function getSize(){

let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;





}
*/

////////////////////////////////////////////////////////
//GROS HACK POUR FAIRE DU FULL SCREEN

/*window.addEventListener("click", function(e){

	//Chrome, Opéra, Safari
	document.documentElement.webkitRequestFullscreen();

	if(!document.webkitFullscreenEnabled){

		//Firefox
		document.documentElement.mozRequestFullScreen();

	}

});

let LinkEvent = new CustomEvent('click', {'detail' : {}});
 window.dispatchEvent(LinkEvent);*/
 
///////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////
/*let screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;

if (screen.lockOrientationUniversal("portrait-primary")) {
  // orientation was locked
} else {
  // orientation lock failed
}*/
//screen.orientation.lock("portrait-primary");
//////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
//resize de la frame sur chrome si ça change de taille
//onsole.log(window.onresize);


///////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
//Init service worker

////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
//WEB WORKER
/*let worker = new Worker('build/ww.js');
console.log(worker);
worker.addEventListener('message', function(e) {
  console.log('Worker said: ', e.data);
}, false);

*/
//////////////////////////////////////////////////////////


const LiferApp = new AppController(name);


