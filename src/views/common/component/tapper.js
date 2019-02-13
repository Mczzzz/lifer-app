import LoaderCollection from '../../../services/Loader/LoaderCollection.js';

export default class Tapper{


    async init(id){

      this.id = id;
      this.tmpId = false;
      this.name = false;
      this.logo = false;

      this.TapCollection = new LoaderCollection('Tap');


       this.ready = false;

       this.TapCollection = new LoaderCollection('Tap');

       this.init();

    }


    init(){


      this.TapCollection.getTap(this.id).then( response => this.LoadTapper(response));

      let returnReady = await this.TapCollection.getTap(this.id).then( response => this.LoadTapper(response));


      return "ready to go";

    }

    onReady(){




    }

    LoadTapper(datas){

      this.name = datas.rows[0].name;
      this.logo = datas.rows[0].logo;
      console.log("in load tappers")
      console.log(datas);
     //console.log(data.rows[0].name;
     // return await  Promise.resolve(this.loadInBDD(id));

    //  this.myTapper.then((resultId){console.log("in then"+resultId)});
      this.ready = true;


    }


    getName(){

      return this.name;

    }

    getLogo(){

      return this.logo;

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
