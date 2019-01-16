import superViews from "../../../superViews.js";

export default class TextButton extends superViews{ 
	

	constructor( MyClass,path,prepend = false,callback = false){

		super( MyClass , path);

		this.init();

	}


	init(){

		this.setStyle("display" , "flex");
		this.setStyle("alignItems" , "center");


	}



    setData(text){

          this.container.innerHTML = text;

    }


}