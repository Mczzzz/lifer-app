import superViews from "../../common/superViews.js";

import ActionButton from "./footer/actionButtons.js";

export default class Footer extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path)

		this.init();
		
	}


	init(){


		this.setStyle("background" , "linear-gradient(45deg, rgb(234, 234, 234) 0%, rgb(216, 216, 216) 100%)");
		this.setStyle("height" , "40px");
		this.setStyle("display", "flex");
		this.setStyle("alignItems" , "center");
		this.setStyle("color" , "");
		this.setStyle("zIndex" , 1);
		
		this.initChilds();

	}



	initChilds(){

		this.ActionButton = new ActionButton("Action",this.path);

	}


}