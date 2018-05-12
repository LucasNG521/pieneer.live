const fs = require('fs');
const path = require('path');
const StringManipulation = require('../tools/stringManipulation');
const stringManipulation = new StringManipulation();


class FolderActions {
    constructor() {
        this.rootPath = path.join(__dirname, '/imageLibrary');
    }

    mkUserDir(userId) {
        fs.mkdirSync(path.join(this.rootPath, `/user-${stringManipulation.sixPad(userId)}`));
    }

    readUserDir(userId) {
        fs.readdir(path.join(this.rootPath, `/user-${stringManipulation.sixPad(userId)}`), 'utf8', (err, nameArray) => {
            if (err) {
                throw new Error(err)
            } else {
                console.log(nameArray);
            }
        })
    }

    mkPresentationDir(userId, presentationId) {
        fs.mkdir(path.join(this.rootPath,
            `/user-${stringManipulation.sixPad(userId)}`,
            `presentation-${stringManipulation.sixPad(presentationId)}`), (err) => {
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