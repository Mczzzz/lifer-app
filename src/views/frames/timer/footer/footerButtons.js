import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

export default class FooterButtons extends superViews{
	

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


			let Elt = this.card.setElement("Element");
			Elt.setStyle("justifyContent","flex-start");



				let StartNote = this.card.push("Button", Elt,"AddNote", "note_add");

					StartNote.setStylePicto("fontSize","25px");
					StartNote.setStylePicto("marginRight","0px");
					StartNote.setStylePicto("color","green");
					StartNote.setStylePicto("alignItems","center");

					StartNote.getContainer().addEventListener("click",()=>this.StartNote());



					///////////////
					let sep1 = this.card.push("Button", Elt,"sep1", "more_vert");

					sep1.setStylePicto("fontSize","25px");
					sep1.setStylePicto("margin","5px");
					sep1.setStylePicto("color","#cfcfcf");
					sep1.setStylePicto("alignItems","center");
					//////////////





				let FooterObjectButton = this.card.push("Button", Elt,"toObjects", "widgets");

					FooterObjectButton.setStylePicto("fontSize","25px");
					FooterObjectButton.setStylePicto("color","green");
					FooterObjectButton.setStylePicto("alignItems","center");

					FooterObjectButton.getContainer().addEventListener("click",()=>this.addToHomeScreen());


	}


	StartNote(){

		let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Note'}});
		window.dispatchEvent(LinkEvent);

	}


	goToObject(){

		let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Objects'}});
		window.dispatchEvent(LinkEvent);

	}








}
