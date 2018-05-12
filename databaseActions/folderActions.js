const fs = require('fs');
const path = require('path');
const StringManipulation = require('../tools/stringManipulation');
const stringManipulation = new StringManipulation();


class FolderActions {
    constructor() {
        this.rootPath = path.join(__dirname, '/imageLibrary');
    }

    mkUserDir(req, res) {
        const userId = req.params.userid;
        fs.mkdirSync(path.join(this.rootPath, `/user-${stringManipulation.sixPad(userId)}`));
    }

    readUserDir(req, res) {
        const userId = req.params.userid;
        fs.readdir(path.join(this.rootPath, `/user-${stringManipulation.sixPad(userId)}`), 'utf8', (err, nameArray) => {
            if (err) {
                throw new Error(err)
            } else {
                console.log(nameArray);
            }
        })
    }

    // Remove entire User Directory when deleting user

    mkPresentationDir(req, res) {
        const userId = req.params.userid;
        const presentationId = req.params.presentationid;

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
    readPresentationDir(req, res) {

        const userId = req.params.userid;
        const presentationId = req.params.presentationid;
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

    // Remove presentationdir when the presentation is removed entirly
    removePresentationDir(req, res) {
        const userId = req.params.userid;
        const presentationId = req.params.presentationid;
        fs.rmdir(path.join(this.rootPath,
            `/user-${this.sixPad(userId)}`,
            `presentation-${this.sixPad(presentationId)}`), (err) => {
            if (err) {
                throw new Error(err)
            } else {
                console.log("Successfully removed folder")
            }
        });
    }

}

module.exports = FolderActions;