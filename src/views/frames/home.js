import superViews from "../common/superViews.js";

import Header from './home/header.js';
import Main from './home/main.js';
import Footer from './home/footer.js';


export default class Home extends superViews{



	constructor( MyClass,path){


		super( MyClass,path);

		this.init();

	}


	init(){

		this.setStyle("position" , "absolute");
		this.setStyle("top" , "0px");
		this.setStyle("left" , "0px");
		this.setStyle("height" , "100%");
		this.setStyle("width" , "100%");
		this.setStyle("display" , "flex");
		this.setStyle("flexDirection" , "column");
		this.setStyle("background" , "white");

		//this.container.style.background = 'linear-gradient(45deg, #8e24aa 0%, #ff6e40 100%)';
/*		this.setStyle("display" , "flex");
		this.setStyle("flexDirection" , "column");
		this.setStyle("height" , "100%");*/

		this.initChilds();

	}


	initChilds(){

		this.Header = new Header("Header",this.path);

		this.Main = new Main("Main",this.path);

		this.Footer = new Footer("Footer",this.path);

	}


}