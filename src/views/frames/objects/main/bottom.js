import superViews from "../../../common/superViews.js";
import Manage from './bottom/manage.js';
import Tools from './bottom/tools.js';

export default class bottom extends superViews{
	

	constructor(MyClass,path){


		super(MyClass,path);

		this.init();

	}
	

	init(){

		this.initChilds();

	}

	initChilds(){
		
		this.Manage = new Manage("manage",this.path);
		this.Tools  = new Tools("tools",this.path);

	
	}


	//PUBLICS

	openManage(){

		this.Manage.open();
	}

	hideManage(){

		this.Manage.close();
	}

	openNoteTools(){
		this.Tools.openNoteTools();
	}

	hideNodeTools(){
		this.Tools.hideNoteTools();
	}

}