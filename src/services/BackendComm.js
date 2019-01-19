import { Lifer } from './Lifer.js';

export default class BackendComm {



//	ajaxSend(VERB,url,dispatchResponseTo=false,dataCallback = false,dataSend = false){
	ajaxSend(VERB,url,callBackObj=false,callBackMethod = false,dataSend = false){
//		console.log("on passe bien dans ajaxSend");		

			let host = "https://lifer-develop.hopeful.care";

			let params = this._BuildParams(VERB,dataSend);

			console.log('JUST BEFORE SEND FETCH');

			fetch(host+url, params).then(function(response) {

				console.log('in my fetch app :');
				console.log(response);

				if(response.status === 0) {


					//il faut te logger monsieur
					let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Login'}});
					window.dispatchEvent(LinkEvent);

					//informé l'envoyeur que sa requete n'a pas été faite (donc retentative à prevoir)


				}



				let contentType = response.headers.get("content-type");

				if(contentType && contentType.indexOf("application/json") !== -1) {

					return response.json();
				  
				}else{
				  
					return response.blob();
				  
				}


			}).then(function(datas){

				
				if(callBackObj !== false && callBackMethod !== false){

					callBackObj[callBackMethod](datas);

				} 
				
				
			}, function(error) {

			  error.message //=> String

			})




	}




	_BuildParams(VERB,dataSend){

		let params = {};
			params.method = VERB;
			params.credentials = "include";
			params.mode = 'cors';

			if(VERB != "GET"){
	//			console.log(dataSend);
				params.body = JSON.stringify(dataSend);

				params.headers = {};
				params.headers["Content-Type"] = "application/json";

			}

		return params;

	}


}