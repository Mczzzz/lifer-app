import { Lifer } from '../../services/Lifer.js';
//import { DBLocal } from '../../services/DBLocal.js';

import Moment from 'moment';
import 'moment/locale/fr';

export default class views {
	

	constructor(MyClass,path,prepend = false){



		this.Lifer = Lifer;

Moment.locale('fr');

		this.Moment = Moment;		


		this.MyClass = MyClass;

		this.parentThis = (path)? this.getObjectThisfromPath(path) : false;

		this.parent = (this.parentThis)? this.parentThis.getContainer() : document.body;

		this.path = (this.parentThis)? this.parentThis.path+"-"+this.MyClass : this.MyClass;


		this.Lifer.addMe(this.path);

		this.superInit(prepend);

		this.Lifer.addData(this.path,[{"This" : this}]);


	}



	superInit(prepend){


		if(document.getElementsByClassName(this.path)[0] !== undefined){

			this.container = document.getElementsByClassName(this.path)[0];

		}else{

			this.container = document.createElement("div");
			this.container.className = this.path;

			if(prepend){
				this.parent.prepend(this.container);
			}else{
				this.parent.append(this.container);
			}
			

		}




/*		//auto creation des ids
		let arrayId = this.MyClass.split("_");

		if(typeof arrayId[1] === 'undefined') {

			this.ClassId = "";
		}
		else {
			this.ClassId = arrayId[1];
//			console.log(this.ClassId);
		}*/






		this.initListener();

	}


	getContainer(){

		return this.container;

	}


	//property : x, y , width, height, top, left, bottom, right ...
	getContainerRect(property){

			
		let boxShadow = this.container.style.boxShadow;
		let padding = this.container.style.padding;
		let margin = this.container.style.margin;
		let border = this.container.style.border;

		
		let transDur = this.container.style.transitionDuration;
   		let transDel = this.container.style.transitionDelay;
    	let transTim = this.container.style.transitionTimingFunction;
    	let transProp = this.container.style.transitionProperty;


		this.container.style.transitionDuration = null;
   		this.container.style.transitionDelay = null;
    	this.container.style.transitionTimingFunction = null;
    	this.container.style.transitionProperty = null;

		if(property == "height"){

			this.container.style.boxShadow = null;
			this.container.style.padding = null;
			this.container.style.margin = null;
			this.container.style.border = null;			
		
		}		


		let toReturn = this.container.getBoundingClientRect()[property];


		if(property == "height"){

        	this.container.style.boxShadow = boxShadow;
			this.container.style.padding = padding;
			this.container.style.margin = margin;
			this.container.style.border = border;
		
		}

		return toReturn;

	}



	setStyle(property,value,scope = "all"){

		if(scope == "property" || scope == "all") this[property] = value;
     	
     	if(scope == "element" || scope == "all" ) this.container.style[property] = value;
     		       

    }


	setAttribute(property,value,scope = "all"){

		if(scope == "property" || scope == "all") this[property] = value;

		if(scope == "element" || scope == "all" )  this.container.setAttribute(property,value);
    }


    removeAttribute(attribute){

    	this.container.removeAttribute(attribute);

    }



    destroyMe(){

    	this.Lifer.destroy(this.path);
    	this.container.remove();
    	


    }


	initListener(){
  
	    this.container.addEventListener('callBack', (data) => this.callBack(data));

	}


    callBack(data){

	//	console.log(data);

		let methode = "on_"+data.detail.element+"_"+data.detail.Event.type;
		//console.log(methode);
		this[methode](data.detail);

	}


	callBackToParent(data){

		let ev = new CustomEvent('callBack', {'detail' : data});
        this.parent.dispatchEvent(ev);

	}


	setId(id){
	//	console.log(id);
          this.container.id = id;

     }


    isTmpId(){

    	if(this.container.id.indexOf("tmp-") == 0 ) return true;

    	return false; 
    }


    getId(){

    	return this.container.id;

    }


    //pourquoi ici ce serait plutot une fonction lifer à premiere vue
    getObjectThisfromPath(path){

    	return this.Lifer.getData(path,"This");
    }
    



    initTouch(path, callback){


	  this.touchCaller = this.getObjectThisfromPath(path);
	  this.touchCallerMethod = callback;

	  this.getContainer().addEventListener("touchstart", (e)=>this.touchHandle(e,"start"), false);

      this.getContainer().addEventListener("touchmove", (e)=>this.touchHandle(e,"move"), false);

      this.getContainer().addEventListener("touchend", (e)=>this.touchHandle(e,"stop"), false);


	}


 	touchHandle(e,type){

 		this.touchCaller[this.touchCallerMethod](e,type);

    }






}