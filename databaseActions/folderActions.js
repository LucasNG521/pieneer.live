const fs = require('fs');
const path = require('path');

class FolderActions {
    constructor() {
        this.rootPath = path.join(__dirname, '/imageLibrary');
        this.sixPad = (num) => {
            return (num.toString()).padStart(6, '0');
        };
    }

    // sixPad(num) {

    // }

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

// const testFoler = new FolderActions();
// testFoler.readPresentationDir(1, 1);