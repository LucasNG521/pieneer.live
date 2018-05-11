const fs = require('fs');
const path = require('path');

// Sync version is not working
// Converting to promise later

class FolderActions {
    constructor() {
        this.rootPath = path.join(__dirname, '/imageLibrary');
        this.sixPad = this.sixPad.bind(this);
    }

    sixPad(num) {
        return (num.toString()).padStart(6, '0');
    }

    mkUserDir(userId) {
        fs.mkdirSync(path.join(this.rootPath, `/user-${this.sixPad(userId)}`));
    }

    readUserDir(userId) {
        fs.readdir(path.join(this.rootPath, `/user-${this.sixPad(userId)}`), 'utf8', (err, nameArray) => {
            if (err) {
                throw new Error(err)
            } else {
                console.log(nameArray);
            }
        })
    }

    mkPresentationDir(userId, presentationId) {
        fs.mkdir(path.join(this.rootPath,
            `/user-${this.sixPad(userId)}`,
            `presentation-${this.sixPad(presentationId)}`), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("ok");
            }
        })
    }
    readPresentationDir(userId, presentationId) {
        fs.readdir(path.join(this.rootPath,
            `/user-${this.sixPad(userId)}`,
            `presentation-${this.sixPad(presentationId)}`), (err, nameString) => {
            if (err) {
                throw new Error(err);
            } else {
                console.log(nameString);
            }
        });
    }

}

module.exports = FolderActions;

const testFoler = new FolderActions();
testFoler.readPresentationDir(1, 1);