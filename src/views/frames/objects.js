import superViews from "../common/superViews.js";

import Header from './objects/header.js';
import Main   from './objects/main.js'; 
import Footer from './objects/footer.js';


export default class Objects extends superViews{


  constructor(MyClass,path){

    super(MyClass,path);
    
    this.init();

	}


  init(){

    this.setStyle("display" , "flex");
    this.setStyle("flexDirection" , "column");
    this.setStyle("height" , "100vh");

    this.initChilds();

  }

  initChilds(){

   this.Header = new Header("Header",this.path);

   this.Main = new Main("Main",this.path);

   this.Footer = new Footer("Footer",this.path);
    
  }




/*  breadcrumb(){

    this.ObjBreadcrumb = new Breadcrumb();

  }


  mainTopUp(){

    //divParent,Collection,class
     this.jsTreeParent = new jsTreeContainer('topUp','Container','JsTreeContainer');
     this.jsTreeParent.loadData();
    
  }

  mainTopBottom(){

    //divParent,Collection,class
    this.jsTreeChild = new jsTreeContainer('topBottom','ObjectTree','JsTreeObjects');
    this.jsTreeChild.hide();
    
  }


  mainBottomTools(){


     this.mainBottomTools = new Tools();

    
  }


 mainBottomManager(field){


     this.mainBottomMyManager = new Manager(field);

    
  }





  elementAnimation(){

    //active search on parent tree
    this.jsTreeParent.linkSearch('toolsInput');

    //ask Parent tree to be informed on select
    let EvParSel = 'ObjectJsTreeParentSelect';
    window.addEventListener(EvParSel, (data) => this[EvParSel](data));
    this.jsTreeParent.initEventsElementSelect(EvParSel);

    //ask Parent tree to be informed on select
    let EvBreadParSel = 'ObjectBreadParentSelect';
    window.addEventListener(EvBreadParSel, (data) => this[EvBreadParSel](data));
    this.jsTreeParent.initEventsBreadSelect(EvBreadParSel);

    //ask Child tree to be informed on select
    let EvChildSel = 'ObjectJsTreeChildSelect';
    window.addEventListener(EvChildSel, (data) => this[EvChildSel](data));
    this.jsTreeChild.initEventsElementSelect(EvChildSel);



  }


  ObjectJsTreeParentSelect(data){
    console.log('ParentSelect');
      this.ParentId = data.detail.node.id;
      this.jsTreeChild.unlinkSearch();
      this.jsTreeChild.loadData(data.detail.node);
      
      this.jsTreeParent.getHTMLParent()[0].style.flex = "1 1 0%";
      this.jsTreeChild.getHTMLParent()[0].style.flex = "";
      this.jsTreeChild.show();
      
      this.jsTreeParent.clearSearch();
      this.in = "Container";

  }

  ObjectBreadParentSelect(data){
      this.ParentId = "";
      this.ObjBreadcrumb.destroyAll();
      
      this.jsTreeParent.show();
      this.jsTreeParent.getHTMLParent()[0].style.flex = "1 1 0%";
      this.jsTreeChild.getHTMLParent()[0].style.flex = "0 0 0%";
      this.jsTreeChild.hide();
      this.mainBottomTools.removeInfos();
      this.mainBottomTools.clearSearch();
      this.jsTreeParent.linkSearch('toolsInput');
      this.in = "Container";
  }




  ObjectJsTreeChildSelect(data){

    console.log('ChildSelect');
    console.log(data);
    console.log(this.in);

      if(this.in == "Container"){

        //BREADCRUMB
            let listEl = this.jsTreeParent.getObjPathToNode();     
            this.ObjBreadcrumb.init("bcContainer", listEl ,'ObjectBreadParentSelect',true);
        ////////////

//this.jsTreeParent.breadcrumbize('breadcrumb');
        this.jsTreeParent.getHTMLParent()[0].style.flex = "0 0 0%";

        this.jsTreeParent.hide();
        this.jsTreeChild.linkSearch('toolsInput');
        this.jsTreeChild.getHTMLParent()[0].style.flex = "1 1 0%";

        this.mainBottomTools.initInfosObjects();
        this.mainBottomManager("manage");
      }


      this.in = "Child";
      this.mainBottomTools.clearSearch();
      this.mainBottomMyManager.loadList(this.ParentId,data.detail.node.id);

      //on lance le manager

      

  }

























  toolbarHTML(){

    this.ObjectToolBar = new toolBar(this.TheObjectInfosCollect,this.TheObjectInfosResourcesTypeCollect);
    this.ObjectToolBar.hide();

  }



  linkVakataDomEvent(){

    $(document).on('dnd_stop.vakata', (e, data) => this.vakataAction(e,data));

  }

  
  
  vakataAction(e, data){

        //Pour savoir quel jstree a lancée l'event
        let MyFrag = $(data.data.origin.element[0]);
        let ref = $('#'+MyFrag.filter("div").attr('id')).jstree(true);

        let TheJstree = "";

        if(MyFrag.filter("div").attr('id') == this.JsTreeContainer){

          console.log('on passe bien la');
          console.log(this.JstreeContainerObj);

          TheJstree = this.JstreeContainerObj;
        
        }else if (MyFrag.filter("div").attr('id') == this.JsTreeObjects){
        

          TheJstree = this.JstreeObjectsObj;

        }



       TheJstree.onDNDJstree(e,data,ref); 

       

    }
*/
 


  







}


