import superViews from "../../common/superViews.js";

import FooterButton from "./footer/footerButtons.js";

export default class Footer extends superViews{
	

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

		this.FooterButton = new FooterButton("Action",this.path);

	}

}
