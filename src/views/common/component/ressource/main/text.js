import superViews from "../../../superViews.js";

import Card from "../../../ui/card.js";


export default class Text extends superViews{
	

	constructor( MyClass , path,prepend = false, callback = false,id){

		super( MyClass , path, prepend);

		
		  if(id){

            this.container.id = id;

           }



		this.ExtcallBack = callback;

		this.init();
	}

	init(){

		let res = this.form();

		this.eltCollapser;

	}


	form(){

		this.setStyle('marginLeft', '0px');

		this.card = new Card('Card', this.path);

		this.card.setId(this.container.id);
		console.log("this.callBack in text ressource");
		console.log(this.ExtcallBack);
		this.card.setCallBack("keyup",this.ExtcallBack.path, this.ExtcallBack.method);

		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "12px 0px 6px 12px");
		this.card.setStyle("margin", "0px");
		this.card.setStyle("padding", "10px");
		this.card.setStyle("boxShadow", "rgb(212, 212, 212) 2px 2px 2px");
		this.card.setStyle("background", "linear-gradient(45deg, #FCE94F 0%, #F4F14C 100%)");
		this.card.setStyle("margin", "5px");
		
		
		this.card.setStyle("display", "flex");
		this.card.getContainer().addEventListener("click",()=>this.select());


		this.EmptyElement = this.card.setElement("Text");
		this.EmptyElement.setStyle("justifyContent","flex-start");
		this.EmptyElement.setStyle("alignItems","center");
		this.EmptyElement.setStyle("flex",1);


		this.TheTextElt = this.card.push("Text", this.EmptyElement,"Input", "");
		this.TheTextElt.setStyle("fontSize","18.5px");
		this.TheTextElt.setStyle("color","#626262","all");		
		this.TheTextElt.setStyle("margin","0px");
		this.TheTextElt.setStyle("fontWeight","normal");




	}


	setData(data){

		this.TheTextElt.setData(data);

	}


	getTextElement(){
		return this.TheTextElt;
	}



	eltCollapse(){

		this.eltCollapser = this.getObjectThisfromPath(this.card.path+"-collapser_"+this.ClassId);

		let collapseElement; 

		if(!this.eltCollapser){

			collapseElement = this.card.setElement("collapser_"+this.ClassId,false);
			this.collapseButton = this.card.push("Button",collapseElement,"collapser_"+this.ClassId, "unfold_more");
			this.collapseButton.setStylePicto("color","grey");
			this.collapseButton.setStylePicto("marginRight","0px");

			this.collapseButton.getContainer().addEventListener("click",()=>this.parentThis.collapsingNode(this.getContainer()));

		}


	}


	lessCollapse(){

		this.eltCollapse();
		this.collapseButton.setData("unfold_less");
		this.collapseButton.setStylePicto("opacity","0.3");

		this.collapseButton.setStyle("display", "");

	}



	moreCollapse(){

		this.eltCollapse();
		this.collapseButton.setData("unfold_more");
		this.collapseButton.setStylePicto("opacity","1");
		this.collapseButton.setStyle("display", "");
	}


	hideCollapse(){
		this.eltCollapse();
		this.collapseButton.setStyle("display", "none");

	}



	focus(first = false){
/*		console.log('in focus');
		console.log(this.TheTextElt);
		console.log(this.TheTextElt.getContainer());*/

		this.TheTextElt.getContainer().focus();

/*		if(first){
			let elt = this.TheTextElt;
			setTimeout(function(){  console.log('in function settimeout');elt.getContainer().focus(); }, 1000);	
		}*/


	}












	draggable(path,ancestorMethod){


		this.dragAncestor = {};
		this.dragAncestor.path = path;
		this.dragAncestor.method = ancestorMethod;
					             									  //prepend
		let dragElement = this.card.setElement("dragger_"+this.ClassId,true);
		this.dragButton = this.card.push("Button",dragElement,"dragger_"+this.ClassId, "drag_indicator");
		this.dragButton.setStyle("opacity", "0.3");

		this.dragButton.initTouch(this.path,"ancestorCallBack");
		//dragButton.setAttributeComponent(this.EmptyElement,"dragger_"+this.ClassId,"draggable", params);

	}

	ancestorCallBack(e,type){

		if(type == "start"){

			this.dragButton.setStyle("display","none");
		
		}else if(type == "stop"){

			this.dragButton.setStyle("display","");

		}
		

		let ancestor = this.getObjectThisfromPath(this.dragAncestor.path);
		ancestor[this.dragAncestor.method](this,e,type);

	}












	select(){

		let style = "rgb(0, 0, 0) 0px 0px 0px 1px inset";

		if(this.card.getContainer().style.boxShadow == style){

			this.card.setStyle("boxShadow", "");

		}else{
			this.card.setStyle("boxShadow", style);
		}

		
		console.log(this.card.getContainer().style.boxShadow);

		//on transmet au parent notre position relative
//TODO : A refaire plus propre car c'est du specifique dans du commun
		this.parentThis.resizeMoveTo = this.getContainer().offsetTop - 83 - 3;

	}



}