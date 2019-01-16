import superViews from "../../common/superViews.js";
import Breadcrumb from './main/breadcrumb.js';
import Top from './main/top.js';
import Bottom from './main/bottom.js';

export default class main extends superViews{
	

	constructor( MyClass, path){

		super( MyClass, path);
	
		this.init();

	}
	

	init(){

		this.setStyle("flex" , 1);
		this.setStyle("display" , "flex");
		this.setStyle("flexDirection" , "column");

		this.initChilds();

	}


	initChilds(){

		this.breadcrumb = new Breadcrumb("breadcrumb",this.path);

		this.top = new Top("top",this.path);

		this.bottom = new Bottom("bottom",this.path);

	}

		
	
	//CALLBACKS

	on_top_topDown_select_node(data){

		this.breadcrumb.populate(data.breadcrumb);
		this.breadcrumb.show();
		console.log('openManage');
		this.bottom.openManage();
		this.bottom.openNoteTools();

	}

	on_breadcrumb_select(data){

		console.log(data)
		//action on top
		this.top.focusUp(data);
		this.breadcrumb.hide();
		this.bottom.hideManage();
		this.bottom.hideNodeTools()
	}




}