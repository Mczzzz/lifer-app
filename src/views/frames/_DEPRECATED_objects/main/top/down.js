import { SearchServices } from '../../../../../services/search.js';
import superViews from "../../../../common/superViews.js";
import jsTreeContainer from '../../../../common/component/jsTreeContainer.js';


export default class down extends superViews{
	

	constructor( MyClass,path){

	
		super( MyClass,path);




		this.init();

	}

	init(){

		this.setStyle("background" , "#a5dc86");
		//this.container.style.transition	   = '0.4s cubic-bezier(0, 0.87, 0.01, 0.87)';

		this.setStyle("overflowY" , "scroll");
		this.setStyle("display" , "none");
		
		this.initTree();

	}


	initTree(){

		this.jsTree = new jsTreeContainer(this.container,'ObjectTree','JsTreeObjects');

		SearchServices.addTarget(this.jsTree.getSearchElements());

       
	}


	//CALLBACK
	on_JsTreeObjects_select_node(data){

		console.log('on select leaf');
		console.log(data);

		this.Lifer.addData("Objects",[{"LeafNode" : data.data.node}]);

		data.element = this.MyClass;
		
		this.callBackToParent(data);

	}





	//PUBLICS
	
	loadData(data){

		this.jsTree.loadData(data);

	}


	hide(){

		this.setStyle("display" , "none");
		this.setStyle("flex" , null);
		this.setStyle("padding" , "0px");
		this.jsTree.hide();

	}


	show(){

		this.setStyle("display" , "");
		this.setStyle("flex" , 1);
		this.setStyle("padding" , "10px");
		this.jsTree.show();

	}

	minForceFlex(){

		this.setStyle("flex" , null);

	}



}