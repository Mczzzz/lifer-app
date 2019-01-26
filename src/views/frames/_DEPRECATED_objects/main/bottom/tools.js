import superViews from "../../../../common/superViews.js";
import Search from './tools/search.js';

export default class tools extends superViews{


	constructor( MyClass,path){


		super(MyClass,path);

		this.init();

	}


	init(){

		this.initChilds();

	}


	initChilds(){

		this.search = new Search("search",this.path);

	}




}