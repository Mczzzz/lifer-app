import User from '../../collections/UserCollection.js';
import Notes from '../../collections/NotesCollection.js';
import Unity from '../../collections/UnityCollection.js';
import Tap from '../../collections/TapCollection.js';

const classes = {
    User,
    Notes,
    Unity,
    Tap
};

class LoaderCollection  {
    constructor (className) {
        return new classes[className]();
    }
}

export default LoaderCollection;
