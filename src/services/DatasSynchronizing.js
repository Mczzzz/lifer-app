import Moment from 'moment';
import 'moment/locale/fr';

import webSQL from './webSQL.js';

import LoaderCollection from './LoaderCollection.js';


class DatasSynchronizing {
	

	constructor(){

		this.active = false;

		this.webSQL = new webSQL();

		this.init();
	

	}


	init(){

		//Init de la table Note si pas encore fait
/*		this.NoteCollection = new LoaderCollection('Note');
		this.NoteCollection.init();*/


		this.NotesCollection = new LoaderCollection('Notes');
		this.NotesCollection.init();


		//this.playQuery(this.NoteCollection.tables);



		this.startService();


	}


	startService(){

		this.service = setInterval(()=> this.checkConnect() , 10000 );

	}

	stopService(){

		clearInterval(this.service);

	}



	checkConnect(){


		let qry = "SELECT * FROM Params WHERE name = 'is_auth'";
		// je copie dans ma base de remonté syncUP les LOCAL de plus d'une seconde
		this.webSQL.playQuery('cacheData',qry,this,'fillQueue');

//TODO : requete sur le param de connection et a renvoyé vers fillqueue		


	}



	fillQueue(datas){

		console.log('in fill queue');
		console.log(datas);

		if(datas.data.length == 1 && datas.data[0].is_auth){

			////le service fill queue doit référencer l'ensemble des collection et c'est  lui qui se charge de la synchro montante vers le serveur
			this.NotesCollection.synchroToServer();


		}else{

			// on lance la page de login
					//il faut te logger monsieur
					let LinkEvent = new CustomEvent('changeRoute', {'detail' : {'frame' : 'Login'}});
					window.dispatchEvent(LinkEvent);


		}

	}



	store(data){

		//on va chercher la collection dans data
		//on y appel la methode store
			// qui pousse dans la localstorage

		let Collection = this[data.collection+"Collection"];
		Collection.store(data);

	}




	sendCommand(purchases){
//		console.log('in send command');

		for(let cmd of Array.from(purchases.rows)){
/*
			console.log(cmd);
			console.log(JSON.parse(cmd.collection));
*/
			this.add(JSON.parse(cmd.dispatch_to),JSON.parse(cmd.collection),false,cmd.id,false);


		}

	}




	playQuery(query,callback = false){
		this.syncData.transaction((db)=>this.execQuery(db,query,false,callback));
	}

	execQuery(db,query,args = false, callback = false){

	if(!args) args = [];

		db.executeSql(query,args,(tx,results)=>this.webSQLsucess(tx,results,callback),(tx,errors)=>this.webSQLerror(tx,errors));
	}


	webSQLsucess(tx,results,callback = false){

/*		console.log("webSQLsuccess");
		console.log(tx);
		console.log(results);*/
		if(callback){
			this[callback](results);
		}

	}


	webSQLerror(tx,errors){

		console.log("webSQLerror");
		console.log(tx);
		console.log(errors);

	}




	purchaseOrder(){

		let stackId = Moment().format('x') + "-" + Math.floor(Math.random() * Math.floor(100000));

		this.playQuery('insert into Notes (id,status) values ('+stackId+',"INIT")');


		return stackId;

	}



	add(dispatchResponseTo,to,datas,purchaseOrder,needTmpId=false){

		console.log(to);
		let MaCommande = {};
		MaCommande.to = to;
		MaCommande.dispatchResponseTo  = dispatchResponseTo ;
		MaCommande.datas = datas;


		let collection = new LoaderCollection(to.collection);
		collection[to.method](dispatchResponseTo,datas);
	


	}





	receipt(orderNumber){
		//suppresion de la commande de la stack 


		if(this.Stack[orderNumber].status == "sending"){

			delete this.Stack[orderNumber];

			return true;	

		}

		return false;
		

	}




}

const instance = new DatasSynchronizing();
export { instance as DatasSynchronizing };
