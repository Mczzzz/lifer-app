import { Lifer } from '../services/Lifer.js';

import Home from '../views/frames/home.js';

export default class HomeController {


	constructor(){

		let Me = 'Home';

		this.path = "Controller-"+Me;

		Lifer.addMe(this.path);

		this.init();
	}




	init(){


		this.initView();
	}




	initView(){


		let home = new Home("Frame-Home");
		
	}


}