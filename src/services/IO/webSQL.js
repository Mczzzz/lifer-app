import DBLocalCollection from '../../collections/DBLocalCollection.js';

export default class webSQL{


	constructor(){


		this.DBLocalCollection = new DBLocalCollection();

	}


	executeTransaction(base, query) {
	    console.log("Transaction Query : " + query);
	    let Bdd = this.DBLocalCollection.getDBConnection(base);
	    let nullHandler = errorHandler = "";
	    return new Promise(function (resolve, reject) {
	        Bdd.transaction(function (transaction) {
	            transaction.executeSql(query, [], function (transaction, result) {
	                console.log("Test: " + JSON.stringify(result));
	                resolve(result); // here the returned Promise is resolved
	            }, nullHandler, errorHandler);
	        });
	    });
	}






	playQuery(base,query,callbackObj = false, callbackMethod = false){
/*		//console.log'in play Query');
		//console.logquery);*/

		let Bdd = this.DBLocalCollection.getDBConnection(base);
		////console.logBdd);
		Bdd.transaction((db)=>this.execQuery(db,query,false,callbackObj,callbackMethod));

	}


	execQuery(db,query,args = false, callbackObj = false, callbackMethod = false){

	if(!args) args = [];
	//	//console.logquery);
/*			//console.log'exec Query');
		//console.logquery);*/


		db.executeSql(query,args,(tx,results)=>this.webSQLsucess(tx,results,query,callbackObj,callbackMethod),(tx,errors)=>this.webSQLerror(tx,errors,query));
	}


	webSQLsucess(tx,results,query,callbackObj = false, callbackMethod = false){

		////console.log"webSQLsuccess");
/*		//console.logtx);
		//console.logresults);
		//console.logquery);*/
		if(callbackObj && callbackMethod){
			callbackObj[callbackMethod](results);
		}

	}


	webSQLerror(tx,errors,query){

		console.log("webSQLerror");
		console.log(tx);
		console.log(errors);
		console.log(query);

	}





}
