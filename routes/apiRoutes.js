// Post = new entity
// Put  = edit entity
class ApiRouter {
    constructor(imageActions, folderActions, databaseActions) {
        this.folderActions = folderActions;
        this.imageActions = imageActions;
        this.databaseActions = databaseActions;

    }

    router() {
        const router = require("express").Router();

        router.get("/", (req, res) => {
            res.redirect('/html_mock-up/api/index.html');
        });

        router.get("/login/:loginid", (req, res) => {
            this.databaseActions
                .getUser(req.params.loginid)
                .then((result) => {
                    res.json(result);
                })
                .catch(err => {
                    res.status(500).send(err);
                })

        });
        router.post("/login", (req, res) => {
            this.databaseActions
                .createUser(req.body.username, req.body.password, req.body['social_login'])
                .then((result) => {
                    res.json(result);
                })
                .catch(err => {
                    res.status(500).send(err);
                })

        });
        router.put("/login/:loginid", (req, res) => {
            this.databaseActions
                .editUser(res.params.loginid, req.body.username, req.body.password, req.body.social_login)
                .then((result) => {
                    res.json(result);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
        });
        router.delete("/login/:loginid", (req, res) => {
            this.databaseActions
                .removeUser(req.params.loginid)
                .then(() => {
                    console.log("user deleted");
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });


        // User operations
        router.get("/users/:userid", this.databaseActions.getUserInfo);
        router.post("/users", this.databaseActions.addUserInfo);
        router.put("/users/:userid", this.databaseActions.editUserInfo);
        router.delete("/users/:userid", this.databaseActions.removeUserInfo);


        // Presentation operations
        router.get("/presentations/:presentationid", (req, res) => {
            this.databaseActions
                .getPresentation(req.params.presentationid)
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.post("/presentations", (req, res) => {
            this.databaseActions
                .addPresentation(req.body.presenterid, req.body.title, req.body.location, req.body.address)
                .then(arr => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.put("/presentations/:presentationid", (req, res) => {
            this.databaseActions
                .editPresentation(req.params.presentationid, req.body.presenterid, req.body.title, req.body.location, req.body.address)
                .then(arr => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.delete("/presentations/:presentationid", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        // Slides operation
        router.get("/slides/:slideid", this.databaseActions.getSlides);
        router.post("/slides", this.databaseActions.addSlides);
        router.put("/slides/:slideid", this.databaseActions.editSlides);
        router.delete("/slides/:slideid", this.databaseActions.removeSlides);

        // Polls operations
        router.get("/polls/:pollid", this.databaseActions.getPolls);
        router.post("/polls", this.databaseActions.addPolls);
        router.put("/polls/:pollid", this.databaseActions.editPolls);
        router.delete("/polls/:pollid", this.databaseActions.removePolls);

        //result
        router.get("/result/:resultid", this.databaseActions.getPollResults);
        router.post("/result", this.databaseActions.addPollResults);
        router.put("/result/:resultid", this.databaseActions.editPollResults);
        router.delete("/result/:resultid", this.databaseActions.removePollResults);

        //result
        router.get("/q_a/:q_aid", this.databaseActions.getQandAResults);
        router.post("/q_a", this.databaseActions.addQandAResults);
        router.put("/q_a/:q_aid", this.databaseActions.editQandAResults);
        router.delete("/q_a/:q_aid", this.databaseActions.removeQandAResults);

        // http://www.ighsg/api/images/123/242/?pages=12
        /* This section is to gain access to the image library*/
        router.get('/images/:userid/:presentationid', this.imageActions.readImage);
        // router.post('/images/:userid/:presentationid', this.imageActions.writeImage);
        // router.put('/images/:userid/:presentationid');
        router.delete('/images/:userid/:presentationid', this.imageActions.removeImage);


        // Folder manipulation: User level
        router.get('/folders/:userid', this.folderActions.readUserDir);
        router.post('/folders/:userid', this.folderActions.mkUserDir);
        router.delete('/folders/:userid/', this.folderActions.removeUserDir);

        // Folder manipulation: Presentation Level
        router.get('/folders/:userid/:presentationid', this.folderActions.readPresentationDir);
        router.post('/folders/:userid/:presentationid', this.folderActions.mkPresentationDir);
        router.delete('/folders/:userid/:presentationid', this.folderActions.removePresentationDir);

        return router;
    }
}

module.exports = ApiRouter;