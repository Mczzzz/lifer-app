/*import EXIF             from 'exif-orientation';

import { Lifer } from './Lifer.js';
import LocalStorage from './LocalStorage.js';

import LoaderCollection from './Loader/LoaderCollection.js';

export default class LoaderDatas {
	

	constructor(name,itemID,targetToLoadData){

		this.name = name;
		this.elt = targetToLoadData;
		this.itemId = itemID;

		this.NotesCollection = new LoaderCollection("Notes");


		this.init();
	}


	init(){

		//je tente de lire le temporary pour voir
		let TemporaryLocalStore = new LocalStorage();
		TemporaryLocalStore.get(name,this,'loadIn');



	}



	loadIn(datas){

		//console.log'In Load IN');
		//console.logdatas.name);
		//console.logtypeof datas);

		if(datas.name == "TypeMismatchError"){

			//console.log'IN DOMExeptions !!!!!!!!!!!!!');

			//on va chercher l'image sur le serveur
			this.NotesCollection.getPictureFromServer(this.itemId+"_"+this.name,this,'synchoApp');


		}else{




		}




	}


	synchoApp(datas){

		//console.log'IN SYNCHO APP FROM IMAGE SERVER');

		let objectURL = URL.createObjectURL(datas);

		//console.log'in synchro app');
		//console.logthis.elt);

		this.elt.setData(objectURL);
		////console.logdatas);


	}


}

*/