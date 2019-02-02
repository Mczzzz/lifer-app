import superViews from "../../common/superViews.js";

import Card from "../../common/ui/card.js";

import LoaderCollection from '../../../services/Loader/LoaderCollection.js';

import { DatasSynchronizing } from '../../../services/DatasSynchronizing.js';

import webSQL from '../../../services/IO/webSQL.js';


export default class Main extends superViews{
	

	constructor(MyClass , path){

		super( MyClass , path)

		this.webSQL = new webSQL();

		this.init();
		
		this.TapCollection = new LoaderCollection('Tap');

	}


	init(){

		//this.setStyle("background" , "linear-gradient(45deg, rgb(199, 28, 28) 0%, rgb(216, 216, 216) 100%)");
		this.setStyle("background" , "transparent");
		this.setStyle("flex" , 1);
		this.setStyle("alignItems" , "stretch");
		this.setStyle("overflowY" , "scroll");
		this.setStyle("display" , "flex");


		this.TapCollection.getTapers(data);
		
	}


	addTapers(datas){





	}

	
}