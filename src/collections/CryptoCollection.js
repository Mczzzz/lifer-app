import SvcBackEndComm from '../services/BackendComm.js';

export default class CryptoCollection {


	constructor(){

		this.apiPrefixe = "https://api.coinmarketcap.com/v2/listings/";
		this.targetObject = "Frame-Note";

    this.SvcBackEndComm = new SvcBackEndComm();


	}


  GetInfos(dispatchResponseTo = false){
//  	console.log("in unityCollection get");
    let result = this.SvcBackEndComm.ajaxSend('GET',this.apiPrefixe,dispatchResponseTo);

  }



}