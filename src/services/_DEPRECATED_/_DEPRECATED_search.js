class search {
	

	constructor(){

		this.targets = [];  
		this.inputs = [];
	}





	//PUBLICS
	addTarget(elMethode){

		this.targets.push(elMethode);

	}


	addInput(el){

		this.inputs.push(el);	
		el.addEventListener("keyup", (e)=> this.match(e,el));

	}


	removeTarget(el){

		let it = 0;
		for(let target of this.targets){

			if(target.me == el){

				this.targets.splice(it,1);

			}

			break;
			it++;
			
		}



	}


	removeInput(){


	}



	match(e,el){


		for(let target of this.targets){

			target.element[target.methode](el.innerHTML);

		}

	}



}

const instance = new search();
export { instance as SearchServices };
