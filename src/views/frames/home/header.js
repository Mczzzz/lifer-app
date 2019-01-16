import superViews from "../../common/superViews.js";

import HeaderButton from "./header/headerButtons.js";

export default class Header extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path)

		this.init();
		
	}


	init(){


		this.setStyle("background" , "linear-gradient(45deg, rgb(234, 234, 234) 0%, rgb(216, 216, 216) 100%)");
		this.setStyle("alignItems" , "center");
		this.setStyle("color" , "");


		this.initChilds();


	}




	initChilds(){

		this.HeaderButton = new HeaderButton("Action",this.path);

	}

}
