import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

export default class HeaderButtons extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);


		this.init();
		
	}


	init(){

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


					//		console.log('in show title');

					this.TheTitle = this.card.push("Text", this.HeaderElement,"Title", "");



					this.TheTitle.setAttribute("placeholder","Titre Note...");

					this.TheTitle.setStyle("fontSize","22px");
					this.TheTitle.setStyle("color","black","all");
					this.TheTitle.setStyle("fontWeight","bold");
					this.TheTitle.setStyle("margin","0px");
					this.TheTitle.setStyle("width","100%");

					this.TheTitle.setStyle("display", "none");


					let sep1 = this.card.push("Button", this.HeaderElement,"sep1", "more_vert");

					sep1.setStylePicto("fontSize","25px");
					sep1.setStylePicto("margin","0px");
					sep1.setStylePicto("marginRight","0px");
					sep1.setStylePicto("color","grey");
					sep1.setStylePicto("alignItems","center");



/*				if(this.Lifer.getData('Frame-Note',"This").note.guid != false){

					this.showTitle();


				}*/




				/*	this.card.push("Button", HeaderElement,"NoteHeaderLogo", "widgets");

					this.card.setStylePictoComponent(HeaderElement,"NoteHeaderLogo","fontSize","25px");
					this.card.setStylePictoComponent(HeaderElement,"NoteHeaderLogo","marginRight","0px");
					this.card.setStylePictoComponent(HeaderElement,"NoteHeaderLogo","color","green");
					this.card.setStylePictoComponent(HeaderElement,"NoteHeaderLogo","alignItems","center");*/



	}



	showTitle(text = ""){

		this.TheTitle.setStyle("display", "");
		this.TheTitle.getContainer().innerHTML = text;

	}


	updateTitle(e,title){

    	this.parentThis.parentThis.setTitle(title.text, true);
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
