import SvcBackEndComm from '../services/BackendComm.js';

import webSQL from '../services/webSQL.js';

export default class UserCollection {


	constructor(){

  	this.apiPrefixe = "/api_v1/user/";
  	this.targetObject = "User";

    this.webSQL = new webSQL();

    this.SvcBackEndComm = new SvcBackEndComm();


    this.callBackObj    ="";
    this.callBackMethod ="";

	}


  	Get(dispatchResponseTo = false){

    	this.SvcBackEndComm.ajaxSend('GET',this.apiPrefixe + 'get',dispatchResponseTo);

  	}

  	authMe(user, password,callBackObj = false,callBackMethod = false){

  		let auths = {};
  		auths.username = user;
  		auths.password = password;

    	this.SvcBackEndComm.ajaxSend('POST',"/login",callBackObj,callBackMethod,auths);

  	}


    isAuth(callBackObj,callBackMethod){

      console.log('IN IS AUTH');

      this.callBackObj    = callBackObj;
      this.callBackMethod = callBackMethod;

      let qry = "SELECT * FROM Params WHERE name = 'is_auth'";
      this.webSQL.playQuery('cacheData',qry,this,"_dispatchAuthResponse");

    }


    _dispatchAuthResponse(datas){

      let result = false;
      console.log('_dispatchAuthResponse');
      console.log(datas);
      console.log(datas.rows);
      console.log(datas.rows.length);
      if(datas.rows.length)  console.log(datas.rows[0].is_auth);

      if(datas.rows && datas.rows.length == 1 && datas.rows[0].is_auth){


          result = true;

      }


      this.callBackObj[this.callBackMethod](result);

      //destroy callback
      this.callBackObj    ="";
      this.callBackMethod ="";

    }


/*    loadMe(){

      let userCollection = new LoaderCollection("User");
      Lifer.addMe("User");

      let dispatchResponseTo  = [{ "This" : "Lifer" , "method" : "addData", "path" : "User"}];

      userCollection.Get(dispatchResponseTo);


    }*/




}