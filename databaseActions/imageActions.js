const fs = require('fs');
const path = require('path');
const StringManipulation = require('../tools/stringManipulation');


class ImageActions {

    readImage(userId, presentationId, md5Code, fileType) {
        const paddedUserId = StringManipulation.sixPad(userId);
        const paddedPresentationId = StringManipulation.sixPad(presentationId);

        const filePath = path.join(__dirname, '/imageLibrary', `/user-${paddedUserId}`, `/presentation-${paddedPresentationId}`, `/${paddedUserId}-${paddedPresentationId}-${md5Code}.${fileType}`);

        const image = new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, imageData) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(imageData);
                }
            });
        });
        return image;
    }
    writeImage(usId, presId, md5, fileType, buffer) {

        const userId = StringManipulation.sixPad(usId);
        const presentationId = StringManipulation.sixPad(presId);

        const writingPath = path.join(__dirname,
            '/imageLibrary',
            `/user-${userId}`,
            `/presentation-${presentationId}`,
            `/${userId}-${presentationId}-${md5}.${fileType}`)

        const file = new Promise((resolve, reject) => {
            console.log(writingPath);
            fs.writeFile(writingPath, buffer, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })

        })

        return file;

    }
    removeImage(req, res) {
        const userId = StringManipulation.sixPad(req.params.userid);
        const presentationId = StringManipulation.sixPad(req.params.presentationid);
        // remove file from the server with params 

        fs.unlink(path.join(__dirname, '/imageLibrary',
            `/user-${userId}`, `/presentation-${presentationId}`, `/${userId}-${presentationId}-${req.query.pages}.png`), (err) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                res.status(200).end();
            }
        })
    }
    editImage() {
        // Need object from FrontEnd to determine how to manipulate the sequence of the presentation
    }

}

module.exports = ImageActions;