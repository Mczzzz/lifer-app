import superViews from "../../../superViews.js";

import Card from "../../../ui/card.js";

//import { LoaderImage } from '../../../../../services/LoaderImage.js';

import FileManager from '../../../../../services/FileManager.js'

export default class Image extends superViews{
	

	constructor( MyClass , path,prepend = false,callback = false,id){

		super( MyClass , path, prepend);

		this.ExtcallBack = callback;

		  if(id){

            this.container.id = id;

           }


		this.response = {};
		this.response.type = "image";
		this.response.path = "";

		this.init();

		
	}

	init(){

		this.form();
	}


	form(){

		this.card = new Card('Card', this.path);
		this.card.setId(this.container.id);
		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "12px 0px 6px 12px");
		this.card.setStyle("margin", "0px");
		this.card.setStyle("padding", "10px");
		this.card.setStyle("boxShadow", "rgb(212, 212, 212) 2px 2px 2px");
		this.card.setStyle("background", "linear-gradient(45deg, rgb(252, 79, 160) 0%, rgb(244, 149, 76) 100%)");
		this.card.setStyle("margin", "5px");
		this.card.setStyle("display", "flex");
		this.card.setCallBack("keyup",this.path, "encapResponse");
		//this.card.setCallBack("keyup",this.ExtcallBack.path, this.ExtcallBack.method);

		this.response.id = this.card.getId();


		//this.launchCam();

		
		this.prepare();
	}



//il faut refaire un pont ici pour récuprer les datas
	encapResponse(data){

		//console.log'encapResponse');
		//console.logdata);


		if(this.ExtcallBack){

			this.response.text = this.getTextElement().getText();

			let objectToCallBack = this.getObjectThisfromPath(this.ExtcallBack.path);
           	objectToCallBack[this.ExtcallBack.method]("",this.response);


		}





	}



	launchCam(){

		//console.log'in launch cam');

		let Fm = new FileManager();
		Fm.setCallBack(this,"showImage");
		Fm.uploader("camera",this.container.id);


	}


	prepare(){

		this.addStructThumb();
		this.addLegend();



	}

	addStructThumb(){

		this.ImageElement = this.card.setElement("Image_"+this.ClassId);
		this.ImageElt = this.card.push("Thumb", this.ImageElement,"Pict_"+this.ClassId);
		this.ImageElt.setStyle("marginRight" , "10px");
		this.ImageElt.setStyle("display" , "flex");
		this.ImageElt.setStyle("alignItems" , "center");
		this.ImageElt.setStyle("width" , "50px");
		//console.log(this.ImageElt);

		this.ImageElt.img.style.borderRadius = "7px";
		this.ImageElt.img.style.border = "1px solid #ffffff7d";
	
	}


	showImage(name, res = false){

		this.addThumb(res,name);

	}



    addThumb(name, data = false){


    	this.name = name;
    	//console.log'in addthumb');

    	
    	//pour savoir si je remonte l'infos ou pas de l'image
    	let sendCallBack = false;

    	//je pouse ma data dans mon thumb, 
    	if(data){

    		this.ImageElt.setData(data);
    		sendCallBack = true;

    	}else{

    		this.ImageElt.setDataByName(name, this.container.id);

    	}
		
		this.ImageElt.getContainer().addEventListener("click",()=>this.ImageViewer(data));


		if(this.ExtcallBack && sendCallBack){
		
			this.response.path = name;
			this.response.text = this.getTextElement().getText();

			let objectToCallBack = this.getObjectThisfromPath(this.ExtcallBack.path);
           	objectToCallBack[this.ExtcallBack.method]("",this.response);


		}


	}


//TODO A FACTORISE AVEC SON COPAIN DANS RESOURCE
	ImageViewer(data){
		
		//console.log"ImageViewer");
		//console.logdata);
		let viewCard = new Card('Viewer_', this.path);
		viewCard.setStyle("position", "absolute");
		//viewCard.setStyle("position", "absolute");
		viewCard.setStyle("top", "0px");
		viewCard.setStyle("left", "0px");
		viewCard.setStyle("width", "100%");
		viewCard.setStyle("height", "100%");
		viewCard.setStyle("background", "red");
		viewCard.setStyle("zIndex", "1000");

		let PictElt = viewCard.setElement("PictElt");
		viewCard.push("Image", PictElt, "MyPict", data);

		viewCard.getContainer().addEventListener("click",()=>viewCard.destroyMe());


	}


	//destroyImgViewer(viewCard)



	addLegend(){
		this.EmptyElement = this.card.setElement("Legend_"+this.ClassId);
		this.EmptyElement.setStyle("justifyContent","flex-start");
		this.EmptyElement.setStyle("flexWrap","wrap");

		this.TheTextElt = this.card.push("Text", this.EmptyElement,"Input_"+this.ClassId, "");

		this.TheTextElt.setAttribute("placeholder","Légende...");

		this.TheTextElt.setStyle("fontSize","18.5px");
		this.TheTextElt.setStyle("color","black","property");
		this.TheTextElt.setStyle("margin","0px 5px 5px 5px");
		this.TheTextElt.setStyle("fontWeight","normal");
		this.TheTextElt.setStyle("flex","1 1 100%");
	}


	setData(data){

		this.TheTextElt.setData(data);

	}

	getTextElement(){
		return this.TheTextElt;
	}

	getImageElement(){
		return this.TheTextElt;
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