import superViews from "../../../common/superViews.js";
//import BreadcrumbCommon from '../../../elements/common/ui/breadcrumb.js';
import Card from "../../../common/ui/card.js";

export default class breadcrumb extends superViews{
	

	constructor( MyClass,path){

		super( MyClass,path);
		
		this.init();

	}
	
	init(){

		this.setStyle("background" , "#ffffff");
		this.setStyle("display" , "none");

	}



	BackToMe(e, data,element){

		let res = {};
		res.element = element;
		res.Event = {};
		res.Event.type = "select";
		res.data = data
		
		this.callBackToParent(res);

	}



	//PUBLICS

	populate(datas){

		this.container.innerHTML = null;
		console.log(datas);

		this.card = new Card('BreadCrumbCard', this.path);
	
		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "0px");
		this.card.setStyle("margin", "0px");
		this.card.setStyle("padding", "5px");
		this.card.setStyle("background", "transparent");
		this.card.setStyle("overflowX", "scroll");


			let ObjectsBreadcrumbElement   = this.card.setElement("ObjectsBreadcrumbElement");
			ObjectsBreadcrumbElement.setStyle("justifyContent","flex-start");


			for(let node of datas) {

				let className = "addBreadcrumbChild_"+node.id;

				let TheClassName = this.card.push("TextButton",ObjectsBreadcrumbElement,className, node.text);

					TheClassName.setStyle("fontSize","15px");
					TheClassName.setStyle("fontFamily","'Titillium Web',sans-serif,Arial,sans-serif");
					TheClassName.setStyle("whiteSpace","nowrap");
					TheClassName.setStyle("color","white");
					TheClassName.setStyle("alignItems","center");
					TheClassName.setStyle("borderRadius","4px 12px 4px 4px");
					TheClassName.setStyle("background","#0288d1");
					TheClassName.setStyle("padding","5px");
					TheClassName.setStyle("marginRight","5px");
					TheClassName.setStyle("opacity","1");


				TheClassName.getContainer().addEventListener("click",(e)=>this.BackToMe(e,node,"breadcrumb"));

			}


	}


	hide(){

		this.setStyle("display" , "none");

	}

	show(){

		this.setStyle("display" , "");

	}




}