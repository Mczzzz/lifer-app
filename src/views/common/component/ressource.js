import superViews from "../superViews.js";

import Header from "./ressource/header.js";
import Main from "./ressource/main.js";
import Footer from "./ressource/footer.js";

export default class Ressource extends superViews{ 
     

     constructor(MyClass,path,ressourceId=false,prepend = false){

          super( MyClass , path);

          this.init();

          this.target = false;

          this.targetData = {};

           if(ressourceId){

            this.container.id = ressourceId;
            this.new = false;

           }else{

            this.container.id = "tmp-"+this.Lifer.newTmpId();
            this.new = true;
           }  


          this.Title = "";

        //  this.RessourceId = ressourceId;
          this.ItemList = false;


     }



     init(){


      this.Header = new Header("Header",this.path);

      this.Main   = new Main("Main",this.path);

      this.Footer = new Footer('Footer' , this.path);

     }


     setTargetData(path,method){

      this.targetData.obj = this.getObjectThisfromPath(path);
      this.targetData.method = method;

     }


     callBackDataTo(path,data=false){


      if(!data) data = {};

      data.RessourceId = this.container.id;
      data.RessourceTitle = this.Title;
      this.targetData.obj[this.targetData.method](data);
    
     }





/*     setTarget(path){

      console.log("in set Target");
      this.target = this.getObjectThisfromPath(path);

     }*/




     setTitle(title,store = false){

      this.Title = title;

      if(store){
       this.callBackDataTo(false,false);
      }else{
        this.Header.setTitle(title);
      }



     }



     addItem(type,itemId = false, data = false, pict=false, margin = false){


      let newItem = itemId;

      if(!itemId) itemId =  "tmp-"+this.Lifer.newTmpId(); 


      this.ItemList[itemId];


      let anew = (pict)? false : true;


      let elt = this.Main.addItem(type,itemId,anew);

     
      if(type == 'image' && pict) elt.addThumb(pict);

      if(data) elt.setData(data);


      if(margin){

        elt.setStyle("marginLeft", margin);        
      }
     
      if(!newItem){

   //     this.target.addItem(this.RessourceId,type,itemId,elt);

      }else{
        //relink observer on 

     //   this.target.setObserver(elt,this.RessourceId,itemId);
      } 

     }




    reorder(){

      this.target.reorder(this.container.id);

    }


}









 