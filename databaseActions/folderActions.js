const fs = require('fs');
const path = require('path');

class FolderActions {
    constructor() {
        this.rootPath = path.join(__dirname, '/imageLibrary');
    }

    mkdir(userid) {
        fs.mkdir(path.join(this.rootPath, `user-${(userid.toString()).padStart(6,'0')}`), err => {
            throw new Error('Folder is not creating');
        })
    }
    readdir(userid) {
        fs.readdir(path.join(this.rootPath, `user-${(userid.toString()).padStart(6,'0')}`), err => {
            throw new Error("Couldn't find folder");
        })
    }
}

module.exports = FolderActions;