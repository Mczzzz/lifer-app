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
		    card.setStyle("filter", "opacity(80%)");

		    card.setStyle("display", "flex");
			card.setStyle("flexDirection", "column");
			card.setStyle("justifyContent", "center");
			card.setStyle("alignItems", "center");



		    let bkgColor = "#231144";
		    card.setStyle("background", bkgColor);


			let EltUser = card.setElement("ElementUser");
			EltUser.setStyle("justifyContent","flex-start");

			let itemUser = card.push("Text", EltUser,"login_user","");
			itemUser.setStyle("fontSize", "20px");
			itemUser.setStyle("background", "white");
			itemUser.setStyle("padding", "20px 80px");
			itemUser.setStyle("borderRadius", "40px");
			itemUser.setStyle("border", "5px solid #FFEB3B");
			itemUser.setStyle("placeholder","Username");





			let EltPass = card.setElement("ElementPass");
			EltPass.setStyle("justifyContent","flex-start");
				
			let itemPassword = card.push("Text", EltPass,"login_password","Password");
			itemPassword.setStyle("fontSize", "20px");
			itemPassword.setStyle("background", "white");
			itemPassword.setStyle("padding", "20px 80px");
			itemPassword.setStyle("borderRadius", "40px");
			itemPassword.setStyle("border", "5px solid #FFEB3B");
			itemPassword.setStyle("placeholder","Username");





			let EltLogIn = card.setElement("ElementLogIn");
			EltLogIn.setStyle("justifyContent","flex-start");
				
			let itemLogin = card.push("Text", EltLogIn,"login_password","Password");



	}

	






}