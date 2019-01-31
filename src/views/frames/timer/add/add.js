import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

export default class Add extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);


		this.init();
		
	}


	init(){

		console.log("addTimerInit");
		this.setStyle("position" , "absolute");
		this.setStyle("top" , "0px");
		this.setStyle("left" , "0px");
		this.setStyle("height" , "100%");
		this.setStyle("width" , "100%");
		this.setStyle("display" , "flex");
		this.setStyle("flexDirection" , "column");
		this.setStyle("background" , "red");
		//this.setStyle("zIndex" , 10000);




		this.card = new Card('Card', this.path);
	

		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "0px");
		this.card.setStyle("margin", "0px");
		this.card.setStyle("padding", "10px");
		this.card.setStyle("background", "transparent");

//Peut etre a revoir car c'est la card qui me renvoi ça pour le moment
		this.card.setCallBack("keyup",this.path, 'updateTitle');

			this.HeaderElement   = this.card.setElement("Header");
			this.HeaderElement.setStyle("justifyContent","space-between");
			this.HeaderElement.setStyle("alignItems","center");


					let HeaderBackButton = this.card.push("Button", this.HeaderElement,"Back", "keyboard_backspace");

					HeaderBackButton.setStylePicto("fontSize","25px");
					HeaderBackButton.setStylePicto("color","green");
					HeaderBackButton.setStylePicto("alignItems","center");

					HeaderBackButton.getContainer().addEventListener("click",()=>this.CloseMe());


	}



	CloseMe(){

	let DeviceWidth = this.Lifer.getData("User-Device","Screen").width;

	let time = 300;


		this.parentThis.parentThis.getContainer().animate([
		  // keyframes
		  { transform: 'translateX(0px)' }, 
		  { transform: 'translateX('+DeviceWidth+'px)' }
		], { 
		  // timing options
		  duration: time+100,
		  easing : 'ease-in-out',
		  iterations: 1
		});

		setTimeout(()=>this.changeRoute(), time);


	}



	changeRoute(){

		this.parentThis.parentThis.destroyMe();

		let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Home'}});
		window.dispatchEvent(LinkEvent);

	}



}
