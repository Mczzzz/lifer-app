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
		this.Elt.setStyle("justifyContent","space-around");

		this.showButtons();
	}


	showButtons(){


		//1F4A1
		let timer = this.card.push("Button",this.Elt,"timerButton", String.fromCodePoint(0x23F2));
        timer.setStylePicto("fontSize","50px");
		timer.setStylePicto("border", "5px solid black");
        timer.setStylePicto("padding","10px 10px 20px 10px");
        timer.setStylePicto("borderRadius" ,"10px");

        timer.getContainer().addEventListener("click",()=>this.timerFrame());


/*		//1F4A1
		let idea = this.card.push("Button",this.Elt,"ideaButton", String.fromCodePoint(0x1F4A1));
        idea.setStylePicto("fontSize","50px");
		idea.setStylePicto("border", "5px solid black");
        idea.setStylePicto("padding","10px 10px 20px 10px");
        idea.setStylePicto("borderRadius" ,"10px");*/


		let object = this.card.push("Button",this.Elt,"objectButton", String.fromCodePoint(0x1F4E6));
        object.setStylePicto("fontSize","50px");
		object.setStylePicto("border", "5px solid black");
        object.setStylePicto("padding","10px 10px 20px 10px");
        object.setStylePicto("borderRadius" ,"10px");




		let users = this.card.push("Button",this.Elt,"userButton", String.fromCodePoint(0x1F46A));
		users.setStylePicto("fontSize","50px");
		users.setStylePicto("border", "5px solid black");
        users.setStylePicto("padding","10px 10px 20px 10px");
        users.setStylePicto("borderRadius" ,"10px");

	}




	timerFrame(){

		let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Timer'}});
		window.dispatchEvent(LinkEvent);

	}




}