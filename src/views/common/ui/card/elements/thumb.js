import superViews from "../../../superViews.js";
//import LoaderDatas      from '../../../../../services/LoaderDatas.js';
import FileManager      from '../../../../../services/FileManager.js';

export default class Thumb extends superViews{ 
     

     constructor( MyClass,path,prepend = false,callback = false){

          super( MyClass , path);



          this.init();

     }


     init(){


          //this.setStyle("margin" , "10px");

          this.setStyle("border" , "none");
          this.setStyle("outline" , "none");
          this.setStyle("background" , "transparent");

          this.img = document.createElement("img");
          this.container.append(this.img);


     }


     setData(data){

          //si elle exite déja on remplace l'image

          console.log("IN SET DATA DU THHHHHUMB !!!!");
          console.log(data);


          let img =  this.img;
 
          if(!data.capture){

//TODO: A REFAIRE O PROPRE QUAND MEME
               if(data.data){
                    img.src = data.data.pict +  "/" + this.parent.offsetWidth;
               }else{

                     img.src = data;

               }
               

          }else{

               let RatioPhoto = data.data.ObjImg.naturalWidth / data.data.ObjImg.naturalHeight;

               img.src = data.data.pict;
               img.style.height  = "50px";
               img.height = img.offsetWidth  / RatioPhoto;


               if(data.data.orientation.rotate == 90){

                    let ImgHeight = img.offsetWidth;
                    let ImgWidth = img.offsetWidth * RatioPhoto;

                    let decalY = ((ImgWidth - img.offsetWidth) / 2);
//                    console.log(ImgWidth);
//                    console.log(img.offsetWidth);
                    let decalX = 0;

                    img.style.width = "";
                    img.width = ImgWidth;
                    img.height = ImgHeight;

                    img.style.transform = 'rotate(' + data.data.orientation.rotate + 'deg)';//+' translate('+decalY+'px, 0px)';

                    this.container.style.minHeight = ImgWidth+"px";

               }else{

                    this.container.style.minHeight = img.height+"px";
               }



          }
          
                    //pas le bon endroit mais toujours mieux que rien 
          //screen.orientation.lock("portrait-primary");

     }



     setDataByName(name,item_id){
          console.log("in SET DATA BY NAMMMEEEEEEE  !!!");

          let Fm = new FileManager();
          Fm.setElement(this);
          Fm.showFile(name);


     }




}

