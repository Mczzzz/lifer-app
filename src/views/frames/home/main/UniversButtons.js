import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

export default class UniversButtons extends superViews{
	

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


		this.Elt   = this.card.setElement("Element");
		this.Elt.setStyle("justifyContent","space-between");

		this.showButtons();
	}


	showButtons(){

		let object = this.card.push("Button",this.Elt,"objectButton", String.fromCodePoint(0x1F4E6));
		let users = this.card.push("Button",this.Elt,"userButton", String.fromCodePoint(0x1F46A));

	}

}
