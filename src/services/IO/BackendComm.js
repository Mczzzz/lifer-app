import { Lifer } from './../Lifer.js';

import webSQL from './../IO/webSQL.js';

export default class BackendComm {



//	ajaxSend(VERB,url,dispatchResponseTo=false,dataCallback = false,dataSend = false){
	ajaxSend(VERB,url,callBackObj=false,callBackMethod = false,dataSend = false){
//		console.log("on passe bien dans ajaxSend");		
			let MyResponse = false;

			// let timeoutId = setTimeout(function(){ return false;}, 800);

			let host = "https://applifer-develop.hopeful.care/web";

			let params = this._BuildParams(VERB,dataSend);

			let webSQLCon = new webSQL();

//			console.log('JUST BEFORE SEND FETCH');
//TODO on verifie qu'on est considéré comme loggé
			fetch(host+url, params)
			  .then(function(response) {

			  	//MyResponse = response.clone(); 
				console.log('in my fetch app :');
			//	console.log(response.pro)

				if(response.status === 401) {

				let qry = "INSERT INTO Params (name, value) VALUES ('is_auth', false)";
				webSQLCon.playQuery('cacheData',qry);
//TODO : il faut flagger por dire que la seule requete qui passera sera celle de login

					//il faut te logger monsieur
					let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Login'}});
					window.dispatchEvent(LinkEvent);

					//informé l'envoyeur que sa requete n'a pas été faite (donc retentative à prevoir)
					//return false;

				}else{
					//console.log(response);

					let contentType = response.headers.get("content-type");

					if(contentType && contentType.indexOf("application/json") !== -1) {
						//console.log(response);

					//	MyResponse = response.json();



/*						console.log("My response json:");
						console.log(MyResponse);
						console.log(MyResponse.json());
						console.log(MyResponse.PromiseValue);
						console.log(response);*/
						response.json().then(function(jsonResp){

							if(callBackObj !== false && callBackMethod !== false){

							callBackObj[callBackMethod](jsonResp);

						} 

						});
					  
					}else{
					//	console.log(response);
					  
					  //	MyResponse = response.blob();
					  
						response.blob().then(function(blobResp){

							if(callBackObj !== false && callBackMethod !== false){

							callBackObj[callBackMethod](blobResp);

						} 

/*						console.log("My response blob:");
						console.log(MyResponse);
						console.log(MyResponse.blob());
						console.log(MyResponse.PromiseValue);
						console.log(response);*/
				//		return response.blob();
					  
					}


					


				}



/*				if(callBackObj !== false && callBackMethod !== false){

						callBackObj[callBackMethod](datas);

					} */


			}).catch(function(error){

				console.log("in catch of fectch "+error);

			});



	}




	_BuildParams(VERB,dataSend){

		let params = {};
			params.method = VERB;
			params.credentials = "same-origin";
			//params.mode = 'cors';

			if(VERB != "GET"){
	//			console.log(dataSend);
				params.body = JSON.stringify(dataSend);

				params.headers = {};
				params.headers["Content-Type"] = "application/json";

			}

		return params;

	}


}