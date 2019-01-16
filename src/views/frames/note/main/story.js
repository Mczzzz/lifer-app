import uuid from "uuid/v1"

import LoaderCollection from '../../../../services/LoaderCollection.js';
import LoaderDatas      from '../../../../services/LoaderDatas.js';

import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

export default class Story extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);

		this.NotesCollection = new LoaderCollection("Notes");

		this.init();

		this.ChildId = 0;
		this.ChildItemId = 0;


		this.RessourceList = [];
		//this.ItemList = [];
		this.observerTitle = false;
		
	}


	init(){

		this.setStyle("overflowY" , "scroll");
		this.setStyle("overflowX", "hidden");
		this.setStyle("overscrollBehavior","none");
		this.setStyle("flex","1");

		//
		
//TODO: Here
		if(this.parentThis.parentThis.new == false){

			//on retrouve toutes les ressources de cet id
			this.NotesCollection.getRessources(this.parentThis.parentThis.container.id,this,'populate');
		}




//		this.TheNote = this.getObjectThisfromPath("Frame-Note");
		
/*		if(this.TheNote.note.guid === false){

			this.setStyle("flex" , 0);
			return false;
		} */




	}


	reload(){

		this.RessourceList = [];
		this.container.innerHTML = "";
		this.NotesCollection.getRessources(this.parentThis.parentThis.container.id,this,'populate');


	}


	populate(datas){

		console.log('in populate ressource');
		console.log(datas);

		let len = datas.rows.length, i;
		
		for (i = 0; i < len; i++) {

			this.createRessource(datas.rows[i]);

		}

	}


	populateItems(datas){

		console.log('in populate ressourceItems');
		console.log(datas);

		let len = datas.rows.length, i;
		
		for (i = 0; i < len; i++) {

			this.addItem(datas.rows[i]);

		}

	}




	setStyleOut(){

		//this.setStyle("filter", "blur(2px) sepia(100%)");
		this.setStyle("filter", "opacity(0.2) grayscale(70%)");

	}

	setStyleIn(){
		this.setStyle("filter", "");
	}



/*	addRessource(){

		let ressourceTmpId = "TmpResourceId-"+uuid().replace(/-/gi, '.');
//		console.log(ressourceTmpId);
		this.createRessource(ressourceTmpId);
		this.setStyle("flex" , "");
		return ressourceTmpId;
	}*/


	createRessource(data){


		let RessourcePathId = this.path+"-"+'Card_'+this.ChildId;

		this.RessourceList[RessourcePathId] = {};
		this.RessourceList[RessourcePathId].Items = [];


		this.RessourceList[RessourcePathId].Card = new Card('Card_'+this.ChildId, this.path);
		this.RessourceList[RessourcePathId].Card.setId(data.ressource_id);

		let HeaderElement = this.RessourceList[RessourcePathId].Card.setElement("header");
		HeaderElement.setStyle("justifyContent", "stretch");

		let editRessource = this.RessourceList[RessourcePathId].Card.push("Button", HeaderElement,"edit", "editc");
		editRessource.setStylePicto("fontSize","20px");
		editRessource.setStylePicto("margin","0px");
		editRessource.setStylePicto("marginLeft","5px");
		editRessource.setStylePicto("color","white");
		editRessource.setStylePicto("alignItems","center");

		editRessource.getContainer().addEventListener("click",()=>this.loadRessource(data.ressource_id));

		this.RessourceList[RessourcePathId].TitleElt = this.RessourceList[RessourcePathId].Card.push("Text", HeaderElement,"Title", data.ressource_title);
		
		this.RessourceList[RessourcePathId].TitleElt.setStyle("fontSize","22px");
		this.RessourceList[RessourcePathId].TitleElt.removeAttribute("contentEditable");

		//HeaderElement.setStyle("height","50px");
		HeaderElement.setStyle("background","purple");



		//on rajoute les items;
		this.NotesCollection.getRessourcesItems(data.ressource_id,this,'populateItems');

		this.ChildId++;

	}

		//get resourcecommmune

		//this.setObserverTitle(ressourceTmpId);

/*		
		SAUVEGARDE A DETRUIRE
		let eltTitle = this.getObjectThisfromPath("Note-Main-Empty-Ressource-Header-Card-Element-Text-Title");

		let config = { characterData: true, childList: true, subtree: true};
		let observer = new MutationObserver(()=>this.updateTitle(ressourceTmpId,eltTitle));
			observer.observe(eltTitle.getContainer(), config);*/




/*	setObserverTitle(ressourceTmpId){

		if(this.observerTitle){
			this.observerTitle.disconnect();
			this.observerTitle = false;
		} 

		let eltTitle = this.getObjectThisfromPath("Frame-Note-Main-Empty-Ressource-Header-Card-Element-Text-Title");
		let config = { characterData: true, childList: true, subtree: true};
		this.observerTitle = new MutationObserver(()=>this.updateTitle(ressourceTmpId,eltTitle));

		this.observerTitle.observe(eltTitle.getContainer(), config);

	}


	updateTitle(ressourceTmpId,eltTitle){

		let newTitle = eltTitle.getText();

		this.RessourceList[ressourceTmpId].TitleElt.setData(newTitle);
		this.RessourceList[ressourceTmpId].title = newTitle;

	}



	updateText(MyText,elt,ressourceTmpId,itemTmpId){

		let newText = elt.text.getText();
	
		this.RessourceList[ressourceTmpId].Items[itemTmpId].data = newText;
		this.RessourceList[ressourceTmpId].Items[itemTmpId].margin = elt.bloc.getContainer().style.marginLeft;
		MyText.setData(newText);


		MyText.setStyle("marginLeft", elt.bloc.getContainer().style.marginLeft);

		//this.reorder(ressourceTmpId);

		//on save
		//this.save(ressourceTmpId,elt.bloc.ClassId,"text","text",newText);

		
	}

*/

	updateImagePict(datas){

		console.log('updateImagePict');
		console.log(datas)

/*		let newPict = elt.pict.data.pict;
		console.log("elt");
		console.log(elt);
		this.RessourceList[ressourceTmpId].Items[itemTmpId].pict = newPict;
	    //console.log("Image Update")
		MyPict.setData(newPict);

		//MyPict.setStyle("marginLeft", elt.bloc.getContainer().style.marginLeft);

		this.reorder(ressourceTmpId);*/


	}

/*
	updateImageLegend(MyText,elt,ressourceTmpId,itemTmpId){

		let newLegend = elt.text.getText();
	
		this.RessourceList[ressourceTmpId].Items[itemTmpId].data = newLegend;

		MyText.setData(newLegend);

//		MyText.setStyle("marginLeft", elt.bloc.getContainer().style.marginLeft);

		this.reorder(ressourceTmpId);

	}*/


	reorder(ressourceTmpId){

		//reorder
		let EditRessource = this.getObjectThisfromPath("Frame-Note-Main-Empty-Ressource-Main");
		let ChildList = EditRessource.getContainer().childNodes;
		let List = Array.from(ChildList);

		let newItemList = [];

		for (let item of List.reverse()){

			console.log("in for reorder :");
			console.log(this.RessourceList[ressourceTmpId].Card["Item_"+item.firstChild.id]);
			this.RessourceList[ressourceTmpId].Card.getContainer().prepend(this.RessourceList[ressourceTmpId].Card["Item_"+item.firstChild.id].getContainer());
		}


		for (let it of List.reverse()){

			newItemList[it.firstChild.id]= this.RessourceList[ressourceTmpId].Items[it.firstChild.id];
		}

		console.log("newItemList");
		console.log(newItemList);
		console.log(this.RessourceList[ressourceTmpId].Item);
		this.RessourceList[ressourceTmpId].Items = newItemList;
		console.log(this.RessourceList[ressourceTmpId].Item);
		this.RessourceList[ressourceTmpId].Card.getContainer().prepend(this.RessourceList[ressourceTmpId].Card["header_"+ressourceTmpId].getContainer());

	}





	addItem(datas){

		console.log("IN STORY ADD ITEM");
		console.log(datas);

		//ressourceTmpId,type,itemTmpId, 
		//elt
		let RessourcePathId = document.getElementById(datas.ressource_id).className;
		let ItemPathId = this.path+"-"+'Item_'+this.ChildItemId;
		let ItemElement = this.RessourceList[RessourcePathId].Card.setElement("Item_"+this.ChildItemId);
		this.ChildItemId++;
		ItemElement.setId(datas.item_id);
		//ItemElement.setStyle("height","50px");
		ItemElement.setStyle("background","yellow");
		ItemElement.setStyle("justifyContent","flex-start");

		this.RessourceList[RessourcePathId].Items[ItemPathId] = {};

		switch (datas.item_type){

			case 'text':


				console.log('IN TEXT');
				this.RessourceList[RessourcePathId].Items[ItemPathId].type = datas.item_type;
				let MyText = this.RessourceList[RessourcePathId].Card.push("Text",ItemElement,"text",datas.item_text);
				MyText.setStyle("color","black");
				MyText.setStyle("fontSize","14px");
				MyText.removeAttribute("contentEditable");
				this.RessourceList[RessourcePathId].Items[ItemPathId].object = MyText;

			//	this.setObserver(elt,ressourceTmpId,itemTmpId);

/*				let config = { attributes: true, characterData: true, childList: true, subtree: true};

				let observer = new MutationObserver(()=>this.updateText(MyText,elt,ressourceTmpId,itemTmpId));
				observer.observe(elt.bloc.getContainer(), config);
				observer.observe(elt.text.getContainer(), config);*/

			break;

			case 'image':

				console.log('IN IMAGE');
				this.RessourceList[RessourcePathId].Items[ItemPathId].type = datas.item_type;

				//j'ajoute mon thumb vide
				//et je lui pousserai sa data après
				let MyThumb= this.RessourceList[RessourcePathId].Card.push("Thumb",ItemElement,"pict",false);
				MyThumb.setStyle("marginLeft" , "5px");
				MyThumb.setStyle("marginRight" , "10px");
				MyThumb.setStyle("display" , "flex");
				MyThumb.setStyle("alignItems" , "center");


				let MyLoadData = new LoaderDatas(datas.item_path,datas.item_id, MyThumb);

				//this.updateImagePict(MyThumb,elt,ressourceTmpId,itemTmpId)

			//	MyThumb.getContainer().addEventListener("click",()=>this.ImageViewer(elt.pict.data.pict));


			//	let MyPictConfig = { attributes: true, subtree: true};

			//	let PictObserver = new MutationObserver(()=>this.updateImagePict(MyThumb,elt,ressourceTmpId,itemTmpId));
			//	PictObserver.observe(elt.pict.ImageElt.getContainer(), MyPictConfig);





				let MyLegend= this.RessourceList[RessourcePathId].Card.push("Text",ItemElement,"text","...");
				MyLegend.setStyle("color","black");
				MyLegend.setStyle("fontSize","14px");
				MyLegend.removeAttribute("contentEditable");
				this.RessourceList[RessourcePathId].Items[ItemPathId].object = MyLegend;

/*				let MyLegendconfig = { attributes: true, characterData: true, childList: true, subtree: true};

				let LegendObserver = new MutationObserver(()=>this.updateImageLegend(MyLegend,elt,ressourceTmpId,itemTmpId));
				LegendObserver.observe(elt.text.getContainer(), MyLegendconfig);*/



			break;
			console.log("this.RessourceList");
			console.log(this.RessourceList);


		}
//TODO: je set mon element, j'ay ajoute le composant, j'enregistre mon composant dans this.RessourceList pour pouvoir le modifier à la mise à jour

		//this.RessourceList[ressourceTmpId].ItemsList.push(ItemElement);
		//this.ItemList.push({"RessourceId"})
//		console.log(this.RessourceList);

	}




/*	setObserver(elt,ressourceTmpId,itemTmpId){

		let MyText = this.RessourceList[ressourceTmpId].Items[itemTmpId].object;

		let config = { attributes: true, characterData: true, childList: true, subtree: true};

		let observer = new MutationObserver(()=>this.updateText(MyText,elt,ressourceTmpId,itemTmpId));
		observer.observe(elt.bloc.getContainer(), config);
		observer.observe(elt.text.getContainer(), config);

	}*/


//TODO a Factoriser avec ce qu'il y a directement dans image
	ImageViewer(data=false){
		
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



	loadRessource(ressourceTmpId){

//		console.log("loadRessource");
		let TheRessource = this.Lifer.getData(this.parentThis.Empty.path,"This");
		TheRessource.addRessource(ressourceTmpId);

		
		


	}


//	update(data){
/*			console.log("IIIIIIIIIIINNN UPDATE");
			console.log(data);*/
	/*		//on set le texte
			this.RessourceList[data.RessourceId].Items[data.id].data = data.data.container.innerHTML;

			this.RessourceList[data.RessourceId].Items[data.id].object.setData(data.data.container.innerHTML);
			//on set la marge

			this.RessourceList[data.RessourceId].Items[data.id].object.setStyle("marginLeft", data.data.parentThis.parentThis.parentThis.container.style.marginLeft); 
	*/		//this.Save(Ressource, item );
			
//	}


/*	save(ressourceTmpId,itemId = false,type, element,value){

		let updateTs = this.Moment();

		let resp = {};
		resp.action = "Push";
		resp.type = type;
		resp.guid = ressourceTmpId;
		resp.itemId = itemId;
		resp.itemElt = element;
		resp.itemVal = value;
		resp.update = updateTs;
		
    	this.TheNote.Push(resp);

	}*/



//////////////////////////////////////////////////////////////////////////////////////////
// A REPRENDRE CORRECTEMENT
//////////////////////////////////////////////////////////////////////////////////////////


/*
	_OldSave(Card, Resource, updateTs = false){

		let card = this.getObjectThisfromPath(Card);


		if(updateTs == false){
			updateTs = this.Moment();
		}

		let resp = {};
		resp.type = "text";
		resp.action = "Push";
		resp.guid = card.getId();
		resp.update = updateTs;
		resp.resource = Resource;
		resp.Card = card.path;

    	this.TheNote.Push(resp);

	}*/



	/*createCard(Resource){

		let updateTs = this.Moment();
		//on s'assure que le flex de noteMainTitle est bien supprimé sinon on le fait
		//car sinon le Title déborde sur le header de la Note.
		let NoteMainTitle = this.getObjectThisfromPath("Note-Main-Title");
		if(NoteMainTitle.getContainer().style.display == "flex"){
			NoteMainTitle.getContainer().style.display = null;
		}


		this.setStyle("flex" , "");
//Mise a jour du Title update

		let timestamp = updateTs.format('x');


		let card = new Card('Card_'+timestamp, this.path);
		card.setId("TmpCardId-"+timestamp);
		card.setStyle("border","1px solid red");
		
		
//A ne pas oublié sinon ca va merder
//card.setId();

		let carWidth = card.getWidth();

		let HeaderElement = card.setElement("header_new_"+timestamp);
		HeaderElement.setStyle("justifyContent","flex-end");

				let MyText = card.push("Text",HeaderElement,"update_new_"+timestamp,updateTs.format('Do MMMM YYYY, HH:mm:ss'));

				MyText.setStyle("fontSize","9px");
				MyText.setStyle("color","grey");
				MyText.setStyle("margin","0px 5px 2px 0px");
				MyText.setStyle("fontWeight","normal");

		let MainElement = card.setElement("main_new_"+timestamp);

		if(Resource.type == 3){

				//let path = "/object/infos/resources/"+Resource.objectId+"/"+Resource.objectTreeId+"/"+Resource.objectInfoId+"/"+Resource.id;

				card.push("Image", MainElement, "main_"+timestamp, Resource);

		}else{

			MainElement.setStyle("justifyContent","flex-start");


			let theButton = card.push("Button",MainElement,"dragger"+timestamp, "drag_indicator");
			theButton.setAttribute("draggable", "y");
			theButton.initTouch(this.path,"touchMover");

			let aText = card.push("Text",MainElement,"main_new_"+timestamp, Resource.text);

			aText.setStyle("fontSize","15px");
			aText.setStyle("color","black");
			aText.setStyle("margin","0px 5px 5px 5px");
			aText.setStyle("fontWeight","normal");
			aText.setStyle("width","100%");

		}

		//calcul de la nouvelle hauteur du container
		this.container.scrollTop = this.container.scrollHeight;


		//et hop on envoi en sauvegarde la data mon gars
		this.Save(card.path, Resource.text, updateTs);

	}*/







}
