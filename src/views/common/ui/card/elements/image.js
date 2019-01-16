import superViews from "../../../superViews.js";

export default class Image extends superViews{ 
     

     constructor( MyClass,path,prepend = false,callback = false){

          super( MyClass , path);



          this.init();

     }


     init(){


          //this.setStyle("marginRight" , "10px");

          this.setStyle("border" , "none");
          this.setStyle("outline" , "none");
          this.setStyle("background" , "transparent");


     }


     setData(data){

          let img = document.createElement("img");
          this.container.append(img);
 
          
          if(!data.capture){

               img.src = data.data.pict +  "/" + this.parent.offsetWidth;

          }else{

               let RatioPhoto = data.data.ObjImg.naturalWidth / data.data.ObjImg.naturalHeight;

               img.src = data.data.pict;
               img.style.width  = "100%";
               //img.height = img.offsetWidth  / RatioPhoto;


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

                    img.style.transform = 'rotate(' + data.data.orientation.rotate + 'deg)'+' translate('+decalY+'px, 0px)';

                    this.container.style.minHeight = ImgWidth+"px";

               }else{

                    this.container.style.minHeight = img.height+"px";
               }



          }
          
                    //pas le bon endroit mais toujours mieux que rien 
         // screen.orientation.lock("portrait-primary");

     }





}

