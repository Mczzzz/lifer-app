import { Lifer } from '../../services/Lifer.js';

export default class LocalStorage {


	constructor(type = "PERSISTENT"){

		this.type = type;

		this.grantedBytes = 1024*1024*100;

		this.callback = false
		

	}





	push(name, Myfile){

/*		this.pict = pict;
		this.name = name;*/
		

		if(this.type == "PERSISTENT"){
			navigator.webkitPersistentStorage.requestQuota ( this.grantedBytes, (grantedBytes) => this.pushAction(grantedBytes, name, Myfile), (e) => this.consoleSizeError(e) );
		}else if(this.type == "TEMPORARY"){
			navigator.webkitTemporaryStorage.requestQuota ( this.grantedBytes, (grantedBytes) => this.pushAction(grantedBytes, name, Myfile), (e) => this.consoleSizeError(e) );
		}
		


	}


	get(name, callbackObj = false, callbackMethod = false){

		if(callbackObj && callbackMethod){

			this.callback = {};
			this.callback.obj = callbackObj;
			this.callback.method = callbackMethod;

		}

		if(this.type == "PERSISTENT"){
			navigator.webkitPersistentStorage.requestQuota ( this.grantedBytes, (grantedBytes) => this.getAction(grantedBytes, name), (e) => this.consoleSizeError(e) );
		}else if(this.type == "TEMPORARY"){
			navigator.webkitTemporaryStorage.requestQuota ( this.grantedBytes, (grantedBytes) => this.getAction(grantedBytes, name), (e) => this.consoleSizeError(e) );
		}
		

			

	}


	remove(name){

		if(this.type == "PERSISTENT"){
			navigator.webkitPersistentStorage.requestQuota ( this.grantedBytes, (grantedBytes) => this.removeAction(grantedBytes, name), (e) => this.consoleSizeError(e) );	
		}else if(this.type == "TEMPORARY"){
			navigator.webkitTemporaryStorage.requestQuota ( this.grantedBytes, (grantedBytes) => this.removeAction(grantedBytes, name), (e) => this.consoleSizeError(e) );	
		}


	}



	getAction(grantedBytes,name){


		//console.logthis.type);

		let that = this;

		//console.logthat.type);

		function onInitFs(fs) {


			function errorHandler(e){

				//console.loge);
				that.toCallBack(e);
			}

			function file(file){


				let reader = new FileReader();

				//reader.readAsDataURL(elt);
				reader.readAsText(file);

				reader.onloadend = ()=> that.toCallBack(reader.result);

			}


			function fileEntry(fileEntry){

				 fileEntry.file(file, errorHandler);
			}


	        fs.root.getFile(name , {}, fileEntry , errorHandler);

		}

		//console.logthis.type);
		//console.logthat.type);
		

		 window.webkitRequestFileSystem(this.type, grantedBytes, onInitFs, this.errorHandler);



	}


	removeAction(grantedBytes,name){


		let that = this;

		function onInitFs(fs) {


			function errorHandler(e){

				//console.loge);
			}

			function file(){

				//console.log"File Removed from persistent");

			}


			function fileEntry(fileEntry){

				 fileEntry.remove(file, errorHandler);
			}


	        fs.root.getFile(name ,{create: false}, fileEntry , errorHandler);

		}

		 window.webkitRequestFileSystem(this.type, grantedBytes, onInitFs, this.errorHandler);



	}





	toCallBack(MyFile){
		
		//console.log"IN CALLBACK LOCALSTORAGE");
		//console.logthis.type);
		//console.logMyFile);

		if(this.callback){

			this.callback.obj[this.callback.method](MyFile);

		}
	
	}




	pushAction(grantedBytes,name,pict){


	//	let pict = this.pict;
	


		function onInitFs(localstorage){




			function errorHandler(e){

				//console.loge);
			}

			function fileEntry(fileEntry){

				fileEntry.createWriter(fileW , errorHandler);
			}


			function fileW(fileWriter){



			      fileWriter.onwriteend = function(e) {
			        //console.log'Write completed.');
			      };

			      fileWriter.onerror = function(e) {
			        //console.log'Write failed: ' + e.toString());
			      };


			      // Create a new Blob and write it to log.txt.
			      let blob = new Blob([pict], {type: 'image/jpg'});

			      fileWriter.write(blob);



				}


			localstorage.root.getFile(name, {create: true}, fileEntry , errorHandler);



			}


		 window.webkitRequestFileSystem(this.type, grantedBytes, onInitFs, this.errorHandler);


		 this.getSize();

	}


       errorHandler(e){

			//console.loge);
		}



	consoleSize(usedBytes, grantedBytes){
		//console.log'we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
	}


	consoleSizeError(e){
		//console.log'Error', e);
	}


	getSize(){

		if(this.type == "PERSISTENT"){
			navigator.webkitPersistentStorage.queryUsageAndQuota ( (usedBytes, grantedBytes) => this.consoleSize(usedBytes, grantedBytes), (e) => this.consoleSizeError(e) );
		}else if(this.type == "TEMPORARY"){
			navigator.webkitTemporaryStorage.requestQuota ( (usedBytes, grantedBytes) => this.consoleSize(usedBytes, grantedBytes), (e) => this.consoleSizeError(e) );	
		}


	}



}