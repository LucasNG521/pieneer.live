const fs = require('fs');
const path = require('path');
const StringManipulation = require('../tools/stringManipulation');


class ImageActions {

    readImage(userId, presentationId) {
        const paddedUserId = StringManipulation.sixPad(userId);
        const paddedPresentationId = StringManipulation.sixPad(presentationId);


        const imageOptions = {
            root: path.join(__dirname,
                '/imageLibrary',
                `/user-${paddedUserId}`,
                `/presentation-${paddedPresentationId}`),
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        return {
            paddedUserId,
            paddedPresentationId,
            imageOptions
        }

    }
    writeImage(req, res) {
        const userId = StringManipulation.sixPad(req.params.userid);
        const presentationId = StringManipulation.sixPad(req.params.presentationid);
        const fileType = req.files.file.name.split('.').pop();


        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        } else {
            req.files.file.mv(path.join(__dirname,
                '/imageLibrary',
                `/user-${userId}`,
                `/presentation-${presentationId}`,
                `/${userId}-${presentationId}-${req.query.pages}.${fileType}`), (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
            })
        }



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