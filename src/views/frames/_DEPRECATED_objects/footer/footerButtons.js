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


			this.ObjectsFooterElement   = this.card.setElement("ObjectsFooterElement");
			this.ObjectsFooterElement.setStyle("justifyContent","flex-start");


					let StartNote = this.card.push("Button", this.ObjectsFooterElement,"addNote", "note_add");

					StartNote.setStylePicto("fontSize","25px");
					StartNote.setStylePicto("marginRight","0px");
					StartNote.setStylePicto("color","green");
					StartNote.setStylePicto("alignItems","center");

					StartNote.getContainer().addEventListener("click",()=>this.StartNote());


					///////////////
					let sep1 = this.card.push("Button", this.ObjectsFooterElement,"separator", "more_vert");

					sep1.setStylePicto("fontSize","25px");
					sep1.setStylePicto("margin","5px");
					sep1.setStylePicto("color","#cfcfcf");
					sep1.setStylePicto("alignItems","center");
					//////////////


					let addChild = this.card.push("Button", this.ObjectsFooterElement,"addChild", "add_circle");

					addChild.setStylePicto("fontSize","25px");
					addChild.setStylePicto("color","green");
					addChild.setStylePicto("alignItems","center");



					let renameChild = this.card.push("Button", this.ObjectsFooterElement,"renameChild", "create");

				     renameChild.setStylePicto("fontSize","25px");
					 renameChild.setStylePicto("color","orange");
					 renameChild.setStylePicto("alignItems","center");


					let removeChild = this.card.push("Button", this.ObjectsFooterElement,"removeChild", "remove_circle");

					removeChild.setStylePicto("fontSize","25px");
					removeChild.setStylePicto("color","red");
					removeChild.setStylePicto("alignItems","center");




	}

	StartNote(){

		let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Note'}});
		window.dispatchEvent(LinkEvent);

	}

}