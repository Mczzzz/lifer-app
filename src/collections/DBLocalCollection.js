export default class DBLocalCollection {
	

	constructor(){

	}



	getcacheData(){

		let DBcacheData   = {};
		DBcacheData.name        = "cacheData";
		DBcacheData.version     = "1.0";
		DBcacheData.description = "synchro locale";
		DBcacheData.size = 2 * 1024 * 1024;

		return DBcacheData;

	}



	getsyncUP(){

		let DBcacheData   = {};
		DBcacheData.name        = "syncUP";
		DBcacheData.version     = "1.0";
		DBcacheData.description = "synchro locale";
		DBcacheData.size = 2 * 1024 * 1024;

		return DBcacheData;

	}





	getsyncData(){

		let DBSyncData   = {};
		DBSyncData.name        = "syncData";
		DBSyncData.version     = "1.0";
		DBSyncData.description = "synchro locale obsolete";
		DBSyncData.size = 2 * 1024 * 1024;

		return DBSyncData;

	}






/*
	getsyncUp(){

		let DBSyncUp   = {};
		DBSyncUp.name        = "syncUp";
		DBSyncUp.version     = "1.0";
		DBSyncUp.description = "Buffer de syncho vers le serveur localStorage";
		DBSyncUp.size = 2 * 1024 * 1024;

		return DBSyncUp;

	}*/



	getDBConnection(db){


		let Base = this["get"+db]();
		return openDatabase(Base.name, Base.version, Base.description, Base.size);

	}


}