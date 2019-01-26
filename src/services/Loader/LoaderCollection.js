/*import Container from '../collections/ContainerCollection.js';
import ObjectInfos from '../collections/ObjectInfosCollection.js';
import ObjectInfosResources from '../collections/ObjectInfosResourcesCollection.js';
import ObjectTree from '../collections/ObjectTreeCollection.js';*/

import User from '../collections/UserCollection.js';
import Notes from '../collections/NotesCollection.js';
import Unity from '../collections/UnityCollection.js';
import Crypto from '../collections/CryptoCollection.js';


const classes = {
    User,
    Notes,
    Unity,
    Crypto
};

class LoaderCollection  {
    constructor (className) {
        return new classes[className]();
    }
}

export default LoaderCollection;
