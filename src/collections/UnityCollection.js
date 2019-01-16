import SvcBackEndComm from '../services/BackendComm.js';

export default class UnityCollection {


	constructor(){

		this.apiPrefixe = "/api_v1/unity/";
		this.targetObject = "Note";

    this.SvcBackEndComm = new SvcBackEndComm();


	}


  GetTypes(dispatchResponseTo = false){
//  	console.log("in unityCollection get");
    let result = this.SvcBackEndComm.ajaxSend('GET',this.apiPrefixe + 'get-all-types',dispatchResponseTo);

  }

  GetUnits(dispatchResponseTo = false){
 // 	console.log("in unityCollection get");
    let result = this.SvcBackEndComm.ajaxSend('GET',this.apiPrefixe + 'get-all-unities',dispatchResponseTo);

  }


}