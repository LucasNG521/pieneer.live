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
                .editUser(req.params.loginid, req.body.username, req.body.password, req.body['social_login'])
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


        // FIXME: Haven't finish changing the code
        // Slides operation
        router.get("/slides/:slideid", (req, res) => {
            this.databaseActions
                .getSlides(req.params.slideid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.post("/slides", (req, res) => {
            this.databaseActions
                .addSlides(req.body.presentation_id, req.body.page_type, req.body.order)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.put("/slides/:slideid", (req, res) => {
            this.databaseActions
                .editSlides(req.params.slideid, req.body.presentation_id, req.body.page_type, req.body.order)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.delete("/slides/:slideid", (req, res) => {
            this.databaseActions
                .removeSlides(req.params.slideid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        // Polls operations
        router.get("/polls/:pollid", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.post("/polls", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.put("/polls/:pollid", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.delete("/polls/:pollid", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        //result
        router.get("/result/:resultid", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.post("/result", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.put("/result/:resultid", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.delete("/result/:resultid", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        //result
        router.get("/q_a/:q_aid", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.post("/q_a", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.put("/q_a/:q_aid", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.delete("/q_a/:q_aid", (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        // http://www.ighsg/api/images/123/242/?pages=12
        /* This section is to gain access to the image library*/
        router.get('/images/:userid/:presentationid', (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        // router.post('/images/:userid/:presentationid', this.imageActions.writeImage);
        // router.put('/images/:userid/:presentationid');
        router.delete('/images/:userid/:presentationid', (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });


        // Folder manipulation: User level
        router.get('/folders/:userid', (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.post('/folders/:userid', (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.delete('/folders/:userid/', (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        // Folder manipulation: Presentation Level
        router.get('/folders/:userid/:presentationid', (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.post('/folders/:userid/:presentationid', (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.delete('/folders/:userid/:presentationid', (req, res) => {
            this.databaseActions
                .removePresentation(req.params.presentationid)
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        return router;
    }
}

module.exports = ApiRouter;