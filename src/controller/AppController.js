import { Lifer } from '../services/Lifer.js';

import BDLocalCollection from '../collections/DBLocalCollection.js';
import LoaderCollection  from '../services/Loader/LoaderCollection.js';

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

		this.loadUnity();
	//	this.loadCrypto();
		this.syncInitFromServers();
		
		this.router = new Router(this.path);
		this.gotToHome();


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

	syncInitFromServers(){

		let NoteCollection = new LoaderCollection("Notes");
		NoteCollection.syncFromServer();
	}



/*	loadCrypto(){

		let cryptoTypeCollection = new LoaderCollection("Crypto");
		Lifer.addMe("Extra-Crypto");

		//et dispatchResponseTo  = [{ "This" : "Lifer" , "method" : "addData", "path" : "Unity"}];

		cryptoTypeCollection.GetInfos();
		//unityTypeCollection.GetUnits(dispatchResponseTo);
		

	}*/






	gotToHome(){

		this.router.Home();
		this.loadDeviceInfos();

	}

}