import superViews from "../superViews.js";

import Header from "./ressource/header.js";
import Main from "./ressource/main.js";
import Footer from "./ressource/footer.js";

export default class Tapper extends superViews{


     constructor(MyClass,path,ressourceId=false,prepend = false){

    }


    setType(type){

      this.type = type;

    }

    getType(){

      return this.type;

    }




    setDefaultRechargeStock(value){

      this.DefaultRechargeStock = value;


    }


    setStock(value = false){

      if(value){

        this.stock = value;

      }else{
        //on regarde si on a un chaegeur par default
          if(this.DefaultRechargeStock){

              this.stock =   this.stock + this.DefaultRechargeStock;

          }
      }

    }


    getStock(){

      return this.stock;

    }



}
