import EXIF             from 'exif-orientation';

import { Lifer } from './Lifer.js';
import LocalStorage from './IO/LocalStorage.js';

import LoaderCollection from './Loader/LoaderCollection.js';

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

		//this.TemporaryLocalStore = new LocalStorage('TEMPORARY');
		this.PersistentLocalStore = new LocalStorage();

		this.NotesCollection = new LoaderCollection("Notes");

		this.callBack = false;
		this.element = false;
		this.name = false;
		this.prefixe = false;

	}


	showFile(name,prefixe){

		this.name = name;
		this.prefixe = prefixe;
		//console.log'FILEMANAGER SHOWFILE');

		//this._getInTemporary();
		this._getInPersistent();

	}


	getFile(name){

		this.name = name;

		//console.log'FILEMANAGER GETFILE');

		//this._getInTemporary();
		this._getInPersistent();

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

		this.name  = Lifer.newTmpId()+".jpg";		

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
		//console.log"_loadPict!!!!!!!!!!!!!!!!!!!!");
		//console.logthis.name);
        this.PersistentLocalStore.push(this.name,pict);

		//this.TemporaryLocalStore.push(this.name,pict);

		this._returnResult(pict, this.name);
		
	}










	_getInTemporary(){

		//console.log'IN TEMPORARY GET');

		this.TemporaryLocalStore.get(this.name,this,'_loadInTmp');

	}


	_loadInTmp(datas){

		//console.log"_loadInTmp");
		//console.logdatas);
		//console.logdatas.name);
		//console.logdatas.code);
		//console.logdatas.message);


		if(datas.code == 8){

			this._getInPersistent();

		}else{

			this._returnResult(datas);

		}

	}




	_getInPersistent(){

		//console.log'IN PERSISTENT GET');
		this.PersistentLocalStore.get(this.name,this,'_loadInPersist');

	}


	_loadInPersist(datas){

		//console.log"_loadInPersist");
		//console.logdatas);
		//console.logdatas.name);
		//console.logdatas.code);
		//console.logdatas.message);


		if(datas.name == "TypeMismatchError" || datas.code == 8){

			this._getFromServer(this.name);

		}else{

			this._returnResult(datas);

		}

	}


	_getFromServer(){

		let uriName = false;
		if(this.prefixe){
			uriName = this.prefixe + "_" + this.name;
		}else{
			uriName = this.name;
		}

		this.NotesCollection.getPictureFromServer(uriName,this,'_returnResult');

	}


	_returnResult(datas){


		//'data:image/bmp;base64,'+Base64.encode(blob)

		//console.log"_returnResult");
		//console.logdatas);
		//console.logtypeof datas);
		if(typeof datas == "object"){

			datas = window.URL.createObjectURL(datas);
		//datas = 'data:image/bmp;base64,'+Base64.encode(datas);

		}


		if(this.element) this.element.setData(datas);
		
		if(this.callBack) this.callBack.object[this.callBack.method](datas,this.name);

	}





			

}

