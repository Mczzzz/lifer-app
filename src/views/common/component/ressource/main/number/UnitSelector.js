import superViews from "../../../../superViews.js";

import Card from "../../../../ui/card.js";


export default class UnitSelector extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);

		this.init();
		
	}

	init(){


		this.setStyle("position", "absolute");
		this.setStyle("top", "10%");
		this.setStyle("left", "5%");
		this.setStyle("width", "90%");
		this.setStyle("height", "70%");
		this.setStyle("background", "grey");
		this.setStyle("display", "flex");
		this.setStyle("flexWrap", "wrap");
		this.setStyle("justifyContent", "center");
		this.setStyle("alignItems", "center");
		this.setStyle("borderRadius", "30px");

		let Types = this.Lifer.getData("Unity","Types");


	     for (let item of Types) {


	     	this.parseType(item);

	      }




	}


	parseType(item){


		let card = new Card('Card_'+item.id, this.path);
		card.setStyle("width", "30%");

		let ElementUnitPicto = card.setElement("ElementUnitPicto"+item.id);
		ElementUnitPicto.setStyle("justifyContent","center");

		let button = card.push("Button", ElementUnitPicto,"unitSelect"+item.id, {"picto" : item.symbol, "fontType" : "fas"});
		button.setStylePicto("marginRight","0px");

		//////////////

		let ElementUnit = card.setElement("ElementUnitselect"+item.id);
		ElementUnit.setStyle("justifyContent","center");
		
			let TheTextElt = card.push("Text", ElementUnit,"unitSelect"+item.id, item.name);

			TheTextElt.setStyle("fontSize","10px");
			TheTextElt.setStyle("textAlign","center");
			TheTextElt.setStyle("color","black","property");
			TheTextElt.setStyle("margin","10px 5px 5px 5px");
			TheTextElt.setStyle("fontWeight","normal");
			TheTextElt.setStyle("flex",1);




	}


/*	

		//On crée un popup up


		let Types = this.Lifer.getData("Unity","Types");


		this.catSelector = document.createElement("select");


		 let opt = false;

	     for (let item of Types) {

	        opt = document.createElement("option");
	        opt.value = item.id;
	        opt.text = item.name;

	        this.catSelector.add(opt, null);

	      }



		//this.catSelector.style.display = "none";
		this.container.append(this.catSelector);
/*		this.catSelector.focus();
		this.catSelector.click();	
	

		 var evt = new MouseEvent("mousedown", {
		    bubbles: true,
		    cancelable: true,
		    view: window
		  });

	    this.catSelector.dispatchEvent(evt);

		this.catSelector.addEventListener("change", ()=>this.ServImgLoader.importPict(this.camLauncher.files[0]));



*/


}