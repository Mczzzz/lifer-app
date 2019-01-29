import { Lifer } from './../Lifer.js';

import webSQL from './../IO/webSQL.js';

export default class BackendComm {



//	ajaxSend(VERB,url,dispatchResponseTo=false,dataCallback = false,dataSend = false){
	ajaxSend(VERB,url,callBackObj=false,callBackMethod = false,dataSend = false){
//		//console.log"on passe bien dans ajaxSend");		
			let MyResponse = false;

			// let timeoutId = setTimeout(function(){ return false;}, 800);

			let host = "https://applifer-develop.hopeful.care/web";

			let params = this._BuildParams(VERB,dataSend);

			let webSQLCon = new webSQL();

//			//console.log'JUST BEFORE SEND FETCH');
//TODO on verifie qu'on est considéré comme loggé
			fetch(host+url, params)
			  .then(function(response) {

			  	//MyResponse = response.clone(); 
				//console.log'in my fetch app :');
			//	//console.logresponse.pro)
			////console.loga);
				if(response.status === 401) {
					//console.logresponse.status);
				let qry = "INSERT INTO Params (name, value) VALUES ('is_auth', false)";
				webSQLCon.playQuery('cacheData',qry);
//TODO : il faut flagger por dire que la seule requete qui passera sera celle de login

					//il faut te logger monsieur
					let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Login'}});
					window.dispatchEvent(LinkEvent);

					//informé l'envoyeur que sa requete n'a pas été faite (donc retentative à prevoir)
					//return false;

				}else{
					console.log(response);

					let contentType = response.headers.get("content-type");

					if(contentType && contentType.indexOf("application/json") !== -1) {

						response.json().then(function(jsonResp){
							//console.log'in responpose json');
							//console.logjsonResp);
							//console.logcallBackObj);
							//console.logcallBackMethod);
							//console.logtypeof callBackObj);
							//console.logcallBackMethod.length);
							if(typeof callBackObj === "object" && callBackMethod.length > 0 ){
								//console.logcallBackObj);
								//console.logcallBackMethod);
								callBackObj[callBackMethod](jsonResp);

							} 
							//console.log'before return json');
							return jsonResp;
						});
					  
					}else{

					  
						response.blob().then(function(blobResp){
							//console.log'in responpose blob');
/*							if(callBackObj !== false && callBackMethod !== false){

								callBackObj[callBackMethod](blobResp);

							} */
							//console.log'before return blob');
							return blobResp;
					  
						});


					


					}

				}


			}).catch(function(error){

				//console.log"in catch of fectch "+error);

			});



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