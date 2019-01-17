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
		this.setStyle("alignItems" , "stretch");
		this.setStyle("overflowY" , "scroll");
		this.setStyle("display" , "flex");



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

		    card.setStyle("justifyContent", "center");
		    card.setStyle("display", "flex");
		    card.setStyle("flex", 1);
			card.setStyle("flexDirection", "column");
			card.setStyle("alignItems", "center");



		    let bkgColor = "rgba(35, 17, 68, 0.80)";
		    card.setStyle("background", bkgColor);


			let EltTitle = card.setElement("ElementTitle");
			EltTitle.setStyle("justifyContent","flex-start");

			let itemTitle = card.push("Text", EltTitle,"login_user","Lifer");
			itemTitle.setStyle("fontSize", "60px");







			let EltUser = card.setElement("ElementUser");
			EltUser.setStyle("justifyContent","flex-start");

			let itemUser = card.push("Text", EltUser,"login_user","");
			itemUser.setStyle("fontSize", "20px");
			itemUser.setStyle("background", "white");
			itemUser.setStyle("padding", "20px 80px");
			itemUser.setStyle("borderRadius", "40px");
			itemUser.setStyle("border", "5px solid #FFEB3B");
			itemUser.setAttribute("placeholder","Username");






			let EltPass = card.setElement("ElementPass");
			EltPass.setStyle("justifyContent","flex-start");
				
			let itemPassword = card.push("Text", EltPass,"login_password","");
			itemPassword.setStyle("fontSize", "20px");
			itemPassword.setStyle("background", "white");
			itemPassword.setStyle("padding", "20px 80px");
			itemPassword.setStyle("borderRadius", "40px");
			itemPassword.setStyle("border", "5px solid #FFEB3B");
			itemPassword.setAttribute("placeholder","Password");





			let EltLogIn = card.setElement("ElementLogIn");
			EltLogIn.setStyle("paddingTop","10px");
				
			let itemLogin = card.push("Button", EltLogIn,"login_password","keyboard_arrow_right");

			//itemPassword.setStyle("background", "white");
			itemLogin.setStyle("padding", "10px 100px");
			itemLogin.setStyle("borderRadius", "40px");
			itemLogin.setStyle("border", "5px solid #FFEB3B");
			itemLogin.setStyle("background", bkgColor);


			itemLogin.setStylePicto("fontSize","40px");
	        itemLogin.setStylePicto("margin","0px");
            itemLogin.setStylePicto("marginLeft","5px");
            itemLogin.setStylePicto("color","white");
            itemLogin.setStylePicto("alignItems","center");



	}

	






}