import LoaderCollection from '../../../services/Loader/LoaderCollection.js';

export default class Tapper{



     constructor(id){

       this.id = id;

       this.TapCollection = new LoaderCollection('Tap');

       this.init();

    }


    async init(){


      let infoFromBase = await this.TapCollection.getTap(this.id);
      console.log(infoFromBase);

    }




    LoadTapper(id){


     // return await  Promise.resolve(this.loadInBDD(id));

    //  this.myTapper.then((resultId){console.log("in then"+resultId)});



    }

    loadInBDD(id){

        return id;

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
