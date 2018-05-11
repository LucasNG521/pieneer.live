const fs = require('fs');
const path = require('path');

class ImageActions {
    constructor() {

    }


    readImage(req, res) {
        const userId = (req.params.userid).toString().padStart(6, '0');
        const presentationId = (req.params.presentationid).toString().padStart(6, '0');


        const imageOptions = {
            root: path.join(__dirname,
                '/imageLibrary',
                `/user-${userId}`,
                `/presentation-${presentationId}`),
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        if (req.query.pages) {
            res.sendFile(`${userId}-${presentationId}-${req.query.pages}.png`, imageOptions, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    console.log('Image sent');
                }
            });

        }

    }
    writeImage(req, res) {
        const userId = (req.params.userid).toString().padStart(6, '0');
        const presentationId = (req.params.presentationid).toString().padStart(6, '0');
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
    removeImage() {

    }
    editImage() {

    }

}

module.exports = ImageActions;