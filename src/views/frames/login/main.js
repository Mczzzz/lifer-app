import superViews from "../../common/superViews.js";

import Card from "../../common/ui/card.js";

import LoaderCollection from '../../../services/LoaderCollection.js';

import { DatasSynchronizing } from '../../../services/DatasSynchronizing.js';

import webSQL from '../../../services/webSQL.js';


export default class Main extends superViews{
	

	constructor(MyClass , path){

		super( MyClass , path)

		this.webSQL = new webSQL();

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



		    let bkgColor = "rgba(0, 0, 0, 0.9)";
		    card.setStyle("background", bkgColor);


			let EltTitle = card.setElement("ElementTitle");
			EltTitle.setStyle("justifyContent","flex-start");

			let itemTitle = card.push("Text", EltTitle,"login_title","Lifer");
			itemTitle.setStyle("fontSize", "20vh");
	        itemTitle.setStyle("paddingBottom", "60px");
	        itemTitle.setStyle("color", "white");
			itemTitle.setStyle("fontFamily", "'Berkshire Swash', cursive");
			itemTitle.setStyle("textShadow", `0px 0px 10px rgba(255,255,255,0.6),
				                              0px 0px 30px rgba(255,255,255,0.4),
				                              0px 0px 50px rgba(255,255,255,0.3),
				                              0px 0px 180px rgba(255,255,255,0.3`);



/*.animate([
		  // keyframes
		  { transform: 'translateX(0px)' }, 
		  { transform: 'translateX('+DeviceWidth+'px)' }
		], { 
		  // timing options
		  duration: time+100,
		  easing : 'ease-in-out',
		  iterations: 1
		});*/





			let EltUser = card.setElement("ElementUser");
			EltUser.setStyle("justifyContent","flex-start");

			let itemUser = card.push("Text", EltUser,"login_user","");
			itemUser.setStyle("fontSize", "20px");
			itemUser.setStyle("background", "white");
			itemUser.setStyle("padding", "25px 80px");
			itemUser.setStyle("borderRadius", "40px");
			itemUser.setStyle("border", "1px solid rgb(59, 255, 219)");
			itemUser.setStyle("lineHeight", 0);
			itemUser.setStyle("backgroundImage", "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)");
			itemUser.setStyle("color", "rgb(107, 12, 12)");
			itemUser.setAttribute("placeholder","Username");






			let EltPass = card.setElement("ElementPass");
			EltPass.setStyle("justifyContent","flex-start");
				
			let itemPassword = card.push("Text", EltPass,"login_password","");
			itemPassword.setStyle("fontSize", "20px");
			itemPassword.setStyle("background", "white");
			itemPassword.setStyle("padding", "25px 80px");
			itemPassword.setStyle("borderRadius", "40px");
			itemPassword.setStyle("lineHeight", 0);
			itemPassword.setStyle("backgroundImage", "linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%)");
			itemPassword.setStyle("color", "rgb(107, 12, 12)");
			itemPassword.setStyle("border", "1px solid rgb(59, 255, 219)");
			itemPassword.setAttribute("placeholder","Password");





			let EltLogIn = card.setElement("ElementLogIn");
			EltLogIn.setStyle("paddingTop","10px");
				
			let itemLogin = card.push("Button", EltLogIn,"login_password","keyboard_arrow_right");

			//itemPassword.setStyle("background", "white");
			itemLogin.setStyle("padding", "10px 100px");
			itemLogin.setStyle("borderRadius", "40px");
			itemLogin.setStyle("border", "1px solid rgba(255, 254, 250, 0.4)");
			itemLogin.setStyle("background", bkgColor);


			itemLogin.setStylePicto("fontSize","40px");
	        itemLogin.setStylePicto("margin","0px");
            itemLogin.setStylePicto("marginLeft","5px");
            itemLogin.setStylePicto("color","white");
            itemLogin.setStylePicto("alignItems","center");

            itemLogin.getContainer().addEventListener('click',() => this.authMe(itemUser, itemPassword));



	}

	

	authMe(itemUser, itemPassword){

		let user = itemUser.getText();
		let password = itemPassword.getText();
//TODO : user ou password vide : petit message t'as oublié  un truc

		//je lance l'authentification
		let UserCollection = new LoaderCollection("User");
		UserCollection.authMe(user, password, this, "authOK");
		//si pas bon petit message


	}


	authOK(datas){

		console.log('IN  AUTH OK');
		console.log(datas);

		if(datas.error == "Invalid credentials."){

//Mauvaise authentification

		}else{

			this.parentThis.destroyMe();
			//TODO : je set en base comme quoi je suis loggé
			let qry = "INSERT INTO Params (name, value) VALUES ('is_auth', true)";
			this.webSQL.playQuery('cacheData',qry);

			//je redemarre la synchro
			DatasSynchronizing.startService();


		}
		


	}



}