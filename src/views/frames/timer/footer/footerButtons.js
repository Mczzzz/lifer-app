import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

import Add from "../add/add.js";

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



				let newTimer = this.card.push("Button", Elt,"AddNote", String.fromCodePoint(0x2795)); 

					newTimer.setStylePicto("fontSize","25px");
					newTimer.setStylePicto("marginRight","0px");
					newTimer.setStylePicto("color","green");
					newTimer.setStylePicto("alignItems","center");

					newTimer.getContainer().addEventListener("click",()=>this.addTimer());



	}


	addTimer(){
		console.log('in AddTimer');
		let adder = new Add('TimeAdder', this.path);


	}





}
