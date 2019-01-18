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

  	authMe(user, password){

  		let auths = {};
  		auths.username = user;
  		auths.password = password;

    	this.SvcBackEndComm.ajaxSend('POST',"/login",false,false,auths);

  	}


}