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
		this.card.setStyle("padding", "10px");
		this.card.setStyle("background", "transparent");


			let HeaderElement   = this.card.setElement("Element");
			HeaderElement.setStyle("justifyContent","space-between");

					let HeaderBackButton = this.card.push("Button", HeaderElement,"Back", "keyboard_backspace");

					HeaderBackButton.setStylePicto("fontSize","25px");
					HeaderBackButton.setStylePicto("color","green");
					HeaderBackButton.setStylePicto("alignItems","center");

					HeaderBackButton.getContainer().addEventListener("click",()=>this.BackToHome());


					let headerLogo = this.card.push("Button", HeaderElement,"headerLogo", "widgets");

					headerLogo.setStylePicto("fontSize","25px");
					headerLogo.setStylePicto("marginRight","0px");
					headerLogo.setStylePicto("color","green");
					headerLogo.setStylePicto("alignItems","center");



	}


	BackToHome(){

		let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Home'}});
		window.dispatchEvent(LinkEvent);

	}



}