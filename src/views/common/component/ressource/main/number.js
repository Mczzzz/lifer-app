import superViews from "../../../superViews.js";

import Card from "../../../ui/card.js";

import Unitslector from "./number/UnitSelector.js";


export default class Number extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);

		this.init();


		
	}

	init(){

		this.form();
	}


	form(){

		this.card = new Card('Card', this.path);
		this.card.setId(this.ClassId);
		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "12px 0px 6px 12px");
		this.card.setStyle("margin", "0px");
		this.card.setStyle("padding", "10px");
		this.card.setStyle("boxShadow", "rgb(212, 212, 212) 2px 2px 2px");
		this.card.setStyle("background", "linear-gradient(45deg, rgb(252, 79, 160) 0%, rgb(244, 149, 76) 100%)");
		this.card.setStyle("margin", "5px");
		this.card.setStyle("display", "flex");



		this.EmptyElement = this.card.setElement("Legend_"+this.ClassId);
		this.EmptyElement.setStyle("justifyContent","flex-start");
		this.EmptyElement.setStyle("flexWrap","wrap");


		let TheTextElt = this.card.push("Text", this.EmptyElement,"Input_"+this.ClassId, "");

		TheTextElt.setAttribute("placeholder","Légende...");

		TheTextElt.setStyle("fontSize","18.5px");
		TheTextElt.setStyle("color","black","property");
		TheTextElt.setStyle("margin","0px 5px 5px 5px");
		TheTextElt.setStyle("fontWeight","normal");
		TheTextElt.setStyle("flex","1 1 100%");



		let TheValueElt = this.card.push("Input", this.EmptyElement,"Number_"+this.ClassId, "");

		TheValueElt.setStyle("flex","1 1 0%");


		TheValueElt.setAttributeInput("placeholder","0.0");
		TheValueElt.setAttributeInput("type","number");

		TheValueElt.setStyleInput("fontSize","18.5px");
		TheValueElt.setStyleInput("color","black","property");
		TheValueElt.setStyleInput("background","transparent","all");
		TheValueElt.setStyleInput("margin","0px 5px 5px 5px");
		TheValueElt.setStyleInput("width","100%");
		

		//on crée un bouton
		let InutiesTool = this.card.push("Button", this.EmptyElement,"Unit_"+this.ClassId,{"picto" : "fas fa-weight-hanging", "fontType" : "fas"});

		InutiesTool.setStyle("flex","1.2");
		InutiesTool.setStyle("marginLeft","15px");

		InutiesTool.setStylePicto("fontSize","25px");
		InutiesTool.setStylePicto("marginRight","0px");
		InutiesTool.setStylePicto("color","green");

		InutiesTool.getContainer().addEventListener("click",()=>this.Startselect());
		//////
		




/*
		///
		let TheSelectElt = this.card.push("Select", this.EmptyElementValue,"mainNewSelect", this.Lifer.getData("Unity","Types"));

		this.card.setStyleComponent(this.EmptyElementValue,"mainNewSelect","flex",1);

		this.card.setStyleInputComponent(this.EmptyElementValue,"mainNewSelect","fontSize","18.5px");
		this.card.setStyleInputComponent(this.EmptyElementValue,"mainNewSelect","color","black","property");
		this.card.setStyleInputComponent(this.EmptyElementValue,"mainNewSelect","margin","0px 5px 5px 5px");
		this.card.setStyleInputComponent(this.EmptyElementValue,"mainNewSelect","fontWeight","normal");

		TheSelectElt.addEventListener("change", (e))



		let TheSaveButton = this.card.push("Button", this.EmptyElementValue,"mainNewButton","arrow_forward");

		this.card.setStyleComponent(this.EmptyElementValue,"mainNewButton","alignItems","flex-end");

		this.card.setStylePictoComponent(this.EmptyElementValue,"mainNewButton","fontSize","25px");
		this.card.setStylePictoComponent(this.EmptyElementValue,"mainNewButton","marginRight","0px");
		this.card.setStylePictoComponent(this.EmptyElementValue,"mainNewButton","color","green");

		TheSaveButton.getContainer().addEventListener("click",()=>this.saveResource(TheTextElt));*/

		/*this.active = this.card;
*/
	}









	draggable(path,ancestorMethod){


		this.dragAncestor = {};
		this.dragAncestor.path = path;
		this.dragAncestor.method = ancestorMethod;
					             									  //prepend
		let dragElement = this.card.setElement("dragger_"+this.ClassId,true);
		let button = this.card.push("Button",dragElement,"dragger_"+this.ClassId, "drag_indicator");
		button.setStyle("opacity", "0.3");

		button.initTouch(this.path,"ancestorCallBack");
		//dragButton.setAttributeComponent(this.EmptyElement,"dragger_"+this.ClassId,"draggable", params);

	}

	ancestorCallBack(e,type){

		let ancestor = this.getObjectThisfromPath(this.dragAncestor.path);
		ancestor[this.dragAncestor.method](this,e,type);

	}










	Startselect(){

		let US = new Unitslector("popUpUnitSelecter_"+this.ClassId, this.path);

	}






}