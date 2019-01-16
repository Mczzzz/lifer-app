import superViews from "../../../superViews.js";

export default class button extends superViews{ 
	

	constructor( MyClass,path,prepend = false,callback = false){

		super( MyClass , path);


		this.init();


	}


	init(){


		this.setStyle("display" , "flex");
		this.setStyle("alignItems" , "center");
		
		this.createPicto();

	}



	createPicto(){

		this.Picto = {};
		this.Picto.Symbol = "arrow_forward";

		this.i = document.createElement("i");
		this.i.className         = "material-icons";

		this.setStylePicto("color","green");
		this.setStylePicto("fontSize","25px");
		this.setStylePicto("marginRight","15px");
		this.setStylePicto("userSelect","none");

		this.setData(this.Picto.Symbol);

		this.container.append(this.i);

	}



	getElement(){

		return this.container;

	}



	setData(data){


		this.i.innerHTML = "";


		if (!(data instanceof Object)){

			this.Picto.Symbol = data;

			this.i.append(this.Picto.Symbol);

		}else{

			this.Picto.Symbol = data.picto;

			if(data.fontType == "material-icons"){

				this.i.append(this.Picto.Symbol);

			}else{

				this.i.className  = this.Picto.Symbol;

			}

		}

	}



	setStylePicto(property,value,scope = "all"){

		if(scope == "property" || scope == "all") this.Picto[property] = value;
     	
     	if(scope == "element" || scope == "all" ) this.i.style[property] = value;

 
    }


}