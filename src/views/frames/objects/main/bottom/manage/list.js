import LoaderCollection from '../../../../../../services/LoaderCollection.js';
import superViews from "../../../../../common/superViews.js";

import Card from "../../../../../common/ui/card.js";

export default class list extends superViews{


	constructor(MyClass,path){


		super(MyClass,path);
		
		this.init();

	}
	

	init(){

		this.collection = new LoaderCollection('ObjectInfos');

		this.setStyle("display" , "flex");
		this.setStyle("flexDirection" , "column");
		this.setStyle("maxHeight" , "150px");
		this.setStyle("height" , null);

	}


	getList(){

		this.container.innerHTML ="";

		let ContainerNode = this.Lifer.getData("Objects","ContainerNode");
		let LeafNode = this.Lifer.getData("Objects","LeafNode");

		let ListInfos = this.collection.getList(ContainerNode.id,LeafNode.id);


	    for (let info of ListInfos){



			let card = new Card('Card_'+info.infos.id, this.path);
				
				card.setStyle("borderWidth", "0px");
				card.setStyle("borderRadius", "0px");
				card.setStyle("margin", "0px");
				card.setStyle("padding", "5px");
				card.setStyle("background", "transparent");


					let ObjectsInfosCardElement  = card.setElement("ObjectsInfosCardElement_" + info.infos.id);
					ObjectsInfosCardElement.setStyle("justifyContent","flex-start");

							let text = card.push("Text", ObjectsInfosCardElement,"ObjectsInfosCardElementItem_" + info.infos.id, info.infos.name);

							text.setStyle("fontSize","15px");
							text.setStyle("color","white");
							text.setStyle("alignItems","center");


		}


	}


	//PUBLICS

	show(){

		this.setStyle("height" , null);
		
	}


	hide(){

		this.setStyle("height" , "0px");
		
	}




}