import superViews from "../../../common/superViews.js";

import LoaderCollection from '../../../../services/Loader/LoaderCollection.js';

import Card from "../../../common/ui/card.js";

export default class Add extends superViews{


	constructor( MyClass , path){

		super( MyClass , path);


		this.init();

		this.TapCollection = new LoaderCollection('Tap');

	}


	init(){

		this.setStyle("position" , "absolute");
		this.setStyle("top" , "15%");
		this.setStyle("left" , "15%");
		//this.setStyle("height" , "70%");
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
			//this.MainElement.setStyle("height","90px");
			this.MainElement.setStyle("justifyContent","space-evenly");
			this.MainElement.setStyle("flexDirection", "column");
			this.MainElement.setStyle("alignItems","center");


			this.MainElement.setStyle("flex",1);


				this.LogoTap = this.card.push("Text", this.MainElement,"TapLogo", false); //274C
				this.LogoTap.setAttribute("placeholder",String.fromCodePoint(0x2753));
				this.LogoTap.setStyle("color", "black");
				this.LogoTap.setStyle("fontSize", "100px");
/*				this.LogoTap.setAttribute("maxlength", 1);
				this.LogoTap.setAttribute("size", 1);*/
				//this.LogoTap.setStyle("background", "transparent");
				this.LogoTap.setStyle("textAlign", "center");



				this.NomTap = this.card.push("Text", this.MainElement,"TapName", ""); //274C
				this.NomTap.setAttribute("placeholder","Nom");
				this.NomTap.setStyle("color", "black");
				this.NomTap.setStyle("fontSize", "25px");



			this.FooterElement   = this.card.setElement("Footer");
			this.FooterElement.setStyle("justifyContent","space-between");
			this.FooterElement.setStyle("alignItems","center");
			this.FooterElement.setStyle("height","90px");
			this.FooterElement.setStyle("justifyContent","center");

			let ValidTap = this.card.push("Button", this.FooterElement,"ValidName",  String.fromCodePoint(0x2705)); //2705
			ValidTap.getContainer().addEventListener("click",() => this.storeTap());


	}



	CloseMe(){


		this.destroyMe();

	}


	storeTap(){

		console.log("in store Tap");

		console.log(this.LogoTap.getText());
		console.log(this.NomTap.getText());
		//je récupere mon logo
		let data = {};
		data.name = this.NomTap.getText();
		data.logo = this.LogoTap.getText();

		this.TapCollection.create(data);
		//le récupère mon nom
		//je crée une entre en base (ce qui me donne un id) (toujours a voir pour les synchros les ids)
		//j'ajoute dans une table a part les events
		this.CloseMe();
	}



}
