import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

export default class Add extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);


		this.init();
		
	}


	init(){

		console.log("addTimerInit");
		this.setStyle("position" , "absolute");
		this.setStyle("top" , "15%");
		this.setStyle("left" , "15%");
		this.setStyle("height" , "70%");
		this.setStyle("width" , "70%");
		this.setStyle("display" , "flex");
		this.setStyle("flexDirection" , "column");
		this.setStyle("background" , "#d0d0d0");
		this.setStyle("borderRadius" , "30px");
		this.setStyle("border" , "5px solid #009688");




		this.card = new Card('Card', this.path);
	

		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "0px");
		this.card.setStyle("margin", "0px");
		this.card.setStyle("padding", "10px");
		this.card.setStyle("background", "transparent");
		this.card.setStyle("height", "100%");
		this.card.setStyle("display", "flex");
		this.card.setStyle("flexDirection", "column");



//Peut etre a revoir car c'est la card qui me renvoi ça pour le moment
		this.card.setCallBack("keyup",this.path, 'updateTitle');

			this.HeaderElement   = this.card.setElement("Header");
			this.HeaderElement.setStyle("justifyContent","space-between");
			this.HeaderElement.setStyle("alignItems","center");


					let HeaderBackButton = this.card.push("Button", this.HeaderElement,"Back", String.fromCodePoint(0x274C)); //274C

					HeaderBackButton.setStylePicto("fontSize","25px");
					HeaderBackButton.setStylePicto("color","green");
					HeaderBackButton.setStylePicto("alignItems","center");

					HeaderBackButton.getContainer().addEventListener("click",()=>this.CloseMe());


			this.MainElement   = this.card.setElement("Main");
			this.MainElement.setStyle("justifyContent","space-between");
			//this.MainElement.setStyle("alignItems","center");
			this.MainElement.setStyle("height","90px");
			this.MainElement.setStyle("justifyContent","center");
			this.MainElement.setStyle("flex",1);



				let NomTimer = this.card.push("Text", this.MainElement,"TimerName", ""); //274C
				NomTimer.setAttribute("placeholder","Nom");
				NomTimer.setStyle("color", "black");
				NomTimer.setStyle("fontSize", "25px");



			this.FooterElement   = this.card.setElement("Footer");
			this.FooterElement.setStyle("justifyContent","space-between");
			this.FooterElement.setStyle("alignItems","center");
			this.FooterElement.setStyle("height","90px");
			this.FooterElement.setStyle("justifyContent","center");

			let ValidTimer = this.card.push("Button", this.FooterElement,"ValidName",  String.fromCodePoint(0x2705)); //2705



	}



	CloseMe(){

	
		this.destroyMe();

	}



	



}
