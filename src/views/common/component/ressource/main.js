import superViews from "../../superViews.js";

import Card from "../../ui/card.js";

import Text   from "./main/text.js";
import Number from "./main/number.js";
import Image from "./main/image.js";

export default class MainRessource extends superViews{ 


	constructor(MyClass,path,prepend = false){

		super( MyClass , path);

		this.init();

		this.callBack = [];

		this.collapsed = false;

		this.inMovement = false;
		this.speed = 1;

		this.resizeMoveTo = 0;

		this.skipResizeFirst = 0;

		this.ChildId = 0;
	}



	init(){

		this.setStyle("borderWidth", "0px");
		this.setStyle("borderRadius", "0px");
		this.setStyle("margin", "0px");
		this.setStyle("padding", "0px");
		this.setStyle("background", "linear-gradient(45deg, rgb(250, 250, 250) 0%, rgb(248, 248, 248) 100%)");
		this.setStyle("overflowY" , "scroll");
		this.setStyle("maxHeight" , this.Lifer.getScreenSize().height - 123 +"px");
		//console.log('in init');

		window.addEventListener('resize', ()=>this.resize());



	}


	resize(elt = false){
     	//console.log('####### resize #######');

     	//prevention double resize ()je sais pas pourquoi exactement diff de 48 pixel 
     	if(this.skipResizeFirst == 0){
     		console.log('####### resize SKIP #######');
     		this.skipResizeFirst = 1;
     		return true;
     	}else if(this.skipResizeFirst == 1){
     		console.log('####### resize EXECUTE #######');
     		this.skipResizeFirst = 0;
     	}
     	


     	let deviceHeight = this.Lifer.getScreenSize().height;

     	console.log(deviceHeight);

     	let initialDevice = this.Lifer.getData("User-Device", "Screen");

     	let mainSize =  deviceHeight - 123;

     	this.setStyle("maxHeight" , mainSize +"px");
     	
     	console.log(this.resizeMoveTo);


     	if(initialDevice.height > deviceHeight){

     		console.log('in with keyboard');

     		this.container.scrollTop = this.resizeMoveTo;

     		this.resizeMoveTo = 0;
     		
     	}


    }



     addItem(type,itemId,anew = false){

     	let res;

     	switch (type){

     		case 'text':

     		res = this.text(itemId);

     		break;

     		case 'number':

     		res = this.number(itemId);

     		break;

     		case 'image':

     		res = this.image(itemId,anew);

     		break;

			//default:

		}


		return res;

	}




	text(itemId){

		let callBack = {};
		callBack.path = this.parentThis.path;
		callBack.method = "callBackDataTo";

		let text = new Text("Text_"+this.ChildId, this.path,false,callBack,itemId);
		let textElt = text.getTextElement();
		text.draggable(this.path,"onChildMove");



		this.resizeMoveTo = text.getContainer().offsetTop;

		text.focus();

		this.ChildId++;

		return text;

	}



	number(itemId){

		let number = new Number("Number_"+this.ChildId, this.path);
		number.draggable(this.path,"onChildMove");


		this.ChildId++;

		return number;


	}


	image(itemId,anew = false){

		let callBack = {};
		callBack.path = this.parentThis.path;
		callBack.method = "callBackDataTo";


		let image = new Image("Image_"+this.ChildId, this.path,false,callBack,itemId);
		
		//console.log("anew"+anew);
		if(anew){
			image.launchCam();
		}
		
		let textElt = image.getTextElement();
		image.draggable(this.path,"onChildMove");

		this.ChildId++;

		return image;


	}


	getChilds(node){

		let allNodes = this.getContainer().childNodes;
		
		let ArrayChilds = [];

		let begin = false;

		for (let child of allNodes) {


			if(child == node){

				begin = true;
				continue;
			}


			if((parseInt(child.style.marginLeft, 10) > parseInt(node.style.marginLeft, 10)) && begin == true){

		  	ArrayChilds.push(child);


		  }else{

		  	begin = false;

		  }



		}

		return ArrayChilds;

	}


	collapsingNode(node){

		let children = this.getChilds(node);




		let locker = false
		let state  = "";

		for (let child of children) {

			let ThisChild = this.getObjectThisfromPath(child.className);

			if(locker == false){

				if(child.style.display == "none"){

					state = "";
				}else{
					state = "none";
				}

				locker = true;
			}

			child.style.display = state;





		}

		this.collapserSetter();

	}


	indentChilds(node,childrenList = false){

		let children;

		if(!childrenList){

			children = this.getChilds(node);

		}else{

			children = childrenList;

		}
		
		if(children.length){
			//calcul de la différence
			let diff = (parseInt( node.style.marginLeft ,10) + this.Pas) - (parseInt( children[0].style.marginLeft ,10));

			let childPosition;

			for (let child of children) {


				childPosition = parseInt(child.style.marginLeft ,10) + diff;

				if(childPosition < this.pas) childPosition = this.Pas;

				child.style.marginLeft = childPosition + "px";

			}
		}

	}


	moveChilds(node,childrenList){
/*		console.log("in chid to move");
		console.log(node);
		console.log(childrenList);
		console.log(node.nextElementSibling);*/
		let next = false;

		if(node.nextElementSibling){

			next = node.nextElementSibling;

		}
		

		for (let child of childrenList) {

			if(next){

				node.parentElement.insertBefore(child,next);

			}else{

				node.parentElement.appendChild(child);

			}


			child.style.visibility = "";


		}


	}


	collapserSetter(){

	//	console.log('in collapserSetter');

	if (this.getContainer().hasChildNodes()) {

		let childrens = this.getContainer().childNodes;

		for (let child of childrens) {

			if(child.nextElementSibling){

				if(parseInt(child.nextElementSibling.style.marginLeft,10) > parseInt(child.style.marginLeft,10)){

					let ThisChild = this.getObjectThisfromPath(child.className);

					if(child.nextElementSibling.style.display == "none"){

						ThisChild.moreCollapse();

					}else{

						ThisChild.lessCollapse();
					}


				}

			}

		}

	}

}





collapseAll(){

	if (this.getContainer().hasChildNodes()) {

		let childrens = this.getContainer().childNodes;

		for (let child of childrens) {

			if(parseInt(child.style.marginLeft, 10) > 0){

				if(!this.collapsed){
					child.style.display = "none";


				}else{

					child.style.display = "";
				}




			}

		}

		this.collapserSetter();

		if(!this.collapsed){

			this.collapsed = true;

		}else{

			this.collapsed = false;

		}

		return this.collapsed;

	}


}


moveLikePromise(direction){

	this.inMovement = true;

	this.movementId = setInterval(()=> this.moveScrollTop(direction) , 10 );


}


moveScrollTop(direction,speed){

	console.log(direction);
	if(direction == "up"){

		this.container.scrollTop = this.container.scrollTop - this.speed;
		this.speed = this.speed + 0.05;
		if(this.container.scrollTop == 0){

			this.stopScroll();
			this.speed = 1;
		} 

	}else if(direction == "down"){

		this.container.scrollTop = this.container.scrollTop + this.speed;
		this.speed = this.speed + 0.05;


		if(this.container.scrollTop + this.container.getBoundingClientRect().height == this.container.scrollHeight){

			this.stopScroll();
			this.speed = 1;
		} 

	}



}

stopScroll(){

	clearInterval(this.movementId);
	this.inMovement = false;
}


onChildMove(childContainer, e, type){

	this.eChildMove = e;
//		console.log("on passe dans OnChildMove");
//		console.log(type);

if(type == "start"){

	let testVibration = window.navigator.vibrate([5,100,5]);

	this.childrenToMove = this.getChilds(childContainer.getContainer());
	this.insertInParents = false;


//CLONE

this.Cloned = childContainer.getContainer().cloneNode(true);
document.body.appendChild(this.Cloned);

this.Cloned.style.position = "absolute";
this.Cloned.style.width = "100%";
this.Cloned.className = childContainer.MyClass+"-Clone";
		  //this.Cloned.style.marginLeft = "0px";
		  this.Cloned.style.top = childContainer.getContainer().getBoundingClientRect().y+"px";


		  //on prends les enfants avec :
		  let childToClone = this.getChilds(childContainer.getContainer());
		  
		  this.childTomove = [];

		  let ghostHeight = childContainer.getContainer().getBoundingClientRect().height;

		  for (let child of childToClone) {

		  	let Cloned = child.cloneNode(true);
		  	document.body.appendChild(Cloned);

		  	Cloned.style.position = "absolute";
		  	Cloned.style.width = "100%";
		  	Cloned.className = child.MyClass+"-Clone";
			  //this.Cloned.style.marginLeft = "0px";
			  Cloned.style.top = child.getBoundingClientRect().y+"px";

			  this.childTomove.push(Cloned);
			  ghostHeight = ghostHeight + child.getBoundingClientRect().height;
			  //child.style.visibility = "hidden";
			  child.remove();
			}

			this.touchX = e.changedTouches[0].clientX - this.Cloned.getBoundingClientRect().x;
			this.touchY = e.changedTouches[0].clientY - this.Cloned.getBoundingClientRect().y;

			this.initMarginClone = parseInt(childContainer.getContainer().style.marginLeft, 10);
//CLONE


//GHOST
this.Ghost = childContainer.getContainer().cloneNode();
this.Ghost.style.boxShadow  = "inset rgb(121, 193, 206) 0px 0px 19px 3px";
this.Ghost.className = childContainer.MyClass+"-Ghost";
this.Ghost.style.marginTop = "5px";
this.Ghost.style.marginBottom = "5px";
this.Ghost.style.borderRadius = "15px";
this.Ghost.style.height = ghostHeight+"px";
this.Ghost.style.transitionDuration = "0.2s";
this.Ghost.style.transitionDelay = "0.0s";
this.Ghost.style.transitionTimingFunction = "cubic-bezier(0.15, -0.35, 0.98, 1.27)";
this.Ghost.style.transitionProperty = "margin";
//GHOST




childContainer.getContainer().parentElement.insertBefore(this.Ghost,childContainer.getContainer());

		  //childContainer.getContainer().style.visibility ="hidden";
		  childContainer.setStyle("display","none");



		}else if(type == "move"){

			event.preventDefault();

			if(e.changedTouches[0].clientX > this.Lifer.getScreenSize().width * 0.75){

				this.Cloned.style.background = "red";

			}else{
				this.Cloned.style.background = "";
			}

	        //on bouge le Main en cas de déplacement proches du haut
	        // de plus en plus vite
	        //this.moveMain(e,childContainer);

	        if(e.changedTouches[0].clientY - childContainer.getContainer().parentElement.getBoundingClientRect().y < 50){


	        	if(this.inMovement == false) {
	        		this.moveLikePromise("up");
	        		//console.log('this.moveLikePromise(e,childContainer);');
	        	}


	        }else if(childContainer.getContainer().parentElement.getBoundingClientRect().y + childContainer.getContainer().parentElement.getBoundingClientRect().height - e.changedTouches[0].clientY  < 50){


	        	if(this.inMovement == false) {
	        		this.moveLikePromise("down");
	        		//console.log('this.moveLikePromise(e,childContainer);');
	        	}


	        }else{
	        	this.stopScroll();
	        	this.speed = 1;
	        }





	        if(childContainer.getContainer().parentElement.getBoundingClientRect().y > e.changedTouches[0].clientY){

	        	//window.navigator.vibrate(5,100,10,100,20);
	        	return true;
	        }


	        /////////////////////////////
	        // CLONE ////////////////////
	        /////////////////////////////
	        //controle qu'on ne sort pas de la fenêtre



	        let MiddleCard = 0.5 * childContainer.getContainer().getBoundingClientRect().height;

	        this.Cloned.style.marginLeft = "0px";
	        this.Cloned.style.top = e.changedTouches[0].clientY - this.touchY+"px";
	        this.Cloned.style.left =  e.changedTouches[0].clientX - this.touchX+"px";

	        //on fait bouger les enfants aussi :) :
	        for (let childMove of this.childTomove) {

	        	childMove.style.top = e.changedTouches[0].clientY-this.touchY+"px";
	        	childMove.style.left = e.changedTouches[0].clientX - ( this.touchX + this.initMarginClone) +"px";

	        }

	        /////////////////////////////
	        //////////////////// CLONE //
	        /////////////////////////////


//MOVEMENT CONTAINER


if(childContainer.getContainer().previousElementSibling.previousElementSibling){
//console.log("childContainer.getContainer().previousElementSibling.previousElementSibling");
//console.log(childContainer.getContainer().previousElementSibling.previousElementSibling);
	        	//on regarde si mon parent à deja des enfants
	        	let isParent = this.getChilds(childContainer.getContainer().previousElementSibling.previousElementSibling).length;
	        	//console.log("IS Parent: "+isParent);
	        	//console.log(isParent);


	        	if(isParent){

	        		this.insertInParents = true;
	        	}


	        	if(e.changedTouches[0].clientY < (this.Ghost.previousElementSibling.getBoundingClientRect().y + (this.Ghost.previousElementSibling.getBoundingClientRect().height / 2))){
	         	//console.log('in previous move node');
	         	childContainer.getContainer().parentElement.insertBefore(childContainer.getContainer(),childContainer.getContainer().previousElementSibling.previousElementSibling);
	         	childContainer.getContainer().parentElement.insertBefore(this.Ghost,childContainer.getContainer());


	            //this.moveChilds(childContainer.getContainer(),this.childrenToMove);

	        }

	    }


	    if(childContainer.getContainer().nextElementSibling){

	       	//console.log('in next');

	       	if((e.changedTouches[0].clientY ) > childContainer.getContainer().nextElementSibling.getBoundingClientRect().y){
	          	//console.log('in next move node');
	          	
	          	childContainer.getContainer().parentElement.insertBefore(childContainer.getContainer(),childContainer.getContainer().nextElementSibling.nextElementSibling);
	          	childContainer.getContainer().parentElement.insertBefore(this.Ghost,childContainer.getContainer());
	          	//this.moveChilds(childContainer.getContainer(),this.childrenToMove);
	          }

	      }





//le decalage de la node principale

this.Pas = 30;

let GoodMargin = 0;


	        //si juste previous

	        //si juste next

	        //si previous + next
	        if(this.Ghost.previousElementSibling && !childContainer.getContainer().nextElementSibling){

	        	console.log("just previous");
	        	let PreviousContainerX = this.Ghost.previousElementSibling.getBoundingClientRect().x;

	        	let margin = Math.round(e.changedTouches[0].clientX / this.Pas ) * this.Pas;

	        	if(margin > (PreviousContainerX + this.Pas)){

	        		GoodMargin = PreviousContainerX + this.Pas;

	        	}else{

	        		GoodMargin = margin;

	        	}



	        }else if(!this.Ghost.previousElementSibling && childContainer.getContainer().nextElementSibling){

	        	console.log("just next");
	        	GoodMargin = 0;

	        }else if(this.Ghost.previousElementSibling && childContainer.getContainer().nextElementSibling){


	        	console.log("previous and next");
	        	let PreviousContainerX = this.Ghost.previousElementSibling.getBoundingClientRect().x;
	        	let NextContainerX = childContainer.getContainer().nextElementSibling.getBoundingClientRect().x;

	        	let margin = Math.round(e.changedTouches[0].clientX / this.Pas ) * this.Pas;


	        	if(margin > (PreviousContainerX + this.Pas)){

	        		GoodMargin = PreviousContainerX + this.Pas;

	        	}else if (margin < NextContainerX){

	        		GoodMargin = NextContainerX;

	        	}else {

	        		GoodMargin = margin;

	        	}



	        }




//Decalage principale



childContainer.setStyle("marginLeft", GoodMargin + "px");
this.Ghost.style.marginLeft = GoodMargin + "px";


        	//on illumine le parent concerné
        	let breaker = 0;
        	let myNode = this.Ghost;
        	if(this.pNode){
        		this.pNode.style.background = "";
        	}

        	this.pNode = this.Ghost.previousElementSibling;
        	do{
	        	//console.log('in do');
	        	if(this.pNode){

	        		if(this.Ghost.getBoundingClientRect().x > this.pNode.getBoundingClientRect().x){

	        			this.pNode.style.background = "orange";
	        			breaker = 1; 

	        		}else{
	        			this.pNode = this.pNode.previousElementSibling;
	        		}

	        	}else{
	        		breaker = 1;
	        	}


	        }while(breaker == 0);











        	//on move les childrens
        	this.indentChilds(childContainer.getContainer(),this.childrenToMove);




        }else if(type == "stop"){


        	childContainer.setStyle("display","");
        	this.moveChilds(childContainer.getContainer(),this.childrenToMove);
	        //childContainer.getContainer().style.visibility ="";

	        this.Cloned.remove();
	        if(this.pNode) this.pNode.style.background = "";

	        //on fait bouger les enfants aussi :) :
	        for (let childMove of this.childTomove) {

	        	childMove.remove();

	        }



	        this.Ghost.remove();

	        this.parentThis.reorder();

	        this.collapserSetter();


	    }

	}

}
