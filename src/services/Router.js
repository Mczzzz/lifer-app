import { Lifer } from '../services/Lifer.js';
import Home from '../controller/HomeController.js';
//import Objects from '../views/frames/objects.js';
import Note from '../controller/NoteController.js';
import Login from '../views/frames/login.js';

export default class Router {


	constructor(path){

		let Me = 'Router';
		this.path = "Service-"+Me;
		Lifer.addMe(this.path);

		this.init();

		this.NoteController = new Note();
		//this.Login();

		window.addEventListener('changeRoute', (e) => this[e.detail.frame](e));

	}

	init(){

		this.container = document.body;
		this.container.style.margin = "0px";

	}

	cleanBody(){

		this.container.innerHTML = "";

	}


	Login(){
		//console.log'IN LOGIN');
		let login = new Login("Frame-Login",false);

	}


	//CALLBACKS

	Home(){
		//this.cleanBody();
		let home = new Home();

	}


	Objects(){

		this.cleanBody();
		let objects = new Objects("Objects",null);

	}


	Note(e){
		//console.log"router Note");
		//console.loge);
		let guid = (e.detail.guid)? e.detail.guid : false;
		//this.cleanBody();
		this.NoteController.initView(guid);

	}



}