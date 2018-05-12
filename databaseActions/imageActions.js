const fs = require('fs');
const path = require('path');
const StringManipulation = require('../tools/stringManipulation');
const stringManipulation = new StringManipulation();


class ImageActions {

    readImage(req, res) {
        const userId = stringManipulation.sixPad(req.params.userid);
        const presentationId = stringManipulation.sixPad(req.params.presentationid);


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
        const userId = stringManipulation.sixPad(req.params.userid);
        const presentationId = stringManipulation.sixPad(req.params.presentationid);
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
        const userId = stringManipulation.sixPad(req.params.userid);
        const presentationId = stringManipulation.sixPad(req.params.presentationid);
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