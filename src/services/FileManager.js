import EXIF             from 'exif-orientation';

import { Lifer } from './Lifer.js';
import LocalStorage from './LocalStorage.js';

import LoaderCollection from './LoaderCollection.js';

export default class FileManager {
	

	//recuprer une data par son nom:
	//args: nom
		//recherche dans le temporary
		//recherche dans le persistent
		//recherche sur le serveur si rien


	//faire une demande d'ajout depuis la device et de synchro
	//args : nom,target ou il faut l'afficher si besoin
		//je cree les élements html necessaire pour récuprer la data (input file)
		//je load depuis l'url et le met dans le temporary
		//je load depuis l'url et le met dans le persistant
		//je renvoi une information comme quoi je suis pret



	constructor(){

		this.TemporaryLocalStore = new LocalStorage('TEMPORARY');
		this.PersistentLocalStore = new LocalStorage();

		this.callBack = false;
		this.element = false;

	}


	showFile(name){

		console.log('FILEMANAGER SHOWFILE');

		this._getInTemporary(name);

	}


	getFile(name){

		console.log('FILEMANAGER GETFILE');

		this._getInTemporary(name);

	}

	setCallBack(callbackObj,callbackMethod){

		this.callBack = {};
		this.callBack.object = callbackObj;
		this.callBack.method = callbackMethod;

	}

	setElement(element){

		this.element = element;

	}


	//type : camera | ""
	uploader(type){

		let dropZone = false;
		//je regarde si ma zone d'upload est active ou non
		if (document.getElementsByClassName("dropZone")[0] !== undefined){

			dropZone = document.getElementsByClassName("dropZone")[0]; 
			
 		}else{

 			dropZone = document.createElement("div");
 			dropZone.className = "dropZone";
 			document.body.append(dropZone);
 			dropZone.style.display = "none";

 		}

 		//J'ajoute mon champs specifique à ma demande
 		let inputDrop = document.createElement("input");
 		inputDrop.type = "file";
 		inputDrop.accept = "image/*";
 		inputDrop.capture = type;

 		dropZone.append(inputDrop);

 		inputDrop.click();

		inputDrop.addEventListener("change", ()=>this._importPict(inputDrop.files[0]));


	}


	_importPict(file){

		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = ()=> this._loadPict(reader.result);

	}


	_loadPict(pict){


		let name = Lifer.newTmpId()+".jpg";


        this.PersistentLocalStore.push(name,pict);

		this.TemporaryLocalStore.push(name,pict);

		this._returnResult(pict, name);
		
	}










	_getInTemporary(name){

		console.log('IN TEMPORARY GET');

		this.TemporaryLocalStore.get(name,this,'_loadInTmp');

	}


	_loadInTmp(datas){

		console.log("_loadInTmp");
		console.log(datas);
		console.log(datas.name);
		console.log(datas.code);
		console.log(datas.message);


		if(datas.name == "TypeMismatchError"){

			this._getInPersistent(name);

		}else{

			this._returnResult(datas);

		}

	}




	_getInPersistent(name){

		console.log('IN PERSISTENT GET');
		this.PersistentLocalStore.get(name,this,'_loadInPersist');

	}


	_loadInPersist(datas){


		if(datas.name == "TypeMismatchError"){

			this._getFromServer(name);

		}else{

			this._returnResult(datas);

		}

	}


	_getFromServer(name){

		this.NotesCollection.getPictureFromServer(name,this,'_returnResult');

	}


	_returnResult(datas, name = false){


		if(this.element) this.element.setData(datas);
		
		if(this.callBack) this.callBack.object[this.callBack.method](datas,name);

	}





			

}

