import LoaderCollection from '../../../services/LoaderCollection.js';
//import jstree from 'jstree';

export default class jsTreeContainer {

/*

	constructor(HTMLParent,collection,MyClass){

		//create the div to attach to parent
		this.MyClass = MyClass;
		this.JsTree = document.createElement("div");
		this.JsTree.className = this.MyClass;
		this.HTMLParent = HTMLParent;
		this.HTMLParent.append(this.JsTree);
		this.searchElt = false;
		this.BreadEventCallBack = false;
		this.collection = new LoaderCollection(collection);
		this.initJsTree();

		this.initCallBackEvents();

		$('.'+this.MyClass).on("rename_node.jstree", (e,data)=>this.onRenameJsTree(e,data));
		$('.'+this.MyClass).on("create_node.jstree", (e,data)=>this.onCreateJsTree(e,data));
	}

/*	getHTMLParent(){
		return this.HTMLParent;
	}*/

/*

	initJsTree(){

			/*this.HTMLParent.css("padding", "10px");*/
/*			$('.'+this.MyClass).on("deleteNode", (e, data) => this.onDeleteJsTree(e,data));
			$('.'+this.MyClass).on("addType", (e, data) => this.onAddTypeJsTree(e,data));

			let JqElName = this.MyClass;

			$('.'+this.MyClass).jstree({
	          'core' : {
	          		'themes': {
			            'name': 'proton',
			            'responsive': true
			        },
	              	"check_callback" : true
	                      },

				"contextmenu": {   

			    "items": function($node) {

			      //  var tree = this.JsTreeContainer.jstree(true);
			      	console.log('jstree context menu before return');
			      	console.log($node);

			      	let create = {
					                "separator_before": false,
					                "separator_after": false,
					                "label": "Ajouter",
					                "action": function (obj) { 
					                    $node = $('.'+JqElName).jstree(true).create_node($node);
					                    $('.'+JqElName).jstree(true).edit($node);
					                }

									}


				    let rename = {
			                "separator_before": false,
			                "separator_after": false,
			                "label": "Renomer",
			                "action": function (obj) { 
			                   $('.'+JqElName).jstree(true).edit($node);
			                }
			            };



					let remove = {

			                "separator_before": false,
			                "separator_after": false,
			                "label": "Supprimer",
			                "action": function (obj) {

			                	$('.'+JqElName).trigger( "deleteNode", [{'node' : $node}] );
			                	}
			                };

			        let type = {
			                "separator_before": true,
			                "separator_after": false,
			                "label": "Type",
			                "submenu": { "Assign" : {
			               					"separator_before": true,
											"separator_after": false,
			                				"label": "Assigner",			             
							                "action": function (obj) { 
							                //   $('.'+this.MyClass).trigger( "addType", [{'node' : $node}] );
							                }
			                			},
			                			"AssignChilds" : {
			               					"separator_before": true,
											"separator_after": false,
			                				"label": "Types enfants",			             
							                "action": function (obj) { 
							                 //  $('.'+this.MyClass).trigger( "addChildType", [{'node' : $node}] );
							                }
			                			}
			                }


			            };

					let res = {};
					res.Create = create;
					if($node.id > 0){
						res.Rename = rename;
						res.Remove = remove;
						res.Type = type;
					}
			        
			        return res;


			        }
			    },


	              "types" : {
	                  "default" : {
	                    "icon" : "glyphicon glyphicon-tree-deciduous"
	                  },

	                  "car" : {
	                    "icon" : "fa fa-car"
	                  },
	                  "kitchen" : {
	                    "icon" : "glyphicon glyphicon-apple"
	                  },
	                  "home" : {
	                    "icon" : "glyphicon glyphicon-home"
	                  }
	            },
	              "plugins" : [ "dnd", "search" , "types", "contextmenu" ]

	         });

			$('.'+this.MyClass).jstree(true).hide_dots();

	}*/

/*//LOAD DATAS
	loadData(ParentNode = false){

		this.Parent = false;

		if(ParentNode != false){

			this.Parent = ParentNode;
		}

		let dataList = this.collection.getList(ParentNode.id);
		
			for (let k in dataList){

				if (dataList[k].parent == '#') dataList[k].parent = 0;

			}

		let RootName = "Mon Univers";

		if(ParentNode != false) RootName = ParentNode.text;

		let MyUnivers = {'id': 0, 'parent': "#", 'text': RootName, type: ""};
		dataList.unshift(MyUnivers);

        $('.'+this.MyClass).jstree(true).settings.core.data = dataList;
        $('.'+this.MyClass).jstree(true).refresh();
	}*/
//LOAD DATAS - END


//SEARCH
/*    getSearchElements(){
		console.log('in getSearchElements');
		let res = {};
		res.element = $('.'+this.MyClass).jstree(true);
		res.methode = 'search';
		res.me = this.MyClass;

		return res;

	}
*/


//BREADCRUMB

/*	getObjPathToNode(){

		let bcArray = [];

		let node = $('.'+this.MyClass).jstree(true).get_node($('.'+this.MyClass).jstree(true).get_selected()[0]);

		bcArray.push(node);


		for (let k in node.parents){

     	 	let parentNode = $('.'+this.MyClass).jstree(true).get_node(node.parents[k]);

			if(parentNode.text !== undefined){

			bcArray.unshift(parentNode);
					

			}

        }

        return bcArray;

	}
*/

/*
	clearSearch(){
		$('.'+this.MyClass).jstree(true).clear_search();
	}


	openNode(node){

		$('.'+this.MyClass).jstree(true).clear_search();
		$('.'+this.MyClass).jstree(true).close_all();
		$('.'+this.MyClass).jstree(true)._open_to(node);
		$('.'+this.MyClass).jstree(true).open_node(node);


/*		if(this.BreadEventCallBack != false){
			let ev = new CustomEvent(this.BreadEventCallBack, {'detail' : node});
        	window.dispatchEvent(ev);
		}*/


	//}



/*

	hide(){
		this.deselectAll();
		this.closeAll();
	}

	show(){

	}



	deselectAll(){

		$('.'+this.MyClass).jstree(true).deselect_all();

	}


	closeAll(){


		$('.'+this.MyClass).jstree(true).close_all();


	}*/

/*

////LISTENER -> PARENT
	initCallBackEvents(){

		let parent = this.HTMLParent;
		let Me = this.MyClass;

		$('.'+this.MyClass).on("select_node.jstree", function(e,data){

			let ev = new CustomEvent('callBack', {'detail' : {'data' : data, 'Event' : e,'element' : Me}});
            parent.dispatchEvent(ev);

		});


	}*/


/*	initEventsBreadSelect(myMethod){

		this.BreadEventCallBack = myMethod;

	}*/



/*
//MISE A JOUR COLLECTION
	onRenameJsTree(e,data){

       	let formData = new FormData();

        formData.append('node',data.node.id);
        formData.append('name',data.node.text);

        this.collection.rename(formData);

        
	}


	onDeleteJsTree(e,data){



	let JstreeHTML = this.jsTreeContainer;


		swal({
		  title: "t sur ???",
		  text: "Ctrl-Z n'est pas implémenté alors réfléchis bien !",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})

		.then((willDelete) => {
		  if (willDelete) {


		  	let formData = new FormData();

	        formData.append('node'  ,data.node.id);
	        formData.append('parent'  ,data.node.parent);

	        let result = this.collection.delete(formData);

	        if(result.error == 0){

	        	this.JsTreeContainer.jstree(true).delete_node(data.node);
	       
				this.getJstreeContainerElements();

	        }



		    swal("Poof! à la poubelle ;)", {
		      icon: "success",
		    });




		  } else {

		    swal("t'inquietes ta data est tjs la");
		    return false;
		  }
		});



       	

	}*/




/*

	onCreateJsTree(e,data){

		let formData = new FormData();

		if(this.Parent){

			formData.append('container'    ,this.Parent.id);
		
		}

        formData.append('node'    ,data.node.text);
        formData.append('parent'  ,data.parent);

		let result = this.collection.create(formData);

		$('.'+this.MyClass).jstree(true).set_id(data.node, result.data);


	}


	onDNDJstree(e,data,ref){

  		let formData = new FormData();

        formData.append('node'  ,ref.get_node(data.data.nodes[0]).id);
        formData.append('parent'  ,ref.get_node(data.data.nodes[0]).parent);

        this.collection.move(formData);

	}
*/



}