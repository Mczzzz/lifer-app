import superViews from "../../../common/superViews.js";

import LoaderCollection from '../../../../services/LoaderCollection.js';

import Ressource from "../../../common/component/ressource.js";


export default class Empty extends superViews{
	

	constructor( MyClass , path, ressource = false){

		super( MyClass , path);

		this.NotesCollection = new LoaderCollection("Notes");

		this.init();
		
	}


	init(){

		this.setStyle("display","none");
		this.setStyle("boxShadow","rgb(187, 187, 187) 0px -2px 12px");
		//this.setStyle("maxHeight","70%");
		//this.active = false;
		this.Ressource = new Ressource('Ressource' , this.path);
		this.Ressource.setTargetData(this.parentThis.parentThis.path,"store");

	//	this.initialSet = 1;

	}



	addRessource(ressourceTmpId=false){

		this.Ressource.destroyMe();
		this.Ressource = new Ressource('Ressource' , this.path,ressourceTmpId);
		this.Ressource.setTargetData(this.parentThis.parentThis.path,"store");
		//je recherche en base mes infos
		this.NotesCollection.getRessource(ressourceTmpId,this,'setRessourceFromBase');
		//je recherche mon arbre d'item


	}

	setRessourceFromBase(datas){

		this.setTitle(datas.rows[0].ressource_title);
		this.NotesCollection.getRessourcesItems(datas.rows[0].ressource_id,this,'setRessourceItemsFromBase');

	}


	setRessourceItemsFromBase(datas){

		let len = datas.rows.length, i;
		
		for (i = 0; i < len; i++) {

			//this.createRessource(datas.rows[i]);
			 this.Ressource.addItem(datas.rows[i].item_type,datas.rows[i].item_id, datas.rows[i].item_text, datas.rows[i].item_path , 0);


		}

		this.setStyle("display","block");		
		this.parentThis.Story.setStyleOut();

	}


	FrameFocus(){

		let res = "";
		if(this.Ressource.Main.getContainer().style.display != "none"){

			this.Ressource.Main.setStyle("display","none");

			this.parentThis.Story.setStyle('filter',"");
			
			//reload des ressourceq dans la story
			this.parentThis.Story.reload();

			res = false;

		}else{

			this.Ressource.Main.setStyle("display","block");		
		   this.parentThis.Story.setStyleOut();
		   res = true;

		}

		return res;
	}



	setTitle(title){

		this.Ressource.setTitle(title);
		
	}


	show(type){

		this.setStyle("display","block");

		if(this.parentThis.Title) this.parentThis.Title.setStyle("display","none");

		this.parentThis.parentThis.Header.HeaderButton.TheTitle.setStyle("display", "block");
		
		this.addItem(type);

	}

	addItem(type, ItemId = false, data=false, pict=false,margin = false){

		console.log("in add item empty");
/*		if(this.initialSet){
	   		 this.Ressource.setTarget(this.parentThis.parentThis.Main.Story.path);
 	   		this.initialSet = 0;
	   	}*/
	  
	   this.Ressource.addItem(type,ItemId, data, pict, margin);
	   
		//this.Ressource.addItem(type);
	}




}