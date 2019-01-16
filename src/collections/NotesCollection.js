import SvcBackEndComm from '../services/BackendComm.js';

import webSQL from '../services/webSQL.js';
import LocalStorage from '../services/LocalStorage.js';

export default class NotesCollection {


	constructor(){

		this.serverStorage = {};
		this.serverStorage.apiPrefixe = "/api_v1/notes/";

		this.webSQL = new webSQL();

    	this.SvcBackEndComm = new SvcBackEndComm();


	}


	init(){

		this._initLocalStorage();

	}





	getAllNotes(callBackObj,callBackMethod){

		let qry = "SELECT * FROM Notes GROUP BY note_id";
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		this.webSQL.playQuery('cacheData',qry,callBackObj,callBackMethod);


	}

	getRessources(noteId,callBackObj,callBackMethod){

		let qry = "SELECT * FROM Ressources WHERE note_id = '"+noteId+"' ORDER BY timestamp DESC";
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		this.webSQL.playQuery('cacheData',qry,callBackObj,callBackMethod);

	}

	getRessource(ressourceId,callBackObj,callBackMethod){

		let qry = "SELECT * FROM Ressources WHERE ressource_id = '"+ressourceId+"'";
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		this.webSQL.playQuery('cacheData',qry,callBackObj,callBackMethod);

	}


	getRessourcesItems(ressourceId,callBackObj,callBackMethod){

		let qry = "SELECT * FROM Items WHERE ressource_id = '"+ressourceId+"'";
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		this.webSQL.playQuery('cacheData',qry,callBackObj,callBackMethod);

	}


	getPictureFromServer(completeName,callBackObject,callBackMethod){

		console.log("in getPictureFromServer");
		this.SvcBackEndComm.ajaxSend('GET',"api_v1/pict/" + completeName,callBackObject,callBackMethod);

	}







	store(data){
		console.log('in store collection');
		console.log(data);


		if(data.NoteId.indexOf("tmp-") == 0 ){

			console.log('note insert');

			this.webSQL.playQuery('cacheData',
			                  `insert into Notes ( timestamp,
			                                       status,
			                                       note_id,
												   note_title,
												   note_tmpId
			                                      )
			                   values (strftime('%Y-%m-%d %H:%M:%f', 'now'),
			                          "LOCAL",
			                          "`+data.NoteId+`",
			                          "`+data.NoteTitle+`",
			                          "`+data.NoteId+`"
			                          )

			                 `);



		}else{

			console.log('note UPDATE');

			this.webSQL.playQuery('cacheData',
				                  `UPDATE Notes 
				                   SET timestamp = strftime('%Y-%m-%d %H:%M:%f', 'now'),
				                   status = "LOCAL",
				                   state = "WAITING",
				                   note_title = "`+data.NoteTitle+`"
				                   WHERE note_id = "`+data.NoteId+`"
				                   AND note_title != "`+data.NoteTitle+`"
				                 `);



		} 



		if(data.RessourceId){




			if(data.RessourceId.indexOf("tmp-") == 0 ){


			console.log("in store data ressources INSERT");

				this.webSQL.playQuery('cacheData',
			                  `insert into Ressources ( timestamp,
			                                       status,
			                                       note_id,
												   ressource_id,
												   ressource_tmpId,
												   ressource_title
			                                      )
			                   values (strftime('%Y-%m-%d %H:%M:%f', 'now'),
			                          "LOCAL",
			                          "`+data.NoteId+`",
			                          "`+data.RessourceId+`",
			                          "`+data.RessourceId+`",
			                          "`+data.RessourceTitle+`"
			                          )

			                 `);



			}else{

			console.log("in store data ressources UPDATE");

				this.webSQL.playQuery('cacheData',
			                  `UPDATE Ressources 
			                   SET timestamp = strftime('%Y-%m-%d %H:%M:%f', 'now'),
			                   status = "LOCAL",
			                   state = "WAITING",
			                   note_id = "`+data.NoteId+`",
			                   ressource_title = "`+data.RessourceTitle+`"
			                   WHERE ressource_id = "`+data.RessourceId+`"
			                   AND ressource_title != "`+data.RessourceTitle+`"

			                 `);


			}


		}




		if(data.id){

			console.log("in if data Id");

			data.value = (data.value)? data.value : 0;
			data.path = (data.path)? data.path : "";
			data.unit = (data.unit)? data.unit : 0;

			if(data.id.indexOf("tmp-") == 0 ){

				console.log("item INSERT");

				this.webSQL.playQuery('cacheData',
			                  `insert into Items ( timestamp,
												   status,
												   ressource_id,
												   item_id,
												   item_tmpId,
												   item_type,
												   item_text,
												   item_value,
												   item_path,
												   item_unit
			                                      )
			                   values (strftime('%Y-%m-%d %H:%M:%f', 'now'),
			                          "LOCAL",
			                          "`+data.RessourceId+`",
			                          "`+data.id+`",
			                          "`+data.id+`",
			                          "`+data.type+`",
			                          "`+data.text+`",
			                          "`+data.value+`",
			                          "`+data.path+`",
			                          "`+data.unit+`"
			                          )

			                 `);



			}else{

				console.log("item UPDATE");

				this.webSQL.playQuery('cacheData',
			                  `UPDATE Items 
			                  SET timestamp = strftime('%Y-%m-%d %H:%M:%f', 'now'),
			                  status = "LOCAL",
			                  state = "WAITING",
							  ressource_id = "`+data.RessourceId+`",
							  item_type = "`+data.type+`",
							  item_text = "`+data.text+`",
							  item_value = "`+data.value+`",
							  item_path = "`+data.path+`",
							  item_unit = "`+data.unit+`"  
							  WHERE item_id = "`+data.id+`" 

			                 `);

			}

		}

	}



	_initLocalStorage(){

	//localStorage

//BASE DE CACHE USUEL

		let TblParams = {};
		TblParams.name = "Params";
		TblParams.db = "cacheData";
		TblParams.create = `CREATE TABLE IF NOT EXISTS `+TblParams.name+` (name,
																	       value,																   
						    										   UNIQUE (name) ON CONFLICT IGNORE
																	   );
																	   `;


		this.webSQL.playQuery(TblParams.db,TblParams.create);





		let TblNote = {};
		TblNote.name = "Notes";
		TblNote.db = "cacheData";
		TblNote.create = `CREATE TABLE IF NOT EXISTS `+TblNote.name+` (timestamp,
																	   status,
																	   note_id TEXT DEFAULT "",
																	   note_tmpId TEXT DEFAULT "",
																	   note_title TEXT DEFAULT "",
																	   state TEXT DEFAULT "WAITING",																   
						    										   UNIQUE (note_tmpId, note_id) ON CONFLICT REPLACE
																	   );
																	   `;


		this.webSQL.playQuery(TblNote.db,TblNote.create);




		let TblRessource = {};
		TblRessource.name = "Ressources";
		TblRessource.db = "cacheData";
		TblRessource.create = `CREATE TABLE IF NOT EXISTS `+TblRessource.name+` (timestamp,
																	   status,
																	   note_id TEXT DEFAULT "",
																	   ressource_id TEXT DEFAULT "",
																	   ressource_tmpId TEXT DEFAULT "",
																	   ressource_title TEXT DEFAULT "",
																	   state TEXT DEFAULT "WAITING",																   
						    										   UNIQUE (ressource_tmpId, ressource_id) ON CONFLICT REPLACE
																	   );
																	   `;


		this.webSQL.playQuery(TblRessource.db,TblRessource.create);




		let TblItems= {};
		TblItems.name = "Items";
		TblItems.db = "cacheData";
		TblItems.create = `CREATE TABLE IF NOT EXISTS `+TblItems.name+` (timestamp,
																	   status ,
																	   ressource_id TEXT DEFAULT "",
																	   item_id TEXT DEFAULT "",
																	   item_tmpId TEXT DEFAULT "",
																	   item_type TEXT DEFAULT "",
																	   item_text TEXT DEFAULT "",
																	   item_value INTEGER DEFAULT 0,
																	   item_path TEXT DEFAULT "",
																	   item_unit INTEGER DEFAULT 0,
																	   state TEXT DEFAULT "WAITING",
						    UNIQUE ( item_id,
						             item_tmpId,
                   			         item_type
                   			       )
                   			ON CONFLICT REPLACE

																	   );
																	   `;

		this.webSQL.playQuery(TblItems.db,TblItems.create);






//EN ATTENTE DE REMONTE AU SERVEUR


	let TblItemUp = {};
		TblItemUp.name = "Items";
		TblItemUp.db = "syncUP";
		TblItemUp.create = `CREATE TABLE IF NOT EXISTS `+TblItemUp.name+` (timestamp,
																	   status,
																	   note_id TEXT DEFAULT "",
																	   note_title TEXT DEFAULT "",
																	   note_timestamp TEXT DEFAULT "",
																	   ressource_id TEXT DEFAULT "",
																	   ressource_title TEXT DEFAULT "",
																	   ressource_timestamp TEXT DEFAULT "",
																	   item_id TEXT DEFAULT "",
																	   item_type TEXT DEFAULT "",
																	   item_text TEXT DEFAULT "",
																	   item_timestamp TEXT DEFAULT "",
																	   item_value INTEGER DEFAULT 0,
																	   item_path  TEXT DEFAULT "",
																	   item_unit  INTEGER DEFAULT 0,
																	   scope TEXT DEFAULT ""
																	   );
																	   `;


		
		this.webSQL.playQuery(TblItemUp.db,TblItemUp.create);




	let TblItemDown = {};
		TblItemDown.name = "ItemsUpdata";
		TblItemDown.db = "syncUP";
		TblItemDown.create = `CREATE TABLE IF NOT EXISTS `+TblItemDown.name+` (timestamp,
																		   status,
																		   note_id             TEXT DEFAULT "",
																		   note_tmpId          TEXT DEFAULT "",
																		   note_title          TEXT DEFAULT "",
																		   note_timestamp      TEXT DEFAULT "",
																		   ressource_id        TEXT DEFAULT "",
																		   ressource_tmpId     TEXT DEFAULT "",
																		   ressource_title     TEXT DEFAULT "",
																		   ressource_timestamp TEXT DEFAULT "",
																		   item_id             TEXT DEFAULT "",
																		   item_tmpId          TEXT DEFAULT "",
																		   item_type           TEXT DEFAULT "",
																		   item_text           TEXT DEFAULT "",
																		   item_timestamp      TEXT DEFAULT "",
																		   item_value          INTEGER DEFAULT 0,
																		   item_path           TEXT DEFAULT "",
																		   item_unit           INTEGER DEFAULT 0,
																		   scope               TEXT DEFAULT ""
																		   );
																	   `;


		
		this.webSQL.playQuery(TblItemDown.db,TblItemDown.create);






		let TblItemDataUp = {};
		TblItemDataUp.name = "ItemsDatas";
		TblItemDataUp.db = "syncUP";
		TblItemDataUp.create = `CREATE TABLE IF NOT EXISTS `+TblItemDataUp.name+` (timestamp,
																	   status,
																	   note_id,
																	   ressource_id,
																	   item_id,
																	   item_type TEXT DEFAULT "PERSISTENT",
																	   item_path  TEXT DEFAULT ""
																	   );
																	   `;


		
		this.webSQL.playQuery(TblItemDataUp.db,TblItemDataUp.create);





	}






	synchroToServer(){


		let delay = 1;

	//////PRE TRAITEMENT
		//je regarde dans mon sync data ce qui a plus d'une seconde d'enregistrement et qui a un status LOCAL order by croissant timestamp (pour gérer les plus vieux en priorité)
		let qry = "UPDATE Items SET state = 'RESERVEDUP' WHERE timestamp < strftime('%Y-%m-%d %H:%M:%f', 'now','-"+delay+" seconds') AND state = 'WAITING' ";
		this.webSQL.playQuery('cacheData',qry);

/*		//j'update aussi le status de ressources et des notes
		let qry2 = "UPDATE Ressources SET state = 'RESERVEDUP'  WHERE timestamp < strftime('%Y-%m-%d %H:%M:%f', 'now','-"+delay+" seconds')  AND state = 'WAITING'";
		this.webSQL.playQuery('cacheData',qry2);

		//j'update aussi le status de ressources et des notes
		let qry3 = "UPDATE Notes SET state = 'RESERVEDUP' WHERE timestamp < strftime('%Y-%m-%d %H:%M:%f', 'now','-"+delay+" seconds')  AND state = 'WAITING'";
		this.webSQL.playQuery('cacheData',qry3);*/





		this._syncEntities();

		this._syncData();
		

	}


	_syncEntities(){


		let qry2 = `SELECT *,Items.timestamp AS item_timestamp,Ressources.timestamp AS ressource_timestamp,Notes.timestamp AS note_timestamp 
		            FROM Items
		            LEFT JOIN Ressources ON (CASE WHEN SUBSTR(Items.ressource_id,1,3) = "tmp" THEN Items.ressource_id = Ressources.ressource_tmpId ELSE Items.ressource_id = Ressources.ressource_id END)
		            LEFT JOIN Notes ON (CASE WHEN SUBSTR(Ressources.note_id,1,3) = "tmp" THEN Ressources.note_id = Notes.note_tmpId ELSE Ressources.note_id = Notes.note_id END)
		            WHERE Items.state = 'RESERVEDUP' `;
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		this.webSQL.playQuery('cacheData',qry2,this,'_pushInSyncUp');

	//////COMPOSITION DE l'ENVOI
		let qry3 = "SELECT * FROM Items WHERE status = 'BEFOREUP' ";
		this.webSQL.playQuery('syncUP',qry3,this,'_createRequestToServer');
		// j'envoi en auserveru et attedns un retour positif

		let qry4 = `SELECT * FROM Params
		            WHERE name = "last_synchro"`;
		this.webSQL.playQuery('cacheData',qry4,this,'_syncOthers');



	}


	_syncOthers(datas){

		let requestData = {};
		//le regarde en base ce que j'ai et si je n'ai rien j'update et j'envoi la requête
		if(datas.rows.length == 0){

			requestData.scope = "all";
			//getallfrom server
			//je set une value
		let qry = "INSERT INTO Params (name, value) VALUES ('last_synchro',strftime('%Y-%m-%d %H:%M:%f', 'now'))";
		this.webSQL.playQuery('cacheData',qry);



		}else{

			requestData.scope = datas.rows.item(0).value;

		}

		this.SvcBackEndComm.ajaxSend('POST',this.serverStorage.apiPrefixe + 'get-sync',this,"_updateSynchroRequest",requestData);



	}


	_updateSynchroRequest(datas){

		console.log(datas);

		let len = datas.data.length, i;

//TODO: a revoir ca il peu y avoir des trous dans la raquete je pense
		if(datas.data.length > 0){

			let qry = `UPDATE Params
			           SET value = strftime('%Y-%m-%d %H:%M:%f', 'now')
			           WHERE name = 'last_synchro'
			           `;
			this.webSQL.playQuery('cacheData',qry);
			
		}


		let ItemValues = "";
		let RessourcesValues = "";
		let NotesValues = "";


		for (i = 0; i < len; i++) {


		  	if(NotesValues.length > 0) NotesValues += ",";


		  	NotesValues += `("`+datas.data[i].note_timestamp+`",
	                          "SYNC",
	                          "CLEAN",
	                          "`+datas.data[i].note_id+`",
	                          "`+datas.data[i].note_title+`",
	                          "`+datas.data[i].note_tmpId+`"
	                          )`;





			if(datas.data[i].scope != 'note'){

				if(RessourcesValues.length > 0) RessourcesValues += ",";

			    RessourcesValues += `("`+datas.data[i].ressource_timestamp+`",
			                          "SYNC",
			                          "CLEAN",
			                          "`+datas.data[i].note_id+`",
			                          "`+datas.data[i].ressource_id+`",
			                          "`+datas.data[i].ressource_title+`",
			                          "`+datas.data[i].ressource_tmpId+`"
			                          )`;


			}



			if(datas.data[i].scope == 'item'){


				if(ItemValues.length > 0) ItemValues += ",";


				 ItemValues += `("`+datas.data[i].item_timestamp+`",
		                          "SYNC",
		                          "CLEAN",
		                          "`+datas.data[i].ressource_id+`",
		                          "`+datas.data[i].item_id+`",
		                          "`+datas.data[i].item_type+`",
		                          "`+datas.data[i].item_text+`",
		                          "`+datas.data[i].item_value+`",
		                          "`+datas.data[i].item_path+`",
		                          "`+datas.data[i].item_unit+`",
		                          "`+datas.data[i].item_tmpId+`"
		                          )`;

			}

 	




		}


		if(NotesValues.length > 0){

			 this.webSQL.playQuery('cacheData',
					                  `insert into Notes ( timestamp,
					                                       status,
					                                       state,
					                                       note_id,
														   note_title,
														   note_tmpId
					                                      )
					                   values `+NotesValues);

		}

	

		if(RessourcesValues.length > 0){


			 this.webSQL.playQuery('cacheData',
			                  `insert into Ressources ( timestamp,
			                                       status,
			                                       state,
			                                       note_id,
			                                       ressource_id,
												   ressource_title,
												   ressource_tmpId
			                                      )
			                   values `+RessourcesValues);

		}

		


		if(ItemValues.length > 0) {

		 	this.webSQL.playQuery('cacheData',
			                  `insert into Items ( timestamp,
			                                       status,
			                                       state,
			                                       ressource_id,
			                                       item_id,
												   item_type,
												   item_text,
												   item_value,
												   item_path,
												   item_unit,
												   item_tmpId
			                                      )
			                   values `+ItemValues);

		 }
		 


	}





	_syncData(){


		//onverifie qu'il n'y a rien en cours d'upload
		let qry = "SELECT * FROM ItemsDatas WHERE status = 'UPLOADING' LIMIT 1";
		this.webSQL.playQuery('syncUP',qry,this,'_canExecuteNewDataSynchro');


	//////COMPOSITION DE l'ENVOI
		/*let qry = "SELECT * FROM NotesDatas WHERE status = 'BEFOREUP' ORDER BY timestamp ASC LIMIT 1";
		this.webSQL.playQuery('syncUP',qry,this,'_createRequestToServerDatas');
*/


	}


	_canExecuteNewDataSynchro(results){

		if(results.rows.length == 0){

			let qry = "SELECT * FROM ItemsDatas WHERE status = 'BEFOREUP' ORDER BY timestamp ASC LIMIT 1";
			this.webSQL.playQuery('syncUP',qry,this,'_createRequestToServerDatas');


		}else{

			console.log("Upload déja en cours on attends");

		}


	}




	_pushInSyncUp(results){

		console.log("_pushInSyncUp");
		console.log(results.rows);

		let note_id = "";
		let ressource_id = "";
		let item_id = "";

		let len = results.rows.length, i;

		  for (i = 0; i < len; i++) {
		   

		    note_id = "";
		    ressource_id = "";
		    item_id = "";

		  	if(results.rows.item(i).note_id.length == 0 ){

		  		note_id = results.rows.item(i).note_tmpId;

		  	} else{

		  		note_id = results.rows.item(i).note_id;

		  	}


		 	if(results.rows.item(i).ressource_id.length == 0 ){

		  		ressource_id = results.rows.item(i).ressource_tmpId;

		  	} else{

		  		ressource_id = results.rows.item(i).ressource_id;

		  	}



		 	if(results.rows.item(i).item_id.length == 0 ){

		  		item_id = results.rows.item(i).item_tmpId;

		  	} else{

		  		item_id = results.rows.item(i).item_id;

		  	}


		    this.webSQL.playQuery('syncUP',
			                  `insert into Items ( timestamp,
			                                       status,
			                                       note_id,
												   note_title,
												   note_timestamp,
												   ressource_id,
												   ressource_title,
												   ressource_timestamp,
												   item_id,
												   item_timestamp,
												   item_type,
												   item_text,
												   item_value,
												   item_path,
												   item_unit,
												   scope
			                                      )
			                   values (strftime('%Y-%m-%d %H:%M:%f', 'now'),
			                          "BEFOREUP",
			                          "`+note_id+`",
			                          "`+results.rows.item(i).note_title+`",
			                          "`+results.rows.item(i).note_timestamp+`",
			                          "`+ressource_id+`",
			                          "`+results.rows.item(i).ressource_title+`",
			                          "`+results.rows.item(i).ressource_timestamp+`",
			                          "`+item_id+`",
			                          "`+results.rows.item(i).item_timestamp+`",
			                          "`+results.rows.item(i).item_type+`",
			                          "`+results.rows.item(i).item_text+`",
			                          "`+results.rows.item(i).item_value+`",
			                          "`+results.rows.item(i).item_path+`",
			                          "`+results.rows.item(i).item_unit+`",
			                          "item"
			                          )

			                 `);




		  }

		 if(results.rows.length){

			let qry = "UPDATE Items SET state = 'PREUP' WHERE state = 'RESERVEDUP' ";
			this.webSQL.playQuery('cacheData',qry);


			//j'update aussi le status de ressources et des notes
			let qry2 = "UPDATE Ressources SET state = 'PREUP' WHERE ressource_id IN (SELECT ressource_id FROM Items WHERE state = 'PREUP')";
			this.webSQL.playQuery('cacheData',qry2);

			//j'update aussi le status de ressources et des notes
			let qry3 = "UPDATE Notes SET state = 'PREUP' WHERE note_id IN (SELECT note_id FROM Ressources WHERE state = 'PREUP')";
			this.webSQL.playQuery('cacheData',qry3);



		 }


		 //j'update aussi le status de ressources et des notes
		let qry4a = `UPDATE Ressources
		             SET state = 'RESERVEDUPR'
		  			 WHERE timestamp < strftime('%Y-%m-%d %H:%M:%f', 'now','-1 seconds')
		  			 AND state = 'WAITING' 
		  			 AND STATUS = 'LOCAL'`;
		this.webSQL.playQuery('cacheData',qry4a);

		let qry4b = `UPDATE Notes
					 SET state = 'RESERVEDUPR'
		  			 WHERE note_id IN (SELECT note_id FROM Ressources WHERE state = 'RESERVEDUPR')
		  			 AND state = 'WAITING' 
		  			 AND STATUS = 'LOCAL'
		  			 `;
		this.webSQL.playQuery('cacheData',qry4b);




		//je fgais un select qui push dans syncUp

		 let qry4 = `SELECT *,Ressources.timestamp AS ressource_timestamp, Notes.timestamp AS note_timestamp
		 			 FROM Ressources
		 			 LEFT JOIN Notes ON (CASE WHEN SUBSTR(Ressources.note_id,1,3) = "tmp" THEN Ressources.note_id = Notes.note_tmpId ELSE Ressources.note_id = Notes.note_id END)
		  			 WHERE Ressources.state = 'RESERVEDUPR' 
		  			 AND Ressources.STATUS = 'LOCAL'`;
		 this.webSQL.playQuery('cacheData',qry4,this,'_synchroRessources');







		let qry5 = `UPDATE Notes
					 SET state = 'RESERVEDUPN'
		  			 WHERE timestamp < strftime('%Y-%m-%d %H:%M:%f', 'now','-1 seconds')
		  			 AND state = 'WAITING' 
		  			 AND STATUS = 'LOCAL'
		  			 `;
		this.webSQL.playQuery('cacheData',qry5);



		//je fgais un select qui push dans syncUp

		 let qry6 = `SELECT *,Notes.timestamp AS note_timestamp
		 			 FROM Notes
		  			 WHERE state = 'RESERVEDUPN' 
		  			 AND STATUS = 'LOCAL'`;
		 this.webSQL.playQuery('cacheData',qry6,this,'_synchroNotes');




	}


	_synchroNotes(results){

		let note_id = "";

		let len = results.rows.length, i;
		  for (i = 0; i < len; i++) {
		    
		    note_id = "";

		  	if(results.rows.item(i).note_id.length == 0 ){

		  		note_id = results.rows.item(i).note_tmpId;

		  	} else{

		  		note_id = results.rows.item(i).note_id;

		  	}

		    this.webSQL.playQuery('syncUP',
			                  `insert into Items ( timestamp,
			                                       status,
			                                       note_id,
												   note_title,
												   note_timestamp,
												   scope
			                                      )
			                   values (strftime('%Y-%m-%d %H:%M:%f', 'now'),
			                          "BEFOREUP",
			                          "`+note_id+`",
			                          "`+results.rows.item(i).note_title+`",
			                          "`+results.rows.item(i).note_timestamp+`",
			                          "note"
			                          )

			                 `);


		  }



		if(results.rows.length){


			//j'update aussi le status notes
			let qry2 = `UPDATE Notes
					    SET state = 'PREUP'
					    WHERE state = 'RESERVEDUPN'
						`;
			this.webSQL.playQuery('cacheData',qry2);


		 }






	}






	_synchroRessources(results){

		let note_id = "";
		let ressource_id = "";

		console.log("_synchroRessources");
		console.log(results);

		let len = results.rows.length, i;
		  for (i = 0; i < len; i++) {
		    
		    note_id = "";
		    ressource_id = "";

		  	if(results.rows.item(i).note_id.length == 0 ){

		  		note_id = results.rows.item(i).note_tmpId;

		  	} else{

		  		note_id = results.rows.item(i).note_id;

		  	}


		 	if(results.rows.item(i).ressource_id.length == 0 ){

		  		ressource_id = results.rows.item(i).ressource_tmpId;

		  	} else{

		  		ressource_id = results.rows.item(i).ressource_id;

		  	}


		    this.webSQL.playQuery('syncUP',
			                  `insert into Items ( timestamp,
			                                       status,
			                                       note_id,
												   note_title,
												   note_timestamp,
												   ressource_id,
												   ressource_title,
												   ressource_timestamp,
												   scope
			                                      )
			                   values (strftime('%Y-%m-%d %H:%M:%f', 'now'),
			                          "BEFOREUP",
			                          "`+note_id+`",
			                          "`+results.rows.item(i).note_title+`",
			                          "`+results.rows.item(i).note_timestamp+`",
			                          "`+ressource_id+`",
			                          "`+results.rows.item(i).ressource_title+`",
			                          "`+results.rows.item(i).ressource_timestamp+`",
			                          "ressource"
			                          )

			                 `);


		  }



		if(results.rows.length){

			let qry = `UPDATE Ressources
			           SET state = 'PREUP'
			           WHERE state = 'RESERVEDUPR' 
			           `;
			this.webSQL.playQuery('cacheData',qry);


			//j'update aussi le status notes
			let qry2 = `UPDATE Notes
					    SET state = 'PREUP'
					    WHERE note_id IN (SELECT note_id FROM Ressources WHERE state = 'PREUP')
					    AND state = 'RESERVEDUPR'
						`;
			this.webSQL.playQuery('cacheData',qry2);


		 }


	}



	_createRequestToServer(results){

		//console.log('IN _createRequestToServer !!!')

		let arrayToSend = [];
		let prepareData = {};
		let len = results.rows.length, i;
		  for (i = 0; i < len; i++) {

		  	prepareData = {};

		  	prepareData.timestamp = results.rows.item(i).timestamp;
		  	prepareData.status    = results.rows.item(i).status;
		  	prepareData.scope     = results.rows.item(i).scope;

		 	prepareData.note_id        = results.rows.item(i).note_id;
			prepareData.note_timestamp = results.rows.item(i).note_timestamp;
			prepareData.note_title     = results.rows.item(i).note_title;

		 	if(prepareData.scope != "note"){


		 		prepareData.ressource_id        = results.rows.item(i).ressource_id;
				prepareData.ressource_timestamp = results.rows.item(i).ressource_timestamp;
				prepareData.ressource_title     = results.rows.item(i).ressource_title;


				if(prepareData.scope != "ressource"){


					prepareData.item_id         = results.rows.item(i).item_id;
					prepareData.item_timestamp  = results.rows.item(i).item_timestamp;
					prepareData.item_type       = results.rows.item(i).item_type;
					prepareData.item_text       = results.rows.item(i).item_text;

					if(results.rows.item(i).item_type == 'image'){

						prepareData.item_path       = results.rows.item(i).item_path;

					}else if(results.rows.item(i).item_type == 'number'){

						prepareData.item_unit       = results.rows.item(i).item_unit;
						prepareData.item_value       = results.rows.item(i).item_value;

					}


				}

		 	}

		  	arrayToSend.push(prepareData);



			}

		if(arrayToSend.length){

			this.SvcBackEndComm.ajaxSend('POST',this.serverStorage.apiPrefixe + 'push',this,"_updateAfterRequest",arrayToSend);

			let qry = "UPDATE Items SET status = 'UPLOADING' WHERE status = 'BEFOREUP' ";
			this.webSQL.playQuery('syncUP',qry);


		}


	}


	_createRequestToServerDatas(results){

		if(results.rows.length == 0) return true;

		this.DatasToSend = results.rows.item(0);
		let name = this.DatasToSend.item_path;
			//on va chercher le fichier dans le storage
			let PersistLocalStore = new LocalStorage();
			PersistLocalStore.get(name,this, "sendDatasToServer");


			

			


		
	}



	sendDatasToServer(datas){

/*
		console.log('in sendDatasToServer');
		console.log(datas);
		console.log(this.DatasToSend);*/
		this.DatasToSend.datas = datas;
//TODO : A ne pas mettre en dur		
		this.DatasToSend.item_type = "image";
		this.SvcBackEndComm.ajaxSend('POST',this.serverStorage.apiPrefixe + 'pushDatas',this,"_updateAfterRequestData",this.DatasToSend);
		let qry = `UPDATE ItemsDatas
		           SET status = 'UPLOADING'
		           WHERE status = 'BEFOREUP'
		           AND timestamp = '`+this.DatasToSend.timestamp+`'
		           AND item_path = '`+this.DatasToSend.item_path+`'`;
		this.webSQL.playQuery('syncUP',qry);

	}



	_updateAfterRequestData(datas){

		console.log('_updateAfterRequestData');
		console.log(datas);

	//je supprime la ligne de sync up
			let qry2 = `UPDATE ItemsDatas 
					SET status = 'DONE'
			           WHERE timestamp = "`+datas.data.timestamp+`"
			           AND  item_id = "`+datas.data.item_id+`" 
			           AND  item_path = "`+datas.data.item_path+`"
			           AND  status = "UPLOADING"   
			           `;
			this.webSQL.playQuery('syncUP',qry2);


			
/*					//je supprime la ligne de sync up
			let qry = `DELETE FROM Items 
			           WHERE timestamp = "`+datas.data.timestamp+`"
			           AND  note_id = "`+datas.data.note_id+`" 
			           AND  ressource_id = "`+datas.data.ressource_id+`" 
			           AND  item_id = "`+datas.data.item_id+`" 
			           `;
			this.webSQL.playQuery('syncUP',qry);




//A REVOIR CAR EN 3 TABLES

			//je regarde si en base syncdata je retrouve ma ligne
			let qryTestLine = `UPDATE Items

	                          SET status = "SYNC",
								state  = "CLEAN" 
	 
							   WHERE timestamp = "`+datas.data.timestamp+`" 
					           AND  ressource_id = "`+datas.data.ressource_id+`" 
					           AND  item_id = "`+datas.data.item_id+`" 
					           AND STATE = "PARTIAL"
							  `;

			this.webSQL.playQuery('cacheData',qryTestLine);*/






/////////////////////////////////
			
			//j'enregistre dans le temporaire
			//data:image/jpeg;base64,
			//destroy persistent
			let TemporaryLocalStore = new LocalStorage('TEMPORARY');
			TemporaryLocalStore.push(datas.data.item_path,"data:image/jpeg;base64,"+datas.data.picture);
	

			let PersistLocalStore = new LocalStorage();
			PersistLocalStore.remove(datas.data.item_path);


		}
	


	_updateAfterRequest(datas){


		let len = datas.data.length, i;

		for (i = 0; i < len; i++) {


			//je regarde quel type d'enregistrement c'est


				this.webSQL.playQuery('syncUP',`UPDATE Items
				   SET status = "DONE"  
		           WHERE timestamp = "`+datas.data[i].timestamp+`"
		           AND scope = "`+datas.data[i].scope+`"
				   AND status = "UPLOADING" 
		           `);







			//j'insere dans la nouvelle table les infos et après je verais ce que j'en fais


  				this.webSQL.playQuery('syncUP',
			                  `insert into ItemsUpdata (timestamp         ,
													   status             ,
													   note_id            ,
													   note_tmpId         ,
													   note_title         ,
													   note_timestamp     ,
													   ressource_id       ,
													   ressource_tmpId    ,
													   ressource_title    ,
													   ressource_timestamp,
													   item_id            ,
													   item_tmpId         ,
													   item_type          ,
													   item_text          ,
													   item_timestamp     ,
													   item_value         ,
													   item_path          ,
													   item_unit          ,
													   scope              
			                                      )
			                   values ("`+datas.data[i].timestamp+`",
			                          "FRESH",
			                           "`+datas.data[i].note_id+`",            
									   "`+datas.data[i].note_tmpId+`",         
									   "`+datas.data[i].note_title+`",         
									   "`+datas.data[i].note_timestamp+`",     
									   "`+datas.data[i].ressource_id+`",       
									   "`+datas.data[i].ressource_tmpId+`",    
									   "`+datas.data[i].ressource_title+`",    
									   "`+datas.data[i].ressource_timestamp+`",
									   "`+datas.data[i].item_id+`",            
									   "`+datas.data[i].item_tmpId+`",         
									   "`+datas.data[i].item_type+`",          
									   "`+datas.data[i].item_text+`",          
									   "`+datas.data[i].item_timestamp+`",     
									   "`+datas.data[i].item_value+`",         
									   "`+datas.data[i].item_path+`",          
									   "`+datas.data[i].item_unit+`",          
									   "`+datas.data[i].scope+`"             
			                          )

			                 `);

			//mise a jour des tables cachedata
			//mise a jour de l'ihm via les id html
			//afin d'avoir le moins d'incoherence possible


			//on set deja tous les id définitf qu'on rencontre dans les requetes
				if(datas.data[i].note_tmpId){

							//deja je set on id si c'est vide
					this.webSQL.playQuery('cacheData',`UPDATE Notes
					   SET note_id = "`+datas.data[i].note_id+`"
					   WHERE note_tmpId = "`+datas.data[i].note_tmpId+`"
					   AND note_id != "`+datas.data[i].note_id+`"
					   `);

					//j'update les ressources qui y sont liées
					this.webSQL.playQuery('cacheData',`UPDATE Ressources
					   SET note_id = "`+datas.data[i].note_id+`"
			           WHERE note_id = "`+datas.data[i].note_tmpId+`"
			           `);	


										//je met à jour mon IHM en recherchant si j'ai des id qui traines dans le DOM
					while(document.getElementById(datas.data[i].note_tmpId)){

						document.getElementById(datas.data[i].note_tmpId).id = datas.data[i].note_id;
					}
/*					let elementToUpdate = document.getElementById(datas.data[i].note_tmpId);
					elementToUpdate.id = datas.data[i].note_id;*/

				}



				if(datas.data[i].ressource_tmpId){

										//deja je set on id si c'est vide
					this.webSQL.playQuery('cacheData',`UPDATE Ressources
					   SET ressource_id = "`+datas.data[i].ressource_id+`"
					   WHERE ressource_tmpId = "`+datas.data[i].ressource_tmpId+`"
					   AND ressource_id != "`+datas.data[i].ressource_id+`"
					   `);


					//j'update les items qui y sont liées
					this.webSQL.playQuery('cacheData',`UPDATE Items
					   SET ressource_id = "`+datas.data[i].ressource_id+`"
			           WHERE ressource_id = "`+datas.data[i].ressource_tmpId+`"
			           `);	

										//je met à jour mon IHM en recherchant si j'ai des id qui traines dans le DOM
					while(document.getElementById(datas.data[i].ressource_tmpId)){

						document.getElementById(datas.data[i].ressource_tmpId).id = datas.data[i].ressource_id;
					}


					//let elementToUpdate = document.getElementById(datas.data[i].ressource_tmpId);
					//elementToUpdate.id = datas.data[i].ressource_id;


				}




				if(datas.data[i].item_tmpId){

										//deja je set on id si c'est vide
					this.webSQL.playQuery('cacheData',`UPDATE Items
					   SET item_id = "`+datas.data[i].item_id+`"
					   WHERE item_tmpId = "`+datas.data[i].item_tmpId+`"
					   AND item_id != "`+datas.data[i].item_id+`"
					   `);


					//je met à jour mon IHM en recherchant si j'ai des id qui traines dans le DOM

					while(document.getElementById(datas.data[i].item_tmpId)){

						document.getElementById(datas.data[i].item_tmpId).id = datas.data[i].item_id;
					}


				//	let elementToUpdate = document.getElementById(datas.data[i].item_tmpId);
				//	elementToUpdate.id = datas.data[i].item_id;

				}




			//je reprends ma ligne et je met a jour cache Data
			if(datas.data[i].scope == "note"){


				//si mon timestamp est <= timestamp requete alors je met à jour sinon je laisse

				this.webSQL.playQuery('cacheData',`UPDATE Notes
				   SET state = "CLEAN",
				   status = "SYNC"  
		           WHERE timestamp <= "`+datas.data[i].note_timestamp+`"
		           AND state = "PREUP"
				   AND status = "LOCAL"
				   AND note_id = "`+datas.data[i].note_id+`"
		           `);




			}



			if(datas.data[i].scope == "ressource"){


				this.webSQL.playQuery('cacheData',`UPDATE Ressources
				   SET state = "CLEAN",
				   status = "SYNC"  
		           WHERE timestamp <= "`+datas.data[i].ressource_timestamp+`"
		           AND state = "PREUP"
				   AND status = "LOCAL"
				   AND ressource_id = "`+datas.data[i].ressource_id+`"
		           `);


				this.webSQL.playQuery('cacheData',`UPDATE Notes
				   SET state = "CLEAN",
				   status = "SYNC"  
		           WHERE timestamp <= "`+datas.data[i].note_timestamp+`"
		           AND state = "PREUP"
				   AND status = "LOCAL"
				   AND note_id = "`+datas.data[i].note_id+`"
		           `);



			}



			if(datas.data[i].scope == "item"){


				//j'update la ma table

				this.webSQL.playQuery('cacheData',`UPDATE Items
				   SET state = "CLEAN",
				   status = "SYNC"  
		           WHERE timestamp <= "`+datas.data[i].item_timestamp+`"
		           AND state = "PREUP"
				   AND status = "LOCAL"
				   AND item_id = "`+datas.data[i].item_id+`"
		           `);


				this.webSQL.playQuery('cacheData',`UPDATE Ressources
				   SET state = "CLEAN",
				   status = "SYNC"  
		           WHERE timestamp <= "`+datas.data[i].ressource_timestamp+`"
		           AND state = "PREUP"
				   AND status = "LOCAL"
				   AND ressource_id = "`+datas.data[i].ressource_id+`"
		           `);


				this.webSQL.playQuery('cacheData',`UPDATE Notes
				   SET state = "CLEAN",
				   status = "SYNC"  
		           WHERE timestamp <= "`+datas.data[i].note_timestamp+`"
		           AND state = "PREUP"
				   AND status = "LOCAL"
				   AND note_id = "`+datas.data[i].note_id+`"
		           `);


				console.log("before if for alimetatiopn image");
				console.log(datas.data[i]);

				//si il y a une image à remonter
				if(datas.data[i].type == 'image' && datas.data[i].item_path){


						this.webSQL.playQuery('syncUP',
			                  `insert into ItemsDatas ( timestamp,
			                                       status,
			                                       note_id,
												   ressource_id,
												   item_id,
												   item_type,
												   item_path
			                                      )
			                   values ("`+datas.data[i].item_timestamp+`",
			                          "BEFOREUP",
			                          "`+datas.data[i].note_id+`",
			                          "`+datas.data[i].ressource_id+`",
			                          "`+datas.data[i].item_id+`",
			                          "PERSISTENT",
			                          "`+datas.data[i].item_path+`"
			                          )

			                 `);





				}





			}

		}









//todo: jE PENSE QU4IL MANQUE UN foR 
/*
		console.log("_updateAfterRequest");
		console.log(datas);*/
					//on regarde si on a du temporaire pour les id
/*
		let NoteId = "";
		let ResourceId = "";
		let ItemId = "";*/

		/*let len = datas.data.length, i;
		  for (i = 0; i < len; i++) {*/

/*		  	NoteId = (datas.data[i].note_tmpId) ? datas.data[i].note_tmpId : datas.data[i].note_id;
			ResourceId = (datas.data[i].ressource_tmpId) ? datas.data[i].ressource_tmpId : datas.data[i].ressource_id;
			ItemId = (datas.data[i].item_tmpId) ? datas.data[i].item_tmpId : datas.data[i].item_id;*/




	   /* }*/

/*
		if(!datas.data[i].type){


						this.webSQL.playQuery('cacheData',`UPDATE Notes
	                            SET note_id =  "`+datas.data[i].note_id+`",
								status = "SYNC",
								state  = "CLEAN"
	 
							   WHERE note_id = "`+NoteId+`" 
					           AND status = "LOCAL"
					           AND STATE = "PREUP"
							  `);	



			if(datas.data[i].ressource_id) {


							//il faut mettre a jour les id
				this.webSQL.playQuery('cacheData',`UPDATE Ressources
	                            SET ressource_id =  "`+datas.data[i].ressource_id+`"  ,
								note_id =  "`+datas.data[i].note_id+`"   ,
								status = "SYNC",
								state  = "CLEAN"
	 
							   WHERE ressource_id = "`+ResourceId+`" 
					           AND  note_id = "`+NoteId+`" 
					           AND status = "LOCAL"
					           AND STATE = "PREUP"
							  `);	



			}

		
						this.webSQL.playQuery('syncUP',`DELETE FROM Items 
								           WHERE note_id = "`+NoteId+`" 
								           AND note_timestamp = "`+datas.data[i].note_timestamp+`"
								           AND status = 'UPLOADING' 
								           `);




		}





		if(datas.data[i].type == 'text'){



					//je supprime la ligne de sync up

			this.webSQL.playQuery('syncUP',`DELETE FROM Items 
								           WHERE timestamp = "`+datas.data[i].timestamp+`"
								           AND  note_id = "`+NoteId+`" 
								           AND  ressource_id = "`+ResourceId+`" 
								           AND  item_id = "`+ItemId+`" 
								           `);

			//je regarde si en base syncdata je retrouve ma ligne
			this.webSQL.playQuery('cacheData',`UPDATE Items
	                           SET ressource_id =  "`+datas.data[i].ressource_id+`"  ,
								item_id =  "`+datas.data[i].item_id+`"   ,
								status = "SYNC",
								state  = "CLEAN" 
	 
							   WHERE timestamp = "`+datas.data[i].timestamp+`" 
					           AND  ressource_id = "`+ResourceId+`" 
					           AND  item_id = "`+ItemId+`"
					           AND status = "LOCAL" 
					           AND STATE = "PREUP"
							  `);

			//il faut mettre a jour les id
			this.webSQL.playQuery('cacheData',`UPDATE Ressources
	                            SET ressource_id =  "`+datas.data[i].ressource_id+`"  ,
								note_id =  "`+datas.data[i].note_id+`"   ,
								status = "SYNC",
								state  = "CLEAN"
	 
							   WHERE ressource_id = "`+ResourceId+`" 
					           AND  note_id = "`+NoteId+`" 
					           AND status = "LOCAL"
					           AND STATE = "PREUP"
							  `);			


			this.webSQL.playQuery('cacheData',`UPDATE Notes
	                            SET note_id =  "`+datas.data[i].note_id+`",
								status = "SYNC",
								state  = "CLEAN"
	 
							   WHERE note_id = "`+NoteId+`" 
					           AND status = "LOCAL"
					           AND STATE = "PREUP"
							  `);	



		}else if(datas.data[i].type == 'image'){


				this.webSQL.playQuery('syncUP',`UPDATE Items 
												SET note_id =  "`+datas.data[i].note_id+`"   ,
												ressource_id =  "`+datas.data[i].ressource_id+`"  ,
												item_id =  "`+datas.data[i].item_id+`"   ,
												status = "WAITUPDATA"
										           WHERE timestamp = "`+datas.data[i].timestamp+`"
										           AND  note_id = "`+NoteId+`" 
										           AND  ressource_id = "`+ResourceId+`" 
										           AND  item_id = "`+ItemId+`" 
										           `);


		    	this.webSQL.playQuery('syncUP',
			                  `insert into ItemsDatas ( timestamp,
			                                       status,
			                                       note_id,
												   ressource_id,
												   item_id,
												   item_type,
												   item_path
			                                      )
			                   values ("`+datas.data[i].timestamp+`",
			                          "BEFOREUP",
			                          "`+datas.data[i].note_id+`",
			                          "`+datas.data[i].ressource_id+`",
			                          "`+datas.data[i].item_id+`",
			                          "PERSISTENT",
			                          "`+datas.data[i].item_path+`"
			                          )

			                 `);


				this.webSQL.playQuery('cacheData',`UPDATE Items
		                            SET ressource_id =  "`+datas.data[i].ressource_id+`"  ,
									item_id =  "`+datas.data[i].item_id+`"   ,
									status = "WAITUPDATA",
									state  = "PARTIAL" 
		 
								   WHERE timestamp = "`+datas.data[i].timestamp+`" 
						           AND  ressource_id = "`+ResourceId+`" 
						           AND  item_id = "`+ItemId+`" 
						           AND STATE = "PREUP"
								  `);


			
	


			}


		NoteId = "";
		ResourceId = "";
		ItemId = "";



		}*/



	}





//app component

	get(guid,callBackObj,callBackMethod){

		let qry = "SELECT * FROM Notes WHERE note_id = '"+guid+"'";
		this.webSQL.playQuery('cacheData',qry,callBackObj,callBackMethod);

	}






	
	


/*	queuePrepareSend(){

		//je lock tout ce qui est ready
		this.playQuery('update Notes SET status = "LOCKED" where status = "READY"');

		//j'envoi
		this.playQuery('select * from Notes where status = "LOCKED"',"sendCommand");

	}*/









	  Push(from,datas){

/*	datas =  {Note: {…}, Resource: {…}}
			Note:
				Title
				Ts
				id
			Resource:
				action
				card
				id
				type
				update
				resource:
					text*/

	// Je supprime de mon object data ce qui ne sert à rien et le supprime.
	let dataCallback = datas;
	let dataSend = datas;
	//delete dataSend.Resource.card;


    let result = this.SvcBackEndComm.ajaxSend('POST',this.apiPrefixe + 'push',from,dataCallback,dataSend);

  }
















}