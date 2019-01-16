
import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

export default class Title extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);

		this.init();
		
	}


	init(){

		this.TheNote = this.parentThis.parentThis;
		
		this.addCard();		

	}




	addCard(){


		this.card = new Card('Card', this.path);

		
		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "0px");
		this.card.setStyle("margin", "0px");
		this.card.setStyle("padding", "10px");
		this.card.setStyle("boxShadow", "0px 2px 12px #BBB");
		this.card.setStyle("background", "white");
		this.card.setStyle("flex", "1");

		this.card.setStyle("transitionDuration", "0.5s");
    	this.card.setStyle("transitionDelay", "0.0s");
    	this.card.setStyle("transitionTimingFunction", "cubic-bezier(0.15, -0.35, 0.98, 1.27)");
    	this.card.setStyle("transitionProperty", "width height background-color font-size left top color");

		this.card.setCallBack("keyup",this.path, 'updateTitle');



			let MainElement   = this.card.setElement("main");
			MainElement.setStyle("justifyContent","flex-start");

					let TheTitle = this.card.push("Text", MainElement,"title", "");

					TheTitle.setAttribute("placeholder","Titre");

					TheTitle.setStyle("fontSize","20px");
					TheTitle.setStyle("color","black","property");
					TheTitle.setStyle("margin","0px 5px 5px 5px");
					TheTitle.setStyle("fontWeight","bold");
					TheTitle.setStyle("width","100%");
					


		if(this.parentThis.parentThis.isTmpId) TheTitle.getContainer().focus();	


	}



	updateTitle(e,title){

    	this.TheNote.setTitle(title.text,true);
	}


}
