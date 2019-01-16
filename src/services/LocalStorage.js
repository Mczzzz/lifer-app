import { Lifer } from '../services/Lifer.js';

export default class LocalStorage {


	constructor(type = "PERSISTENT"){

		this.type = type;

		this.grantedBytes = 1024*1024*100;

		this.callback = false
		

	}





	push(name, Myfile){

/*		this.pict = pict;
		this.name = name;*/
		

		navigator.webkitPersistentStorage.requestQuota ( this.grantedBytes, (grantedBytes) => this.pushAction(grantedBytes, name, Myfile), (e) => this.consoleSizeError(e) );


	}


	get(name, callbackObj = false, callbackMethod = false){

		if(callbackObj && callbackMethod){

			this.callback = {};
			this.callback.obj = callbackObj;
			this.callback.method = callbackMethod;

		}

		

		navigator.webkitPersistentStorage.requestQuota ( this.grantedBytes, (grantedBytes) => this.getAction(grantedBytes, name), (e) => this.consoleSizeError(e) );	

	}


	remove(name){

		navigator.webkitPersistentStorage.requestQuota ( this.grantedBytes, (grantedBytes) => this.removeAction(grantedBytes, name), (e) => this.consoleSizeError(e) );	

	}



	getAction(grantedBytes,name){


		let that = this;

		function onInitFs(fs) {


			function errorHandler(e){

				console.log(e);
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

		 window.webkitRequestFileSystem(this.type, grantedBytes, onInitFs, this.errorHandler);



	}


	removeAction(grantedBytes,name){


		let that = this;

		function onInitFs(fs) {


			function errorHandler(e){

				console.log(e);
			}

			function file(){

				console.log("File Removed from persistent");

			}


			function fileEntry(fileEntry){

				 fileEntry.remove(file, errorHandler);
			}


	        fs.root.getFile(name ,{create: false}, fileEntry , errorHandler);

		}

		 window.webkitRequestFileSystem(this.type, grantedBytes, onInitFs, this.errorHandler);



	}





	toCallBack(MyFile){
		
		if(this.callback){

			this.callback.obj[this.callback.method](MyFile);

		}
	
	}




	pushAction(grantedBytes,name,pict){


	//	let pict = this.pict;
	


		function onInitFs(localstorage){




			function errorHandler(e){

				console.log(e);
			}

			function fileEntry(fileEntry){

				fileEntry.createWriter(fileW , errorHandler);
			}


			function fileW(fileWriter){



			      fileWriter.onwriteend = function(e) {
			        console.log('Write completed.');
			      };

			      fileWriter.onerror = function(e) {
			        console.log('Write failed: ' + e.toString());
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

			console.log(e);
		}



	consoleSize(usedBytes, grantedBytes){
		console.log('we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
	}


	consoleSizeError(e){
		console.log('Error', e);
	}


	getSize(){
		navigator.webkitPersistentStorage.queryUsageAndQuota ( (usedBytes, grantedBytes) => this.consoleSize(usedBytes, grantedBytes), (e) => this.consoleSizeError(e) );
	}



}