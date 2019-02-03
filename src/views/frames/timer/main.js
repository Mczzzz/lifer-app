import superViews from "../../common/superViews.js";

import Card from "../../common/ui/card.js";

import LoaderCollection from '../../../services/Loader/LoaderCollection.js';

import Edit from "./edit/edit.js";

//import { DatasSynchronizing } from '../../../services/DatasSynchronizing.js';

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
				this.createCard(datas.rows[i], i);
			}

	}


	createCard(datas, i){

		console.log('in create card');

		let id = datas.id;
		this.num[datas.id] = {};
		this.num[datas.id].value = 0;
		this.num[datas.id].moyenne = 0; //secondes
		this.num[datas.id].arraySize = 0;
		this.num[datas.id].numThis = {};
		this.num[datas.id].moyThis = {};

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


			let MyNum = card.push("TextButton", Elt2,"numIt"+id,String(0));
			MyNum.setStyle("paddingLeft", "5px");
			this.num[datas.id].numThis = MyNum;


			let MyMoy = card.push("TextButton", Elt2,"moyIt"+id,String(0));
			this.num[datas.id].moyThis = MyMoy;


		//	let date = this.Moment(datas.timestamp).fromNow();
			let 	itemDate = card.push("TextButton", Elt2,"date_Note"+id,"edit");
			itemDate.setStyle('font-size', '10px');
			itemDate.setStyle("padding", "5px");
			itemDate.setStyle("alignItems", "baseline");
			itemDate.setStyle("background", "red");
			itemDate.setStyle("borderRadius", "0px 5px 0px 5px");

			itemDate.getContainer().addEventListener("click",(e)=>this.edit(MyNum,datas.id,e));

			card.getContainer().addEventListener("click",()=>this.incrementIt(MyNum,datas.id));




			let Elt3 = card.setElement("Main"+id);
			Elt3.setStyle("justifyContent","center");



			let 	logo = card.push("TextButton", Elt3,"view_Note"+id,datas.logo);
			logo.setStyle("fontSize", "50px");



			let Elt = card.setElement("Footer"+id);
			Elt.setStyle("justifyContent","center");



			let 	name = card.push("TextButton", Elt,"view_Note"+id,datas.name);
			//name.setStyle("padding", "2px 0px 10px 10px");

			//je charge en base les infos itiles comme la liste
		  this.TapCollection.getEventsTapers(id, this, "majTapers");

	}

	majTapers(datas){

		console.log("in majTappers");
		console.log(datas);

		let len = datas.rows.length, i;
			for (i = 0; i < len; i++) {
				this.num[datas.rows[i].tapId].numThis.setData(datas.rows[i].value);
			}


	}



	incrementIt(elt, compteur){

		console.log('in incrementIt');

		this.num[datas.id].value++;

		console.log(this.num[datas.id].value);

		elt.setData(this.num[datas.id].value);

		//store events
		let datas = {};
		datas.id = compteur;
		datas.value = this.num[datas.id].value;
		datas.increment = 1;
		this.TapCollection.addEvent(datas);


}



	edit(elt, compteur,e){
		e.stopPropagation();
		console.log('in edit');
	let editor = new Edit('TimerEdit', this.path);
	}
}
