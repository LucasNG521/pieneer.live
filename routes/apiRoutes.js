// Post = new entity
// Put  = edit entity

const StringManipulation = require('../tools/stringManipulation');
const path = require('path');

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

        // router.get("/login/:loginid", (req, res) => {
        //     this.databaseActions
        //         .getUser(req.params.loginid)
        //         .then((result) => {
        //             res.json(result);
        //         })
        //         .catch(err => {
        //             res.status(500).send(err);
        //         })

        // });
        // router.post("/login", (req, res) => {
        //     this.databaseActions
        //         .createUser(req.body.username, req.body.password, req.body['social_login'])
        //         .then((result) => {
        //             res.json(result);
        //         })
        //         .catch(err => {
        //             res.status(500).send(err);
        //         })

        // });
        // router.put("/login/:loginid", (req, res) => {
        //     this.databaseActions
        //         .editUser(req.params.loginid, req.body.username, req.body.password, req.body['social_login'])
        //         .then((result) => {
        //             res.json(result);
        //         })
        //         .catch(err => {
        //             res.status(500).send(err);
        //         })
        // });
        // router.delete("/login/:loginid", (req, res) => {
        //     this.databaseActions
        //         .removeUser(req.params.loginid)
        //         .then(() => {
        //             console.log("user deleted");
        //             res.status(200).end();
        //         })
        //         .catch(err => {
        //             res.status(500).send(err);
        //         });
        // });


        // User operations
        router.get("/users/:userid", (req, res) => {
            if (req.query.requesttype === 'login') {
                this.databaseActions.getUserLoginInfo(req.params.userid).then((arr) => {
                    res.json(arr);
                }).catch((err) => {
                    res.status(400).send(err);
                })
            } else if (req.query.requesttype === 'general') {
                this.databaseActions.getUserInfo(req.params.userid).then((arr) => {
                    res.json(arr);
                }).catch((err) => {
                    res.status(400).send(err);
                })
            } else {
                res.status(400).send("Please state which information you need");
            }
        });
        // TODO: Lucassss adding new user 
        router.post("/users", (req, res) => {});
        router.put("/users/:userid", (req, res) => {
            this.databaseActions.editUserInfo(req.params.userid, req.body['first_name'], req.body['last_name'], req.body.email, req.body.phone, req.body.company).then(() => {
                    res.json("Well done, you've successfully edited your user info");
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.delete("/users/:userid", (req, res) => {
            this.databaseActions.removeUser(req.params.userid).then(() => {
                res.json("We hate to see you go, bye :''\(\(\(\(");
            }).catch((err) => {
                res.status(500).send(err);
            })
        });


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
        // 
        router.get("/slides/:presentationId", (req, res) => {
            this.databaseActions
                .getAllSlides(req.params.presentationId)
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
        // TODO: Working on changing the methods
        router.get("/polls/:pollId", (req, res) => {
            this.databaseActions
                .getPolls(req.params.pollId)
                .then((arr) => {
                    res.json(arr);
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
        router.get('/images/:userId/:presentationId/:md5', (req, res) => {

            this.imageActions.readImage(req.params.userId, req.params.presentationId, req.params.md5, req.query.types)
                .then((imageData) => {
                    res.status(200).end(imageData);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });
        router.post('/images/:userid/:presentationid', (req, res) => {
            const fileType = req.files.file.name.split('.').pop();
            const md5Code = req.files.file.md5;
            const buffer = req.files.file.data;
            const userId = req.params.userid;
            const presentationId = req.params.presentationid;


            this.imageActions.writeImage(userId, presentationId, md5Code, fileType, buffer)
                .then(() => {
                    console.log(req.files);
                    res.send("ok");
                })
                .catch((err) => {
                    res.send(err);
                });

        });
        router.delete('/images/:userid/:presentationid/:md5', (req, res) => {
            this.imageActions.removeImage(req.params.userid, req.params.presentationid, req.params.md5, req.query.types)
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