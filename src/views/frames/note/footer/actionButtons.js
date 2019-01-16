import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

import { LoaderImage } from '../../../../services/LoaderImage.js';

export default class ActionButtons extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);

		this.ServImgLoader = LoaderImage;

		this.init();

		
		this.Empty = this.parentThis.parentThis.Main.Empty;

	}


	init(){

		this.setStyle("overflow-y", "scroll");

		this.card = new Card('Card', this.path);
	
		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "0px");
		this.card.setStyle("margin", "0px");
		//this.card.setStyle("padding", "10px");
		this.card.setStyle("background", "transparent");


			let Elt   = this.card.setElement("footer");
			Elt.setStyle("justifyContent","flex-start");

					

					let text = this.card.push("Button", Elt,"textElt", "text_fields");

					text.setStylePicto("fontSize","25px");
					text.setStylePicto("color","blue");
					text.setStylePicto("alignItems","center");
					text.setStylePicto("marginLeft","15px");

					text.getContainer().addEventListener("click",()=>this.Start("text"));



					let camera = this.card.push("Button", Elt,"Photo", "camera_alt");

					camera.setStylePicto("fontSize","25px");
					camera.setStylePicto("color","green");
					camera.setStylePicto("alignItems","center");
					camera.setStylePicto("marginLeft","15px");

					camera.getContainer().addEventListener("click",()=>this.Start("image"));
					//camera.getContainer().addEventListener("click",()=>this.StartCamera("image",true));


					let sep0 = this.card.push("Button", Elt,"sep1", "more_vert");

					sep0.setStylePicto("fontSize","25px");
					sep0.setStylePicto("margin","5px");
					sep0.setStylePicto("color","#cfcfcf");
					sep0.setStylePicto("alignItems","center");




					let Ressource = this.card.push("Button", Elt,"addRessource", "playlist_add");

					Ressource.setStylePicto("fontSize","25px");
					Ressource.setStylePicto("color","green");
					Ressource.setStylePicto("alignItems","center");
					Ressource.setStylePicto("marginLeft","15px");

					Ressource.getContainer().addEventListener("click",()=>this.startNewRessource());




				/*	let videocam = this.card.push("Button", Elt,"Videocam", "videocam");

					videocam.setStylePicto("fontSize","25px");
					videocam.setStylePicto("color","green");
					videocam.setStylePicto("alignItems","center");

					videocam.getContainer().addEventListener("click",()=>this.StartCamera("video",true));
*/



				/*	let micro = this.card.push("Button", Elt,"Mic", "mic");

					micro.setStylePicto("fontSize","25px");
					micro.setStylePicto("color","green");
					micro.setStylePicto("alignItems","center");
					micro.setStylePicto("marginRight","0px");

					micro.getContainer().addEventListener("click",()=>this.StartCamera("audio",true));
*/

					////////////
					let sep1 = this.card.push("Button", Elt,"sep1", "more_vert");

					sep1.setStylePicto("fontSize","25px");
					sep1.setStylePicto("margin","5px");
					sep1.setStylePicto("color","#cfcfcf");
					sep1.setStylePicto("alignItems","center");
					//////////////



					let photo = this.card.push("Button", Elt,"Gallery", "photo");

					photo.setStylePicto("fontSize","25px");
					photo.setStylePicto("color","orange");
					photo.setStylePicto("alignItems","center");

					photo.getContainer().addEventListener("click",()=>this.StartCamera("image"));



		/*			let video = this.card.push("Button", Elt,"Video", "movie");

					video.setStylePicto("fontSize","25px");
					video.setStylePicto("color","orange");
					video.setStylePicto("alignItems","center");

					video.getContainer().addEventListener("click",()=>this.StartCamera("video"));
*/



				/*	let musique = this.card.push("Button", Elt,"Musique", "music_video");

					musique.setStylePicto("fontSize","25px");
					musique.setStylePicto("color","orange");
					musique.setStylePicto("alignItems","center");
					musique.setStylePicto("marginRight","0px");

					musique.getContainer().addEventListener("click",()=>this.StartCamera("audio"));*/



					///////////////
					let sep2 = this.card.push("Button", Elt,"sep2", "more_vert");

					sep2.setStylePicto("fontSize","25px");
					sep2.setStylePicto("margin","5px");
					sep2.setStylePicto("color","#cfcfcf");
					sep2.setStylePicto("alignItems","center");
					///////////////


					let number = this.card.push("Button", Elt,"Numbers", "looks_5");

					number.setStylePicto("fontSize","25px");
					number.setStylePicto("color","blue");
					number.setStylePicto("alignItems","center");

					number.getContainer().addEventListener("click",()=>this.Start("number"));


/*
					let todoList = this.card.push("Button", Elt,"todoList", "list");

					this.card.setStylePictoComponent(Elt,"todoList","fontSize","25px");
					this.card.setStylePictoComponent(Elt,"todoList","color","blue");
					this.card.setStylePictoComponent(Elt,"todoList","alignItems","center");*/



					

/*
button	Defines a clickable button (mostly used with a JavaScript to activate a script)
checkbox	Defines a checkbox
-color	Defines a color picker
-date	Defines a date control (year, month, day (no time))
-datetime-local	Defines a date and time control (year, month, day, time (no timezone)
-email	Defines a field for an e-mail address
file	Defines a file-select field and a "Browse" button (for file uploads)
hidden	Defines a hidden input field
image	Defines an image as the submit button
-month	Defines a month and year control (no timezone)
-number	Defines a field for entering a number
-password	Defines a password field
radio	Defines a radio button
-range	Defines a range control (like a slider control)
reset	Defines a reset button
-search	Defines a text field for entering a search string
submit	Defines a submit button
-tel	Defines a field for entering a telephone number
-text	Default. Defines a single-line text field
-time	Defines a control for entering a time (no timezone)
-url	Defines a field for entering a URL
-week	Defines a week and year control (no timezone)

*/

}


Start(type){

	this.Empty.show(type);

}


startNewRessource(){

	this.Empty.addRessource();

}

/*StartNumber(type){

//il faut changer le type de empty
		this.numberLauncher = document.createElement("input");
		this.numberLauncher.type = type;

		this.numberLauncher.min = 5;
		this.numberLauncher.max = 98;
		this.numberLauncher.step = 3;
		this.numberLauncher.value = 53;

		//this.numberLauncher.style.display = "none";
		this.container.append(this.numberLauncher);
		this.numberLauncher.click();


	}*/




	StartCamera(type,capture = false){


		this.camLauncher = document.createElement("input");
		this.camLauncher.type = "file";
		this.camLauncher.accept = type+"/*";

		if(capture){
			this.camLauncher.capture = "camera";	
		}

		this.camLauncher.style.display = "none";
		this.container.append(this.camLauncher);
		this.camLauncher.click();
	
		this.camLauncher.addEventListener("change", ()=>this.ServImgLoader.importPict(this.camLauncher.files[0]));


	}



}
