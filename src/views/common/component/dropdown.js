import superViews from "../superViews.js";

import Card from "../ui/card.js";

export default class dropdown extends superViews{ 
     

     constructor(MyClass,path,prepend = false){

          super( MyClass , path);

          this.init();

          this.callBack = [];

          this.active = false;

     }



     init(){

      
          this.setStyle("position", "absolute");


          this.card = new Card('Card', this.path);
  
          this.card.setStyle("borderWidth", "0px");
          this.card.setStyle("borderRadius", "0px");
          this.card.setStyle("margin", "0px");
          this.card.setStyle("padding", "10px");
          this.card.setStyle("background", "blue");
          
    

     }


     

     setPosition(position){

      this.setStyle('top', position.top+"px");
      this.setStyle('right', position.right+"px");      


     }


      setItems(Items){


      for (let item of Items){

        let Element  = this.card.setElement("Elt_"+item.id);

        //Element.setStyle("justifyContent","space-between");
        Element.setStyle("justifyContent","flex-start");

          let ddPicto = this.card.push("Button", Element,"Button_"+item.id, item.picto);
          let ddButton = this.card.push("TextButton", Element,"TxtButton_"+item.id, item.text);


          if(item.actionObj){

            let obj = this.getObjectThisfromPath(item.actionObj);
            ddButton.getContainer().addEventListener("click",()=>obj[item.method]());

          }


          

      }

    }






}









 