import uuid from "uuid/v1"

class Brain {
	

	constructor(){

		this.dataCenter = {}; 

		//app.views.objects.footer.
/*							main.
							header.
							data[containerId
								 leafId]
							tigger[]*/
		

	}


	dumpMe(){

		console.log(this.dataCenter);

	}

destroy(path){

//formater le path
	let arrayPath = path.split("-");

	let dataRepresentation = this.dataCenter;

	let dataRepresentationMe;

	let TerminaisonPath;

	for(let myPath of arrayPath ){

		TerminaisonPath = myPath;
		dataRepresentationMe = dataRepresentation;
		dataRepresentation = dataRepresentation[myPath];
	}

	delete dataRepresentationMe[TerminaisonPath];

}



addMe(path){

		if(path.length > 0 ){

			let level = 0;

			let arrayPath = path.split("-");

			let dataRepresentation = this.dataCenter;

			for(let myPath of arrayPath ){

				if (myPath == "null") continue; 

				/*let realName = myPath.split("-");

				if(realName.length > 1){
					myPath = realName[realName.length - 1];
				}*/


				if(!(dataRepresentation[myPath] instanceof Object)){
					dataRepresentation[myPath] = {};
					dataRepresentation[myPath]._datas = {};
					dataRepresentation[myPath]._datas.level = level + 1;
				}else{

					level = dataRepresentation[myPath]._datas.level;

				}

				dataRepresentation = dataRepresentation[myPath];

			}

		}

		//this.dumpMe();
	}


	addData(path,dataArray){

		if(path.length == 0) return false;

		let arrayPath = path.split("-");

		let dataRepresentation = this.dataCenter;


		for(let myPath of arrayPath ){

			if (myPath == "null") continue;


			if(!(dataRepresentation[myPath] instanceof Object)){
				console.log('aie '+myPath+' not exist');
				return false;
			}

			dataRepresentation = dataRepresentation[myPath];

		}


		if(!(dataRepresentation._datas instanceof Object)){

			dataRepresentation._datas = {};

		}			

	//	console.log(dataArray);
		
		for(let myData of dataArray ){
//			console.log(myData);
			
				dataRepresentation._datas[Object.keys(myData)[0]] = myData[Object.keys(myData)[0]];


			
		}

/*
		if((dataRepresentation._trigger instanceof Object)){

//TODO : il faut controller s'il y a des objets a prevenirs
		}*/	



	}



	getData(path,Key, level = 0){

	//	console.log(path);
		if(path.length == 0) return false;

		let arrayPath = path.split("-");

		if(level > 0){

			arrayPath.splice(arrayPath.length - level, level);

		}

		let dataRepresentation = this.dataCenter;


		for(let myPath of arrayPath ){


/*			let realName = myPath.split("-");
			console.log("realName");
			console.log(realName);
			console.log(realName.length);

			if(realName.length > 1){
				myPath = realName[realName.length - 1];
			}*/


			if(!(dataRepresentation[myPath] instanceof Object)){
				console.log('aie '+myPath+' not exist');
				return false;
			}

			dataRepresentation = dataRepresentation[myPath];

		}


		if(!(dataRepresentation._datas instanceof Object)){

			console.log('Pas de datas setter')
			return false;

		}			

		if(!(dataRepresentation._datas[Key] instanceof Object)){

			console.log("Cette clef de data n'existe pas");
			return false;

		}	


		return dataRepresentation._datas[Key];


	}



/*	addTrigger(path,data,callBack){

	}*/



	matcher(e,el){

		for(let target of this.targets){


			target.element[target.methode](el.value);

		}

	}



	getScreenSize(){

		let w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
	    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

	    let screen = {};

		screen.width  = x;
		screen.height = y;

		return screen;


	}



	newTmpId(){

		return uuid().replace(/-/gi, '.');

	}



}

const instance = new Brain();
export { instance as Lifer };
