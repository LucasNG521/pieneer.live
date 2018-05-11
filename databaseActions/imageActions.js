const fs = require('fs');
const path = require('path');

class ImageActions {
    constructor() {
        this.sixPad = this.sixPad.bind(this);
    }

    sixPad(num) {
        return (num.toString()).padStart(6, '0');
    }

    readImage(req, res) {
        const param = {
            userId: this.sixPad(req.params.userid),
            presentationId: this.sixPad(req.params.presentationid)

        }
        const imageOptions = {
            root: path.join(__dirname,
                '/imageLibrary',
                `/user-${param.userId}`,
                `/presentation-${param.presentationId}`),
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        if (req.query.pages) {
            res.sendFile(`${param.userId}-${param.presentationId}-${req.query.pages}.png`, imageOptions, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    console.log('Image sent');
                }
            });

        }

    }
    writeImage(req, res) {
        const param = {
            userId: this.sixPad(req.params.userid),
            presentationId: this.sixPad(req.params.presentationid),
            fileType: req.files.file.name.split('.').pop()
        }

        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        } else {
            req.files.file.mv(path.join(__dirname,
                '/imageLibrary',
                `/user-${param.userId}`,
                `/presentation-${param.presentationId}`,
                `/${param.userId}-${param.presentationId}-${req.query.pages}.${param.fileType}`), (err) => {
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