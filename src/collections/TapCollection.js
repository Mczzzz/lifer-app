import SvcBackEndComm from '../services/IO/BackendComm.js';

import webSQL from '../services/IO/webSQL.js';
import LocalStorage from '../services/IO/LocalStorage.js';

export default class TapCollection {


	constructor(){

		this.serverStorage = {};
		this.serverStorage.apiPrefixe = "/api_v1/tap/";

		this.webSQL = new webSQL();

    	this.SvcBackEndComm = new SvcBackEndComm();

    	this.init();

	}


	init(){

		this._initLocalStorage();

	}





	getAllNotes(callBackObj,callBackMethod){

		/*let qry = "SELECT * FROM Notes GROUP BY note_id, note_tmpId ORDER BY timestamp DESC";
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		this.webSQL.playQuery('cacheData',qry,callBackObj,callBackMethod);*/


	}




	create(data){
		//console.log'in store collection');
		console.log(data);


			//console.log'note insert');

			this.webSQL.playQuery('cacheData',
			                  `insert into Taps ( id,
			                  					  tmpId,
			                  					  name,
			                  					  logo
			                                      )
			                   values ("",
			                          "",
			                          "`+data.name+`",
			                          "`+data.logo+`"
			                          )

			                 `);


	}


	iteration(data){




	}

	_initLocalStorage(){

	//localStorage
	console.log("tap _initLocalStorage");
//BASE DE CACHE USUEL

		let TblParams = {};
		TblParams.name = "Taps";
		TblParams.db = "cacheData";
		TblParams.create = `CREATE TABLE IF NOT EXISTS `+TblParams.name+` (id,
																		   tmpId,
																		   name,
																		   logo,															   
						    										   UNIQUE (name) ON CONFLICT IGNORE
																	   );
																	   `;


		this.webSQL.playQuery(TblParams.db,TblParams.create);


		let TblParams2 = {};
		TblParams2.name = "TapsEvents";
		TblParams2.db = "cacheData";
		TblParams2.create = `CREATE TABLE IF NOT EXISTS `+TblParams.name+` (id,
																		   tmpId,
																		   tapId
																	       value,
																	       timestamp
																	   );
																	   `;


		this.webSQL.playQuery(TblParams2.db,TblParams2.create);




	}

}