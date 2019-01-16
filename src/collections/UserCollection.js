import SvcBackEndComm from '../services/BackendComm.js';

export default class UserCollection {


	constructor(){

	this.apiPrefixe = "/api_v1/user/";
	this.targetObject = "User";

    this.SvcBackEndComm = new SvcBackEndComm();


	}


  	Get(dispatchResponseTo = false){

    	this.SvcBackEndComm.ajaxSend('GET',this.apiPrefixe + 'get',dispatchResponseTo);

  	}

  	authMe(){

  		let auths = {};
  		auths.username = "Mczzzz";
  		auths.password = "Yasmine25051981";

    	this.SvcBackEndComm.ajaxSend('POST',"/login",false,false,auths);

  	}


}