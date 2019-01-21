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
		this.setStyle("background" , "white");
		this.setStyle("flex" , 1);
		this.setStyle("alignItems" , "center");
		this.setStyle("overflowY" , "scroll");

		this.NoteCollection = new LoaderCollection('Notes');
		//je récupère la liste des notes
		//j'affiche
		this.showList();
		//this.service = setInterval(()=> this.showList() , 10000 );
	
		
	}




	showList(){


		this.NoteCollection.getAllNotes(this,'addCards');


	}

	addCards(datas){


		
		let len = datas.rows.length, i;
		  for (i = 0; i < len; i++) {


		  	this.createCard(datas.rows[i]);


		  }





	}


	createCard(datas){

		let id = datas.note_id;

			let card = new Card('Card'+id, this.path);
	
		    card.setStyle("borderWidth", "1px");
		    card.setStyle("borderRadius", "3px");
		    card.setStyle("margin", "5px");
		    card.setStyle("padding", "10px");

		    let bkgColor = (datas.status == "SYNC")? "lightsteelblue" : "navajowhite";
		    card.setStyle("background", bkgColor);


			let Elt = card.setElement("Element"+id);
			Elt.setStyle("justifyContent","space-between");


			
			let 	item = card.push("TextButton", Elt,"view_Note"+id,datas.note_title);
			item.setStyle("padding", "10px");
				
			card.getContainer().addEventListener("click",()=>this.openNote(id));	


			let 	itemDate = card.push("TextButton", Elt,"date_Note"+id,datas.timestamp);
			itemDate.setStyle('font-size', '10px');
			itemDate.setStyle("padding", "3px");



	}



	openNote(guid){

	 let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Note',
	 	                                                          'guid' : guid
	 	                                                         }
	 	                                             }
	 	                            );
     window.dispatchEvent(LinkEvent);


	}




}