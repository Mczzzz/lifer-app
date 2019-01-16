import superViews from "../../superViews.js";

import loaderComponent from "../../../../services/LoaderComponent.js";

export default class Elements extends superViews{ 
     

     constructor(MyClass,path,prepend = false){

          super(MyClass , path, prepend);


          this.init();

     }


     init(){


          this.setStyle("display" , "flex");
          this.setStyle("justifyContent" , "space-around");

          

     }

//TO DESTROY
/*     setStyleComponent(component, property, value,scope = "all"){

        this[component].setStyle(property, value,scope);


     }*/

//TO DESTROY
/*     setStyleInputComponent(component, property, value,scope = "all"){

        this[component].setStyleInput(property, value,scope);


     }*/


//TO DESTROY
/*
     setStylePictoComponent(component, property, value,scope = "all"){

        this[component].setStylePicto(property, value,scope);


     }*/



/*     setAttributeComponent(component, property, value,scope = "all"){

        this[component].setAttribute(property, value,scope);

     }*/

/*     setAttributeInputComponent(component, property, value,scope = "all"){

        this[component].setAttributeInput(property, value,scope);

     }*/


    updateChild(){

        
    }


    add(type, classSuffixe, data = false,prepend = false,callback = false){


    	this[classSuffixe] = new loaderComponent(type, type +"-"+ classSuffixe, this.path,prepend,callback);
        
        if(data){
            this[classSuffixe].setData(data);
        }
    	

    //return this[classSuffixe].getContainer();
    return this[classSuffixe];
     }



/*     initTouch(component,path,callback){
      //  console.log(component);
      //  console.log(path);
        this[component].initTouch(path,callback);

     }*/


}