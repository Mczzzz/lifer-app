import { Lifer } from '../services/Lifer.js'

//import SvcBackEndComm from '../services/IO/BackendComm.js';
import Fetcher from '../services/IO/fetcher.js';

import webSQL from '../services/IO/webSQL.js';
import LocalStorage from '../services/IO/LocalStorage.js';

export default class TapCollection {


	constructor(){

		this.serverStorage = {};
		this.serverStorage.apiPrefixe = "/api_v1/tap/";

		this.webSQL = new webSQL();

    	//this.SvcBackEndComm = new SvcBackEndComm();
    	this.Fetcher = new Fetcher();

    	this.init();

	}


	init(){

		this._initLocalStorage();

	}





	getTapers(callBackObj,callBackMethod){

		let qry = "SELECT * FROM Taps";
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		this.webSQL.playQuery('cacheData',qry,callBackObj,callBackMethod);


	}


	getTap(id){

		let qry = "SELECT * FROM Taps WHERE id = '"+id+"'";
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		this.webSQL.executeTransaction('cacheData',qry).then(

		response => { return response


		}

		);



	}





	getEventsTapers(id,callBackObj,callBackMethod){

		let qry = "SELECT * FROM TapsEvents WHERE tapId = '"+id+"'  ORDER BY timestamp DESC LIMIT 1";
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		this.webSQL.playQuery('cacheData',qry,callBackObj,callBackMethod);


	}


	getEventsTapersTodayByHour(id,callBackObj,callBackMethod){

		//let qry = "SELECT * FROM TapsEvents WHERE tapId = '"+id+"'  AND timestamp > strftime('%Y-%m-%d', 'now') ORDER BY timestamp ASC";
		let qry = "SELECT *,strftime('%H', timestamp) as valHour, SUM(increment) AS incr FROM TapsEvents WHERE tapId = '"+id+"' AND timestamp > strftime('%Y-%m-%d', 'now') GROUP BY valHour"; 
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		
		console.log(qry);
		this.webSQL.playQuery('cacheData',qry,callBackObj,callBackMethod);


	}


	getFetchTest(id = false){

		return this.Fetcher.ajaxSend("GET", "/login" , false);

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
			                   values ( "`+Lifer.newTmpId()+`",
			                          "`+Lifer.newTmpId()+`",
			                          "`+data.name+`",
			                          "`+data.logo+`"
			                          )

			                 `);


	}


	addEvent(data){

		console.log("in add event");
		console.log(data);

		this.webSQL.playQuery('cacheData',
											`insert into TapsEvents ( id,
																	tmpId,
																	tapId,
																	value,
																	increment,
																	timestamp
																					)
											 values ( "`+Lifer.newTmpId()+`",
															"`+Lifer.newTmpId()+`",
															"`+data.id+`",
															"`+data.value+`",
															"`+data.increment+`",
															strftime('%Y-%m-%d %H:%M:%f', 'now')
															)

										 `);



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
		TblParams2.create = `CREATE TABLE IF NOT EXISTS `+TblParams2.name+` (id,
																		   tmpId,
																		   tapId,
																	       value,
																				 increment,
																	       timestamp
																	   );
																	   `;


		this.webSQL.playQuery(TblParams2.db,TblParams2.create);




	}

}
