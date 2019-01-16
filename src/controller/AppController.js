import { Lifer } from '../services/Lifer.js';

import BDLocalCollection from '../collections/DBLocalCollection.js';
import LoaderCollection  from '../services/LoaderCollection.js';

import Router from '../services/Router.js';


export default class AppController {


	constructor(path){

		let Me = 'App';

		this.path = "Controller-"+Me;

		Lifer.addMe(this.path);

		this.init();

	}



	init(){


		this.BDLocal = new BDLocalCollection();

		this.loadUser();
		this.loadUnity();
		this.loadCrypto();

		this.router = new Router(this.path);
		this.gotToHome();

	}



	loadUser(){

		let userCollection = new LoaderCollection("User");
		Lifer.addMe("User");

		let dispatchResponseTo  = [{ "This" : "Lifer" , "method" : "addData", "path" : "User"}];

		userCollection.Get(dispatchResponseTo);


	}


	loadDeviceInfos(){

		let path = "User-Device";

		Lifer.addMe(path);

		let screen = Lifer.getScreenSize();

		let dataPackage = [];

		let Uscreen = [];

		Uscreen.Screen = screen;

		dataPackage.push(Uscreen);

	    Lifer.addData(path,dataPackage);


	}


	loadUnity(){

		let unityTypeCollection = new LoaderCollection("Unity");
		Lifer.addMe("Extra-Unity");

		let dispatchResponseTo  = [{ "This" : "Lifer" , "method" : "addData", "path" : "Extra-Unity"}];

		unityTypeCollection.GetTypes(dispatchResponseTo);
		unityTypeCollection.GetUnits(dispatchResponseTo);
		

	}


	loadCrypto(){

		let cryptoTypeCollection = new LoaderCollection("Crypto");
		Lifer.addMe("Extra-Crypto");

		//et dispatchResponseTo  = [{ "This" : "Lifer" , "method" : "addData", "path" : "Unity"}];

		cryptoTypeCollection.GetInfos();
		//unityTypeCollection.GetUnits(dispatchResponseTo);
		

	}






	gotToHome(){

		this.router.Home();
		this.loadDeviceInfos();

	}

}