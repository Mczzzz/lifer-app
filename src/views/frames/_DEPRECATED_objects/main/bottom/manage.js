import superViews from "../../../../common/superViews.js";
import List from './manage/list.js';

export default class manage extends superViews{


	constructor(MyClass,path){

		super(MyClass,path);

		this.init();

	}
	

	init(){

		this.setStyle("overflowY" , "scroll");
		this.setStyle("fontFamily" , "'Titillium Web',sans-serif,Arial,sans-serif");
		this.setStyle("background" , "#17802d");

		this.initChilds();

	}


	initChilds(){

		this.List = new List("list",this.path,true);

	}



	//PUBLICS
	
	open(){

		this.List.show();

		this.List.getList();
	}

	close(){

		this.List.hide();
	}


}