import superViews from "../superViews.js";

import Elements     from "./card/elements.js";

export default class card extends superViews{ 
     

     constructor(MyClass,path,prepend = false, draggable = false){

          super( MyClass , path);

          this.init();

          this.callBack = [];

     }



     init(){

     //this.prefixElement   = "Element";

      this.setStyle("marginBottom" , "20px");
      this.setStyle("borderWidth " , "1px");
      this.setStyle("borderStyle " , "dashed");
      this.setStyle("borderColor " , "#b7b7b7");
      this.setStyle("margin      " , "10px");
      this.setStyle("borderRadius" , "8px");
      this.setStyle("background  " , "rgba(149, 146, 255, 0.14)");


     }



     //PUBLICS

     getWidth(){

          return this.container.offsetWidth;

     }





     setElement(ClassName,prepend = false){

          let Elt = new Elements(ClassName,this.path,prepend);
       
         this[Elt.MyClass] = Elt; 
         
         return Elt;
          
     }




     push(type,element,classSuffixe,data,prepend = false){


          let callback = {};
          callback.path = this.path;
          callback.method = "CallBackFromItems";

           this[classSuffixe] = this[element.MyClass].add(type, classSuffixe, data,prepend,callback);


           return this[classSuffixe];
     
     }


     

     setCallBack(eventType, path, method, args = false){

        let objCallBack     = {};
        objCallBack.Event   = eventType;
        objCallBack.path    = path;
        objCallBack.method  = method;
        objCallBack.args    = args;

        this.callBack.push(objCallBack);

     }



     CallBackFromItems(path,data){

/*      console.log('in  CallBackFromItems');
      console.log(data);*/
      this.dispatchEvent(path,data);


     }



     dispatchEvent(path,data){

      let dataObj = data;
      dataObj.id = this.container.id;

        for (let eventsToCallBack of this.callBack) {

/*          console.log(eventsToCallBack);
          console.log(dataObj);*/
           let objectToCallBack = this.getObjectThisfromPath(eventsToCallBack.path);
           objectToCallBack[eventsToCallBack.method](this.path,dataObj);

        }

     }


}









 