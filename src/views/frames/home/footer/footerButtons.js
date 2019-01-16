import superViews from "../../../common/superViews.js";

import Card from "../../../common/ui/card.js";

export default class FooterButtons extends superViews{
	

	constructor( MyClass , path){

		super( MyClass , path);





//		this.deferredPrompt;

		window.addEventListener('beforeinstallprompt', function (e) {
		  // Prevent Chrome 67 and earlier from automatically showing the prompt
		  e.preventDefault();
		  // Stash the event so it can be triggered later.
		 this.deferredPrompt = e;
		 console.log("IN DEFFFFFEREDD TO PROMPTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
		//  this.showAddToHomeScreen();

		setTimeout(()=>this.prompt(), 1000);



		});



 

/*
window.addEventListener("beforeinstallprompt", function(e) { 
  // log the platforms provided as options in an install prompt 
  console.log(e.platforms); // e.g., ["web", "android", "windows"] 
  e.userChoice.then(function(outcome) { 
    console.log(outcome); // either "accepted" or "dismissed"
  }, handleError); 
});


*/

		this.init();


		
	}


	prompt(){

		console.log('in prompt');
		this.deferredPrompt.prompt();

	}


	init(){

		this.card = new Card('Card', this.path);
	
		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "0px");
		this.card.setStyle("margin", "0px");
		this.card.setStyle("padding", "10px");
		this.card.setStyle("background", "transparent");


			let Elt = this.card.setElement("Element");
			Elt.setStyle("justifyContent","flex-start");



				let StartNote = this.card.push("Button", Elt,"AddNote", "note_add");

					StartNote.setStylePicto("fontSize","25px");
					StartNote.setStylePicto("marginRight","0px");
					StartNote.setStylePicto("color","green");
					StartNote.setStylePicto("alignItems","center");

					StartNote.getContainer().addEventListener("click",()=>this.StartNote());



					///////////////
					let sep1 = this.card.push("Button", Elt,"sep1", "more_vert");

					sep1.setStylePicto("fontSize","25px");
					sep1.setStylePicto("margin","5px");
					sep1.setStylePicto("color","#cfcfcf");
					sep1.setStylePicto("alignItems","center");
					//////////////





				let FooterObjectButton = this.card.push("Button", Elt,"toObjects", "widgets");

					FooterObjectButton.setStylePicto("fontSize","25px");
					FooterObjectButton.setStylePicto("color","green");
					FooterObjectButton.setStylePicto("alignItems","center");

					FooterObjectButton.getContainer().addEventListener("click",()=>this.addToHomeScreen());


	}


	StartNote(){

		let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Note'}});
		window.dispatchEvent(LinkEvent);

	}


	goToObject(){

		let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Objects'}});
		window.dispatchEvent(LinkEvent);

	}







/*	showAddToHomeScreen() {

	  let a2hsBtn = document.querySelector(".ad2hs-prompt");

	  a2hsBtn.style.display = "block";

	  a2hsBtn.addEventListener("click", addToHomeScreen);

	}*/




	addToHomeScreen() { 
//	var a2hsBtn = document.querySelector(".ad2hs-prompt");  // hide our user interface that shows our A2HS button
//  a2hsBtn.style.display = 'none';  // Show the prompt
  this.deferredPrompt.prompt();  // Wait for the user to respond to the prompt
  this.deferredPrompt.userChoice
    .then(function(choiceResult){

  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
  } else {
    console.log('User dismissed the A2HS prompt');
  }

  this.deferredPrompt = null;

});}









}
