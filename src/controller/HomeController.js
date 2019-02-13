import { Lifer } from '../services/Lifer.js';

import LoaderCollection from '../services/Loader/LoaderCollection.js';

import Home from '../views/frames/home.js';

export default class HomeController {


	constructor(){

		let Me = 'Home';

		this.path = "Controller-"+Me;

		Lifer.addMe(this.path);

		this.init();
	}




	init(){

		this.UserCollection = new LoaderCollection('User');

		this.initView();
	}




	initView(){


		let home = new Home("Frame-Home");

		//console.log'in HOME INIT VIEW');
		//launch Login si pas connecté
		this.UserCollection.isAuth(this,'_launchLogin');


		let request  = new Request('flowers.jpg');
		var response = new Response();

		caches.open('v1')
            .then(function(cache) {
               cache.put(request, response);
            });




		
	}

	_launchLogin(isConnect){

		//console.log'in _launchConnect');
		//console.logisConnect);
		if(!isConnect){

			let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Login'}});
			window.dispatchEvent(LinkEvent);

		}

	}



}