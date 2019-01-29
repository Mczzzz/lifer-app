import superViews from "../../common/superViews.js";

import UniversButton from "./main/UniversButtons.js";
import NoteList from "./main/NoteList.js";

export default class Main extends superViews{
	

	constructor(MyClass , path){

		super( MyClass , path)

		this.init();
		
	}


	init(){

		//this.setStyle("background" , "linear-gradient(45deg, rgb(199, 28, 28) 0%, rgb(216, 216, 216) 100%)");
		this.setStyle("background" , "white");
		this.setStyle("flex" , 1);
		this.setStyle("display", "flex");
		this.setStyle("flexDirection", "column");

		this.initChilds();


	}




	initChilds(){

		
		this.NoteList = new NoteList("NoteList",this.path);
		this.UniversButton = new UniversButton("UniversButton",this.path);

	}
	
		







}