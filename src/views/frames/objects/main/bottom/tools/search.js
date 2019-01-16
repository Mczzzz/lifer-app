import superViews from "../../../../../common/superViews.js";
import { SearchServices } from '../../../../../../services/search.js';

import Card from "../../../../../common/ui/card.js";

export default class search extends superViews{


	constructor(MyClass,path){

		super(MyClass,path);

		this.init();


	}



	init(){

		this.setStyle("background","#e8eff7");
		this.setStyle("padding","5px");

		this.addInput();
		this.linkSearch();

	}



	addInput(){


	let card = new Card('Card', this.path);
				
				card.setStyle("borderWidth", "0px");
				card.setStyle("borderRadius", "0px");
				card.setStyle("margin", "0px");
				card.setStyle("padding", "5px");
				card.setStyle("background", "transparent");


					let ObjectsSearchCardElement  = card.setElement("Element");
					ObjectsSearchCardElement.setStyle("justifyContent","flex-start");

							this.input = card.push("Text", ObjectsSearchCardElement,"ObjectsSearchCardElementItem", "");

							this.input.setAttribute("placeholder","Recherche...");

							this.input.setStyle("fontSize","15px");
							this.input.setStyle("border","1px solid silver");
							this.input.setStyle("borderRadius","5px");
							this.input.setStyle("background","white");
							this.input.setStyle("margin","0px");
							this.input.setStyle("padding","10px");
							this.input.setStyle("width","100%");
							//limiter la largeur
							//limiter a une ligne
							//changer la couleur du texte

	}


	linkSearch(){

		SearchServices.addInput(this.input.getContainer());
		
	}




}