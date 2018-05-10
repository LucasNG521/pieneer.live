const fs = require('fs');
const path = require('path');

class ImageActions {
    readImage(req, res) {
        if (req.query.pages) {
            const img = fs
                .readFile(path.join(__dirname,
                        '/imageLibrary',
                        `/user-${req.params.userid}`,
                        `/presentation-${req.params.presentationid}`,
                        `/${req.params.userid}-${req.params.presentationid}-${req.query.pages}.jpg`),
                    (err, data) => {
                        if (err) {
                            throw new Error("WHAT THE FUCK IS THIS");
                        } else {
                            res.send(data);
                        }
                    });

        }

    }
}

module.exports = ImageActions;