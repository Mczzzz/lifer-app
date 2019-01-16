import superViews from "../../common/superViews.js";

import Card from "../../common/ui/card.js";

import LoaderCollection from '../../../services/LoaderCollection.js';

export default class Main extends superViews{
	

	constructor(MyClass , path){

		super( MyClass , path)

		this.init();
		
	}


	init(){

		//this.setStyle("background" , "linear-gradient(45deg, rgb(199, 28, 28) 0%, rgb(216, 216, 216) 100%)");
		this.setStyle("background" , "white");
		this.setStyle("flex" , 1);
		this.setStyle("alignItems" , "center");
		this.setStyle("overflowY" , "scroll");


		//je récupère la liste des notes
		//j'affiche

	
		this.showLogElements();
	}




	showLogElements(){

			let card = new Card('Card', this.path);
	
		    card.setStyle("borderWidth", "1px");
		    card.setStyle("borderRadius", "3px");
		    card.setStyle("margin", "5px");
		    card.setStyle("padding", "10px");

		    let bkgColor = "lightsteelblue";
		    card.setStyle("background", bkgColor);


			let Elt = card.setElement("Element");
			Elt.setStyle("justifyContent","flex-start");


			
			let itemUser = card.push("Text", Elt,"login_user","User");
				
			let itemPassword = card.push("Text", Elt,"login_user","Password");



	}

	






}