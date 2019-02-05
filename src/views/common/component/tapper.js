import LoaderCollection from '../../../services/Loader/LoaderCollection.js';

export default class Tapper{



     constructor(id){

       this.id = id;
       this.tmpId = false;
       this.name = false;
       this.logo = false;

       this.TapCollection = new LoaderCollection('Tap');

       this.init();

    }


    async init(){


      await this.TapCollection.getTap(this.id).then( response => this.LoadTapper(response));


    }




    LoadTapper(datas){

      this.name = datas.rows[0].name;
      console.log("in load tappers")
      console.log(datas);
     //console.log(data.rows[0].name;
     // return await  Promise.resolve(this.loadInBDD(id));

    //  this.myTapper.then((resultId){console.log("in then"+resultId)});



    }


    getName(){

      return this.name;

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
