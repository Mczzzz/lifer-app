import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

export default class HeaderButtons extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);


		this.init();
		
	}


	init(){

		this.card = new Card('Card', this.path);
	
		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "0px");
		this.card.setStyle("margin", "0px");
		this.card.setStyle("padding", "20px");
		this.card.setStyle("background", "transparent");


			let Elt   = this.card.setElement("Element");
			Elt.setStyle("justifyContent","space-between");

	}


}
