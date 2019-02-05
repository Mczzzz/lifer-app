export default class Tapper{


     constructor(){

    }

    async LoadTapper(id){

    //  this.myTapper =  new Promise((result,reject) => this.loadInBDD(id)));

    //  this.myTapper.then((resultId){console.log("in then"+resultId)});

      return resultId;

    }

    loadInBDD(id){

        return result(id);

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
