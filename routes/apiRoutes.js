const config = require('../knexfile').development;
const knex = require('knex')(config);


class ApiRouter {
    constructor() {}

    router() {
        const router = require("express").Router();

        router.get("/", (req, res) => {
            res.send('hi');
        });

        // User operations
        router.get("/users/:userid", (req, res) => {
            const user = knex('presenter').select().where('id', req.params.userid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.post("/users/:userid", (req, res) => {
            const user = knex('presenter').update().where('id', req.params.userid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.delete("/users/:userid", (req, res) => {
            const user = knex('presenter').where('id', req.params.userid).delete()
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
            const user = knex('presentation').select().where('id', req.params.presentationid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.post("/presentations/:presentationid", (req, res) => {
            const user = knex('presentation').update().where('id', req.params.presentationid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.delete("/presentations/:presentationid", (req, res) => {
            const user = knex('presenter').where('id', req.params.presentationid).delete()
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
            res.send('Retrive');
        });
        router.post("/slides/:slideid", (req, res) => {
            res.send('Edit');
        });
        router.delete("/slides/:slideid", (req, res) => {
            res.send('Delete');
        });

        // Polls operations
        router.get("/polls/:pollid", (req, res) => {
            const user = knex('polls').select().where('id', req.params.pollid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.post("/polls/:pollid", (req, res) => {
            const user = knex('polls').update().where('id', req.params.pollid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });
        router.delete("/polls/:pollid", (req, res) => {
            const user = knex('polls').where('id', req.params.pollid).delete()
                .then(() => {
                    res.status(200).end()
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        });

        return router;
    }
}

module.exports = ApiRouter;