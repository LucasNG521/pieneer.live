class ApiRouter {
    constructor(imageActions, knex) {
        this.imageActions = imageActions;
        this.knex = knex;
    }

    router() {
        const router = require("express").Router();
        router.get("/", (req, res) => {
            // Insert potential how-to use API page
            res.send('hi');
        });

        // User operations
        router.get("/users/:userid", (req, res) => {
            const user = this.knex('presenter').select().where('id', req.params.userid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.post("/users/:userid", (req, res) => {
            const user = this.knex('presenter').insert().where('id', req.params.userid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.put("/users/:userid", (req, res) => {
            const user = this.knex('presenter').update().where('id', req.params.userid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.delete("/users/:userid", (req, res) => {
            const user = this.knex('presenter').where('id', req.params.userid).delete()
                .then(() => {
                    console.log('deleted');
                    res.status(200).end()
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });

        // Presentation operations
        router.get("/presentations/:presentationid", (req, res) => {
            const presentation = this.knex('presentation').select().where('id', req.params.presentationid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.post("/presentations/:presentationid", (req, res) => {
            const presentation = this.knex('presentation').insert().where('id', req.params.presentationid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.put("/presentations/:presentationid", (req, res) => {
            const presentation = this.knex('presentation').update().where('id', req.params.presentationid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.delete("/presentations/:presentationid", (req, res) => {
            const presentation = this.knex('presenter').where('id', req.params.presentationid).delete()
                .then(() => {
                    console.log('deleted');
                    res.status(200).end()
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });

        // Slides operation
        router.get("/slides/:slideid", (req, res) => {
            const slide = this.knex('pages').select().where('id', req.params.slideid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.post("/slides/:slideid", (req, res) => {
            const slide = this.knex('pages').insert().where('id', req.params.slideid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.put("/slides/:slideid", (req, res) => {
            const slide = this.knex('pages').update().where('id', req.params.slideid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.delete("/slides/:slideid", (req, res) => {
            const slide = this.knex('pages').where('id', req.params.slideid).delete()
                .then(() => {
                    console.log('deleted');
                    res.status(200).end()
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });

        // Polls operations
        router.get("/polls/:pollid", (req, res) => {
            const poll = this.knex('polls').select().where('id', req.params.pollid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.post("/polls/:pollid", (req, res) => {
            const poll = this.knex('polls').insert().where('id', req.params.pollid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.put("/polls/:pollid", (req, res) => {
            const poll = this.knex('polls').update().where('id', req.params.pollid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.delete("/polls/:pollid", (req, res) => {
            const poll = this.knex('polls').where('id', req.params.pollid).delete()
                .then(() => {
                    res.status(200).end()
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });




        // http://www.ighsg/api/images/123/242/?pages=12
        /* This section is to gain access to the image library*/
        router.get('/images/:userid/:presentationid', this.imageActions.readImage);
        router.post('/images/');
        router.put('/images/');
        router.delete('/images/');



        return router;
    }
}

module.exports = ApiRouter;