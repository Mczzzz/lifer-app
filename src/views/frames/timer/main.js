import superViews from "../../common/superViews.js";

import Card from "../../common/ui/card.js";

import LoaderCollection from '../../../services/Loader/LoaderCollection.js';

import { DatasSynchronizing } from '../../../services/DatasSynchronizing.js';

import webSQL from '../../../services/IO/webSQL.js';


export default class Main extends superViews{


	constructor(MyClass , path){

		super( MyClass , path)

		this.webSQL = new webSQL();

		this.TapCollection = new LoaderCollection('Tap');

		this.init();



	}


	init(){

		//this.setStyle("background" , "linear-gradient(45deg, rgb(199, 28, 28) 0%, rgb(216, 216, 216) 100%)");
		this.setStyle("background" , "transparent");
		this.setStyle("flex" , 1);
		this.setStyle("alignItems" , "stretch");
		this.setStyle("overflowY" , "scroll");
		this.setStyle("display" , "flex");


		this.TapCollection.getTapers(this, "addTapers");

	}


	addTapers(datas){

		let len = datas.rows.length, i;
			for (i = 0; i < len; i++) {


				this.createCard(datas.rows[i]);


			}

	}


	createCard(datas){

		let id = datas.id;

			let card = new Card('Card'+id, this.path);

		    card.setStyle("borderWidth", "1px");
		    card.setStyle("borderRadius", "3px");
		    card.setStyle("margin", "5px");


		    let bkgColor = (datas.status == "SYNC")? "lightsteelblue" : "navajowhite";
		    card.setStyle("background", bkgColor);

		    card.getContainer().addEventListener("click",()=>this.openNote(id));


			let Elt2 = card.setElement("header"+id);
			Elt2.setStyle("justifyContent","flex-end");



		//	let date = this.Moment(datas.timestamp).fromNow();
			let 	itemDate = card.push("TextButton", Elt2,"date_Note"+id,"edit");
			itemDate.setStyle('font-size', '10px');
			itemDate.setStyle("padding", "3px");
			itemDate.setStyle("alignItems", "baseline");


			let Elt3 = card.setElement("Main"+id);
			Elt3.setStyle("justifyContent","flex-start");



			let 	item = card.push("TextButton", Elt3,"view_Note"+id,datas.logo);
			item.setStyle("padding", "2px 0px 10px 10px");



			let Elt = card.setElement("Footer"+id);
			Elt.setStyle("justifyContent","flex-start");



			let 	item = card.push("TextButton", Elt,"view_Note"+id,datas.name);
			item.setStyle("padding", "2px 0px 10px 10px");







	}






}
