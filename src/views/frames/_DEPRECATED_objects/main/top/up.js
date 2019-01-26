import { SearchServices } from '../../../../../services/search.js';
import superViews from "../../../../common/superViews.js";
import jsTreeContainer from '../../../../common/component/jsTreeContainer.js';


export default class up extends superViews{
	

	constructor( MyClass,path){

		super( MyClass,path);

		this.init();

	}
	
	init(){


		this.setStyle("background" , "#e8eff7");

		this.setStyle("flex" , 1);
		this.setStyle("overflowY" , "scroll");

		this.initTree();	    

	}


	initTree(){



		this.jsTree = new jsTreeContainer(this.container,'Container','JsTreeContainer');

    	SearchServices.addTarget(this.jsTree.getSearchElements());
	}



	//CALLBACK
	on_JsTreeContainer_select_node(data){

		this.Lifer.addData("Objects",[{"ContainerNode" : data.data.node}]);
		
		data.element = this.MyClass;

        this.callBackToParent(data);

	}





	//PUBLICS
	getObjPathToNode(){
		return this.jsTree.getObjPathToNode();
	}



	loadData(){
		this.jsTree.loadData();
	}


	hide(){

		this.setStyle("flex" , 0);
		this.setStyle("padding" , "0px");
		this.setStyle("display" , "none");


	}

	show(data = false){

		this.setStyle("flex" , 1);
		this.setStyle("padding" , "10px");
		this.setStyle("display" , "");

		if(data){
			this.jsTree.openNode(data.data);
		}


	}


}