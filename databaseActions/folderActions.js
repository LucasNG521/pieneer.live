const fs = require('fs');
const path = require('path');

// Sync version is not working
// Converting to promise later

class FolderActions {
    constructor() {
        this.rootPath = path.join(__dirname, '/imageLibrary');
    }

    mkUserDir(userid) {
        fs.mkdirSync(path.join(this.rootPath, `/user-${(userid.toString()).padStart(6,'0')}`))
    }
    readUserDir(userid) {
        fs.readdir(path.join(this.rootPath, `/user-${(userid.toString()).padStart(6,'0')}`), 'utf8', (err, nameArray) => {
            if (err) {
                throw new Error(err)
            } else {
                console.log(nameArray);
            }
        })
    }

    mkPresentationDir() {

    }
    readPresentationDir() {

    }
}

module.exports = FolderActions;