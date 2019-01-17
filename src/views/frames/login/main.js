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
		this.setStyle("background" , "transparent");
		this.setStyle("flex" , 1);
		this.setStyle("alignItems" , "center");
		this.setStyle("overflowY" , "scroll");



		//je récupère la liste des notes
		//j'affiche

	
		this.showLogElements();
	}




	showLogElements(){

			let card = new Card('Card', this.path);
			
			card.setStyle("height", "100%");

		    card.setStyle("borderWidth", "1px");
		    card.setStyle("borderRadius", "3px");
		    card.setStyle("margin", "5px");
		    card.setStyle("padding", "10px");

		    card.setStyle("display", "flex");
			card.setStyle("flexDirection", "column");
			card.setStyle("justifyContent", "center");
			card.setStyle("alignItems", "center");



		    let bkgColor = "lightsteelblue";
		    card.setStyle("background", bkgColor);


			let EltUser = card.setElement("ElementUser");
			EltUser.setStyle("justifyContent","flex-start");

			let itemUser = card.push("Text", EltUser,"login_user","User");

			let EltPass = card.setElement("ElementPass");
			EltPass.setStyle("justifyContent","flex-start");
				
			let itemPassword = card.push("Text", EltPass,"login_password","Password");

			let EltLogIn = card.setElement("ElementLogIn");
			EltLogIn.setStyle("justifyContent","flex-start");
				
			let itemLogin = card.push("Text", EltLogIn,"login_password","Password");



	}

	






}