import { Lifer } from './../Lifer.js';

import webSQL from './../IO/webSQL.js';

export default class Fetcher {



ajaxSend(VERB,url, dataSend = false){
//		//console.log"on passe bien dans ajaxSend");		
			let MyResponse = false;

			// let timeoutId = setTimeout(function(){ return false;}, 800);

			let host = "https://applifer-develop.hopeful.care/web";

			let params = this._BuildParams(VERB,dataSend);

			let webSQLCon = new webSQL();

//			//console.log'JUST BEFORE SEND FETCH');
//TODO on verifie qu'on est considéré comme loggé
			let resp = fetch(host+url, params);

			return resp;
			



	}




	_BuildParams(VERB,dataSend){

		let params = {};
			params.method = VERB;
			params.credentials = "same-origin";
			//params.mode = 'cors';

			if(VERB != "GET"){
	//			//console.logdataSend);
				params.body = JSON.stringify(dataSend);

				params.headers = {};
				params.headers["Content-Type"] = "application/json";

			}

		return params;

	}


}