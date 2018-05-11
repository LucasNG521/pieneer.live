// Post = new entity
// Put  = edit entity
class ApiRouter {
    constructor(imageActions, folderActions, knex) {
        this.folderActions = folderActions;
        this.imageActions = imageActions;
        this.knex = knex;
    }

    router() {
        const router = require("express").Router();
        router.get("/", (req, res) => {
            // Insert potential how-to use API page
            res.send('hi');
        });

        // Login ( create a new user to req data to database )operations
        router.get("/login/:loginid", (req, res) => {
            const user = this.knex('login')
                .select()
                .where('id', req.params.loginid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                });
        });

        router.post("/login", (req, res) => {
            const user = this.knex('login')
                .insert({
                    username: req.body.username,
                    password: req.body.password,
                    social_login: req.body.social_login
                })
                .then(() => {
                    // res.send(({success:true}));
                    console.log('added');
                    // Building the user folder for the user in database



                    res.json(req.body);
                })
                .catch(err => {
                    res.status(500).send(err)
                });
        });

        router.put("/login/:loginid", (req, res) => {
            const user = this.knex('login')
                .update({
                    username: req.body.username,
                    password: req.body.password,
                    social_login: req.body.social_login
                })
                .where('id', req.params.loginid)
                .then(() => {
                    console.log('edited');
                    res.json(req.body);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.delete("/users/:userid", (req, res) => {
            const user = this.knex('presenter')
                .where('id', req.params.userid)
                .delete()
                .then(() => {
                    console.log('deleted');
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        // User operations
        router.get("/users/:userid", (req, res) => {
            const user = this.knex('presenter')
                .select()
                .where('id', req.params.userid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err)
                });
        });

        router.post("/users", (req, res) => {
            const user = this.knex('presenter')
                .insert({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone: req.body.phone,
                    company: req.body.company,
                })
                .then(() => {
                    // res.send(({success:true}));
                    console.log('added');
                    // Building the user folder for the user in database



                    res.json(req.body);
                })
                .catch(err => {
                    res.status(500).send(err)
                });
        });

        router.put("/users/:userid", (req, res) => {
            const user = this.knex('presenter')
                .update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone: req.body.phone,
                    company: req.body.company,
                })
                .where('id', req.params.userid)
                .then(() => {
                    console.log('edited');
                    res.json(req.body);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.delete("/users/:userid", (req, res) => {
            const user = this.knex('presenter')
                .where('id', req.params.userid)
                .delete()
                .then(() => {
                    console.log('deleted');
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        // Presentation operations
        router.get("/presentations/:presentationid", (req, res) => {
            const presentation = this.knex('presentation')
                .select()
                .where('id', req.params.presentationid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.post("/presentations", (req, res) => {
            const presentation = this.knex('presentation')
                .insert({
                    presenter_id: req.body.presenter_id,
                    title: req.body.title,
                    location: req.body.location,
                    address: req.body.address
                })
                .then((arr) => {
                    console.log(`added`);
                    // res.send(({success:true}));
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.put("/presentations/:presentationid", (req, res) => {
            const presentation = this.knex('presentation')
                .update({
                    // vvv presenter_id : req passport.user.id
                    presenter_id: req.body.presenter_id,
                    title: req.body.title,
                    location: req.body.location,
                    address: req.body.address
                })
                .where('id', req.params.presentationid)
                .then((arr) => {
                    console.log(`edited`);
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.delete("/presentations/:presentationid", (req, res) => {
            const presentation = this.knex('presentation')
                .where('id', req.params.presentationid)
                .delete()
                .then(() => {
                    console.log('deleted');
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        // Slides operation
        router.get("/slides/:slideid", (req, res) => {
            const slide = this.knex('pages')
                .select()
                .where('id', req.params.slideid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.post("/slides", (req, res) => {
            const slide = this.knex('pages')
                .insert({
                    presentation_id: req.body.presentation_id,
                    page_type: req.body.page_type,
                    order: req.body.order
                })
                .then((arr) => {
                    console.log(`added`);
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.put("/slides/:slideid", (req, res) => {
            const slide = this.knex('pages')
                .update({
                    presentation_id: req.body.presentation_id,
                    page_type: req.body.page_type,
                    order: req.body.order
                })
                .where('id', req.params.slideid)
                .then((arr) => {
                    console.log(`edited`);
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
        router.delete("/slides/:slideid", (req, res) => {
            const slide = this.knex('pages').where('id', req.params.slideid).delete()
                .then(() => {
                    console.log('deleted');
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                })
        });

        // Polls operations
        router.get("/polls/:pollid", (req, res) => {
            const poll = this.knex('polls')
                .select()
                .where('id', req.params.pollid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.post("/polls", (req, res) => {
            const poll = this.knex('polls')
                .insert({
                    pages_id: req.body.pages_id,
                    question: req.body.question,
                    answer_content: JSON.stringify(req.body[answer_content]),
                    style: JSON.stringify(req.body[style])
                })
                .then((arr) => {
                    console.log(`added`);
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.put("/polls/:pollid", (req, res) => {
            const poll = this.knex('polls')
                .update({
                    pages_id: req.body.pages_id,
                    question: req.body.question,
                    answer_content: JSON.stringify(req.body[answer_content]),
                    style: JSON.stringify(req.body[style])
                })
                .where('id', req.params.pollid)
                .then((arr) => {
                    console.log(`edited`);
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.delete("/polls/:pollid", (req, res) => {
            const poll = this.knex('polls')
                .where('id', req.params.pollid)
                .delete()
                .then(() => {
                    console.log(`deleted`);
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        //result
        router.get("/result/:resultid", (req, res) => {
            const poll = this.knex('result')
                .select()
                .where('id', req.params.resultid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.post("/result", (req, res) => {
            const poll = this.knex('result')
                .insert({
                    polls_id: req.body.polls_id,
                    answer: req.body.answer,
                    visiter_name: req.body.visiter_name
                })
                .then((arr) => {
                    console.log(`added`);
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.put("/result/:resultid", (req, res) => {
            const poll = this.knex('result')
                .update({
                    polls_id: req.body.polls_id,
                    answer: req.body.answer,
                    visiter_name: req.body.visiter_name
                })
                .where('id', req.params.resultid)
                .then((arr) => {
                    console.log(`edited`);
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.delete("/result/:resultid", (req, res) => {
            const poll = this.knex('result')
                .where('id', req.params.resultid)
                .delete()
                .then(() => {
                    console.log(`deleted`);
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        //result
        router.get("/q_a/:q_aid", (req, res) => {
            const poll = this.knex('q_a')
                .select()
                .where('id', req.params.q_aid)
                .then((arr) => {
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.post("/q_a", (req, res) => {
            const poll = this.knex('q_a')
                .insert({
                    presentation_id: req.body.presentation_id,
                    question: req.body.question,
                    visiter_name: req.body.visiter_name,
                    likes: req.body.likes
                })
                .then((arr) => {
                    console.log(`added`);
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.put("/q_a/:q_aid", (req, res) => {
            const poll = this.knex('q_a')
                .update({
                    presentation_id: req.body.presentation_id,
                    question: req.body.question,
                    visiter_name: req.body.visiter_name,
                    likes: req.body.likes
                })
                .where('id', req.params.q_aid)
                .then((arr) => {
                    console.log(`edited`);
                    res.json(arr);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        router.delete("/q_a/:q_aid", (req, res) => {
            const poll = this.knex('q_a')
                .where('id', req.params.q_aid)
                .delete()
                .then(() => {
                    console.log(`deleted`);
                    res.status(200).end();
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });

        // http://www.ighsg/api/images/123/242/?pages=12
        /* This section is to gain access to the image library*/
        router.get('/images/:userid/:presentationid', this.imageActions.readImage);
        // router.post('/images/:userid/:presentationid', this.imageActions.writeImage);
        router.put('/images/:userid/:presentationid');
        router.delete('/images/:userid/:presentationid');



        return router;
    }
}

module.exports = ApiRouter;