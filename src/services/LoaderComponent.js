import Text       from '../views/common/ui/card/elements/text.js';
import Image      from '../views/common/ui/card/elements/image.js';
import Button     from '../views/common/ui/card/elements/button.js';
import TextButton from '../views/common/ui/card/elements/textButton.js';
import Input      from '../views/common/ui/card/elements/input.js';
import Select     from '../views/common/ui/card/elements/select.js';
import Thumb      from '../views/common/ui/card/elements/thumb.js';

const classes = {

      Text
    , Image
    , Button
    , TextButton
    , Input
    , Select
    , Thumb
    
};

class LoaderComponent  {
    constructor (className,MyClass,path,prepend = false,callback=false) {
        return new classes[className](MyClass,path,prepend,callback);
    }
}

export default LoaderComponent;
