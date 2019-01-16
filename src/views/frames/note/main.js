import superViews from "../../common/superViews.js";

import Title      from "./main/title.js";
import Story  from "./main/story.js";
import Empty      from "./main/empty.js";


export default class Main extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);

		this.init();
		
	}


	init(){

				

		this.setStyle("display" , "flex");
		this.setStyle("flexDirection" , "column");
		this.setStyle("flex" , 1);



		this.initChilds();


	}


	initChilds(){
	

		this.Story = new Story("Story",this.path);

		this.Empty     = new Empty("Empty",this.path);


		if(this.parentThis.new){

			this.Story.setStyle("flex" , 1);
			this.Title     = new Title("Title",this.path);
		
		}

	}




}