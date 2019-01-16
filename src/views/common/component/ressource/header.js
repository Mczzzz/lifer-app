import superViews from "../../superViews.js";

import Dropdown from "../dropdown.js";

import Card from "../../ui/card.js";

export default class HeaderRessource extends superViews{ 
     

     constructor(MyClass,path,prepend = false){

          super( MyClass , path);

          this.init();

          this.callBack = [];


        
        this.clicked = function (event) {

		      this.closeDropDown();

		}


     }



     init(){


     	this.firstClick = true;

     	this.card = new Card('Card', this.path);
	
		this.card.setStyle("borderWidth", "0px");
		this.card.setStyle("borderRadius", "0px");
		this.card.setStyle("margin", "0px");
		this.card.setStyle("padding", "0px");
		this.card.setStyle("background", "linear-gradient(45deg, rgb(73, 50, 144) 0%, rgb(43, 46, 144) 100%)");

    this.card.setCallBack("keyup",this.path, 'updateTitle');



		let HeaderElement = this.card.setElement("Element");
		HeaderElement.setStyle("justifyContent","space-between");
		HeaderElement.setStyle("alignItems","center");



				let colButton = this.card.push("Button", HeaderElement,"collapse", "keyboard_arrow_down");

				colButton.setStylePicto("fontSize","25px");
				colButton.setStylePicto("margin","0px");
				colButton.setStylePicto("marginLeft","5px");
				colButton.setStylePicto("color","white");
				colButton.setStylePicto("alignItems","center");

				colButton.getContainer().addEventListener("click",()=>this.colMain(colButton));






				this.Title = this.card.push("Text",HeaderElement,"Title","");

				this.Title.setStyle("placeholder","Ma Ressource...");
				this.Title.setStyle("fontSize","18px");
				this.Title.setStyle("color","grey");
				this.Title.setStyle("fontWeight","bold");
        this.Title.setStyle("flex","1");




        this.collapseButton = this.card.push("Button", HeaderElement,"fold", "unfold_less");

        this.collapseButton.setStylePicto("fontSize","25px");
        this.collapseButton.setStylePicto("margin","0px");
        this.collapseButton.setStylePicto("marginRight","10px");
        this.collapseButton.setStylePicto("color","white");
        this.collapseButton.setStylePicto("alignItems","center");



        this.collapseButton.getContainer().addEventListener("click",()=>this.collapse());
        //collapseButton.getContainer().addEventListener("click",()=>obj.collapseAll());




				let ddButton = this.card.push("Button", HeaderElement,"sep1", "more_vert");

				ddButton.setStylePicto("fontSize","25px");
				ddButton.setStylePicto("margin","0px");
				ddButton.setStylePicto("marginRight","10px");
				ddButton.setStylePicto("color","white");
				ddButton.setStylePicto("alignItems","center");


				ddButton.getContainer().addEventListener("click",()=>this.initDropDown());




     }


      updateTitle(e,title){

          this.parentThis.setTitle(title.text, true);

      }




     setTitle(title){

      this.Title.setData(title);

     }


     collapse(){

        let obj = this.getObjectThisfromPath("Frame-Note-Main-Empty-Ressource-Main");
        let doneCollapsed = obj.collapseAll();

        if(doneCollapsed){
          this.collapseButton.setData("unfold_more");
        }else{
          this.collapseButton.setData("unfold_less");
        }
        

     }

    initDropDown(){

//    	console.log('initDropdown');

    	this.menu = new Dropdown("dropdown",this.path);

    	let position = {};
    	position.top = this.getContainer().getBoundingClientRect().y;
    	position.right = 0;

    	this.menu.setPosition(position);

    	let items = [];
    	items.push({'id':0,'picto':"share","text":"partage"});
    	//items.push({'id':1,'picto':"","text":"selection"});
    	items.push({'id':1,'picto':"delete","text":"supprimer"});
    	items.push({'id':2,'picto':"add_alarm","text":"evenement"});
    	items.push({'id':3,'picto':"more_horiz","text":"Item Action"});
    	items.push({'id':4,'picto':"check_box_outline_blank","text":"checkbox"});
    	items.push({'id':5,'picto':"unfold_less","text":"minimize","actionObj":"Frame-Note-Main-Empty-Resource-Main","method":"collapseAll"});
    	//gerer le maximize : unfold_more


    	this.menu.setItems(items);

    	this.CDP = 

    	this.clickHandler = this.clicked.bind(this);
		document.addEventListener("click",this.clickHandler);

    }



    closeDropDown(){


  //    console.log("CloseMenu");

      if(this.firstClick == false){

        this.menu.destroyMe();
        document.removeEventListener("click", this.clickHandler);
        this.firstClick = true;

      }else{

      	this.firstClick = false;

      }

    }




    colMain(colButton){


  //TODO : PAS PROPRE DU TOUT DU TOUT
    	let Empty = this.getObjectThisfromPath(this.parentThis.parentThis.path);

    	if(Empty.FrameFocus()){

    		colButton.setData("keyboard_arrow_down");
        this.collapseButton.setStyle("display", "");

    	}else{

    		colButton.setData("keyboard_arrow_up");
        this.collapseButton.setStyle("display", "none");

    	}
    	
    	

    	


    }


}









 