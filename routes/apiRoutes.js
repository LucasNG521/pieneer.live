const config = require('../knexfile').development;
const knex = require('knex')(config);


class ApiRouter {
    constructor() { }

    router() {
        const router = require("express").Router();

        router.get("/", (req, res) => {
            res.send('hi');
        });

        // User operations
        router.get("/users/:userid", (req, res) => {
            const user = knex('presenter').select().where('id', req.params.userid);
            user.then((arr) => {
                res.json(arr);
            })
        });
        router.post("/users/:userid", (req, res) => {
            res.send('Edit');
        });
        router.delete("/users/:userid", (req, res) => {
            res.send('Delete');
        });

        // Presentation operations
        router.get("/presentations/:presentationid", (req, res) => {
            res.send('Retrive');
        });
        router.post("/presentations/:presentationid", (req, res) => {
            res.send('Edit');
        });
        router.delete("/presentations/:presentationid", (req, res) => {
            res.send('Delete');
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
            res.send('Retrive');
        });
        router.post("/polls/:pollid", (req, res) => {
            res.send('Edit');
        });
        router.delete("/polls/:pollid", (req, res) => {
            res.send('Delete');
        });

        return router;
    }
}

module.exports = ApiRouter;