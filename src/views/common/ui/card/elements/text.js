import superViews from "../../../superViews.js";

export default class Text extends superViews{ 
     

     constructor( MyClass,path,prepend = false,callback = false){

          super( MyClass , path);

          this.init();

          this.callBack = callback;

          this.ItemType = "text";

     }


     init(){


          this.container.contentEditable  = "true";

          this.setAttribute("placeholder", "Texte...");

          this.placeHodelColor = "#e0e0e0";

          this.setStyle("fontSize"   , "10px");
          this.setStyle("margin"     , "10px");
          this.setStyle("fontWeight" , "normal");
          this.setStyle("border"     , "none");
          this.setStyle("outline"    , "none");
          this.setStyle("background" , "transparent");
          this.setStyle("color"      , "black");
          this.setStyle("lineHeight" , 1);
          this.setStyle("fontFamily" , "'Titillium Web',sans-serif,Arial,sans-serif");

          this.changeColor();

           this.container.addEventListener("keyup", (e)=>this.dispatchEvents(e));

     }




     changeColor(){

          this.container.style.color = (this.container.innerHTML.length == 0)? this.placeHodelColor : this.color; 

     }


     setplaceHolderColor(color){ 


          this.placeHodelColor = color;          

     }


     //PUBLICS
     setData(text){
//          console.log('in set data');
          this.container.innerHTML = text;

     }


     getText(){

          return this.container.innerHTML;

     }



    dispatchEvents(e){


          if(this.callBack != false){

               let data   = {};
               data.type  = "text";
//TODO : peut etre a supprimer : data.value = this.container.innerHTML;
               data.text = this.container.innerHTML;
               let MyCallBack =  this.getObjectThisfromPath(this.callBack.path);
               MyCallBack[this.callBack.method](this.path,data);

          }


         this.changeColor();          
     }



}

