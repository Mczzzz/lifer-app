import superViews from "../../../superViews.js";

export default class Select extends superViews{ 
     

     constructor( MyClass,path,prepend = false,callback = false){

          super( MyClass , path);

          this.init();

          this.callBack = callback;

          this.ItemType = "input";

          this.input = {};

     }


     init(){


          //this.container.contentEditable  = "true";

          //this.setAttribute("placeholder", "Texte...");

          //this.placeHodelColor = "#e0e0e0";
          this.MyInput = document.createElement("select");
          this.container.appendChild(this.MyInput);

          this.setStyle("border"     , "none");
          this.setStyle("outline"    , "none");
          this.setStyle("background" , "transparent");

          this.setStyleInput("border"   , "none");
          this.setStyleInput("outline"   , "none");
          //this.setStyleInput("fontSize"   , "10px");
         // this.setStyleInput("margin"     , "10px");
          //this.setStyleInput("fontWeight" , "normal");
          ///this.setStyle("color"      , "black");
          //this.setStyle("lineHeight" , 1);
          //this.setStyle("fontFamily" , "'Titillium Web',sans-serif,Arial,sans-serif");

          this.changeColor();

          //this.MyInput.addEventListener("keyup", (e)=>this.dispatchEvents(e));

     }



     setStyleInput(property,value,scope = "all"){

//          console.log(this.input);
      //    if(scope == "property" || scope == "all") this.input[property] = value;
          
          if(scope == "element" || scope == "all" ) this.MyInput.style[property] = value;
                      

    }


     setAttributeInput(property,value,scope = "all"){

      //    if(scope == "property" || scope == "all") this.input[property] = value;

          if(scope == "element" || scope == "all" )  this.MyInput.setAttribute(property,value);

    }


     dispatchEvents(e){


          if(this.callBack != false){

               let MyCallBack =  this.getObjectThisfromPath(this.callBack.path);
               MyCallBack[this.callBack.method](this.path,this.getText());

          }


         this.changeColor()          
     }

     changeColor(){

          this.MyInput.style.color = (this.MyInput.innerHTML.length == 0)? this.placeHodelColor : this.color; 

     }


     setplaceHolderColor(color){

          this.placeHodelColor = color;          

     }


     //PUBLICS
     setData(array){


      let opt = false;

      for (let item of array) {
    //    console.log(item);
        opt = document.createElement("option");
        opt.value = item.id;
        opt.text = item.name;

        this.MyInput.add(opt, null);

      }
          

     }


     getText(){

          return this.MyInput.value;

     }



}

