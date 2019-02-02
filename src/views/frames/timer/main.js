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

		this.num = {};

		this.init();



	}


	init(){
		console.log("in init");

		//this.setStyle("background" , "linear-gradient(45deg, rgb(199, 28, 28) 0%, rgb(216, 216, 216) 100%)");
		this.setStyle("background" , "transparent");
		this.setStyle("flex" , 1);
		this.setStyle("alignItems" , "flex-start");
		this.setStyle("overflowY" , "scroll");
		this.setStyle("display" , "flex");
		this.setStyle("flexWrap" , "wrap-reverse");
		this.setStyle("justifyContent" , "space-evenly");
		this.setStyle("alignContent" , "flex-start");

		this.TapCollection.getTapers(this, "addTapers");

	}


	addTapers(datas){

		console.log(datas);

		let len = datas.rows.length, i;
			for (i = 0; i < len; i++) {
				this.i = i;
				this.createCard(datas.rows[i]);

			}

	}


	createCard(datas){

		console.log('in create card');

		let id = this.i;
		this.num[this.i] = 0;


			let card = new Card('Card'+id, this.path);

		    card.setStyle("borderWidth", "1px");
		    card.setStyle("borderRadius", "10px");
		    card.setStyle("margin", "5px");
				card.setStyle("width", "100px");
				card.setStyle("height", "100px");
				card.setStyle("border", "3px solid black");


		    let bkgColor = (datas.status == "SYNC")? "lightsteelblue" : "navajowhite";
		    card.setStyle("background", bkgColor);



			let Elt2 = card.setElement("header"+id);
			Elt2.setStyle("justifyContent","space-between");


			let MyNum = card.push("TextButton", Elt2,"numIt"+id,String(this.num[this.i]));


		//	let date = this.Moment(datas.timestamp).fromNow();
			let 	itemDate = card.push("TextButton", Elt2,"date_Note"+id,"edit");
			itemDate.setStyle('font-size', '10px');
			itemDate.setStyle("padding", "5px");
			itemDate.setStyle("alignItems", "baseline");
			itemDate.setStyle("background", "red");
			itemDate.setStyle("borderRadius", "0px 5px 0px 5px");


			card.getContainer().addEventListener("click",()=>this.incrementIt(MyNum,this.num[this.i]));




			let Elt3 = card.setElement("Main"+id);
			Elt3.setStyle("justifyContent","center");



			let 	logo = card.push("TextButton", Elt3,"view_Note"+id,datas.logo);
			logo.setStyle("fontSize", "50px");



			let Elt = card.setElement("Footer"+id);
			Elt.setStyle("justifyContent","center");



			let 	name = card.push("TextButton", Elt,"view_Note"+id,datas.name);
			//name.setStyle("padding", "2px 0px 10px 10px");



	}



	incrementIt(elt, compteur){

		console.log('in incrementIt');

		compteur = compteur++;

		console.log(compteur);

		elt.setData(compteur);


}




}
