const fs = require('fs');
const path = require('path');

class ImageActions {


    readImage(req, res) {
        const imageOptions = {
            root: path.join(__dirname,
                '/imageLibrary',
                `/user-${req.params.userid}`,
                `/presentation-${req.params.presentationid}`),
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
        if (req.query.pages) {
            res.sendFile(`${req.params.userid}-${req.params.presentationid}-${req.query.pages}.png`, imageOptions, function (err) {
                if (err) {
                    console.log(err);
                    res.status(400).end();
                } else {
                    console.log('Image sent');
                }
            });

        }

    }
    addImage(){
        
    }
    removeImage(){

    }
    editImage(){

    }
    
}

module.exports = ImageActions;