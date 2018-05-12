const config = require("../knexfile").development;

class DatabaseActions {
    constructor(knex) {
        this.knex = knex;
    }
    getUser(req, res) {
        const user = this.knex("login")
            .select()
            .where("id", req.params.loginid)
            .then(arr => {
                res.json(arr);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    createUser(req, res) {
        const user = this.knex("login")
            .insert({
                username: req.body.username,
                password: req.body.password,
                social_login: req.body.social_login
            })
            .then(() => {
                res.json(req.body);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    editUser(req, res) {
        const user = this.knex("login")
            .update({
                username: req.body.username,
                password: req.body.password,
                social_login: req.body.social_login
            })
            .where("id", req.params.loginid)
            .then(() => {
                console.log("edited");
                res.json(req.body);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    removeUser(req, res) {
        const user = this.knex("presenter")
            .where("id", req.params.userid)
            .delete()
            .then(() => {
                console.log("deleted");
                res.status(200).end();
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }

    getUserInfo(req, res) {
        const user = this.knex("presenter")
            .select()
            .where("id", req.params.userid)
            .then(arr => {
                res.json(arr);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    addUserInfo(req, res) {
        const user = this.knex("presenter")
            .insert({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                company: req.body.company
            })
            .then(() => {
                // res.send(({success:true}));
                console.log("added");
                // Building the user folder for the user in database

                res.json(req.body);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    editUserInfo(req, res) {
        const user = this.knex("presenter")
            .update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                company: req.body.company
            })
            .where("id", req.params.userid)
            .then(() => {
                console.log("edited");
                res.json(req.body);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    removeUserInfo(req, res) {
        const user = this.knex("presenter")
            .where("id", req.params.userid)
            .delete()
            .then(() => {
                console.log("deleted");
                res.status(200).end();
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }

    getPresentation(req, res) {
        const presentation = this.knex("presentation")
            .select()
            .where("id", req.params.presentationid)
            .then(arr => {
                res.json(arr);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    addPresentation(req, res) {
        const presentation = this.knex("presentation")
            .insert({
                presenter_id: req.body.presenter_id,
                title: req.body.title,
                location: req.body.location,
                address: req.body.address
            })
            .then(arr => {
                console.log(`added`);
                // res.send(({success:true}));
                res.json(arr);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    editPresentation(req, res) {
        const presentation = this.knex("presentation")
            .update({
                // vvv presenter_id : req passport.user.id
                presenter_id: req.body.presenter_id,
                title: req.body.title,
                location: req.body.location,
                address: req.body.address
            })
            .where("id", req.params.presentationid)
            .then(arr => {
                console.log(`edited`);
                res.json(arr);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
    removePresentation(req, res) {
        const presentation = this.knex("presentation")
            .where("id", req.params.presentationid)
            .delete()
            .then(() => {
                console.log("deleted");
                res.status(200).end();
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }

    getSlides(req, res) {
        const slide = this.knex('pages')
            .select()
            .where('id', req.params.slideid)
            .then((arr) => {
                res.json(arr);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    };
    addSlides(req, res) {
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
    };
    editSlides(req, res) {
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
    };
    removeSlides(req, res) {
        const slide = this.knex('pages').where('id', req.params.slideid).delete()
            .then(() => {
                console.log('deleted');
                res.status(200).end();
            })
            .catch(err => {
                res.status(500).send(err);
            })
    };

    getPolls(req, res) {
        const poll = this.knex('polls')
            .select()
            .where('id', req.params.pollid)
            .then((arr) => {
                res.json(arr);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    };
    addPolls(req, res) {
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
    };
    editPolls(req, res) {
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
    };
    removePolls(req, res) {
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
    };

    getPollResults(req, res) {
        const poll = this.knex('result')
            .select()
            .where('id', req.params.resultid)
            .then((arr) => {
                res.json(arr);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    };
    addPollResults(req, res) {
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
    };
    editPollResults(req, res) {
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
    };
    removePollResults(req, res) {
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
    };

    getQandAResults(req, res) {
        const poll = this.knex('q_a')
            .select()
            .where('id', req.params.q_aid)
            .then((arr) => {
                res.json(arr);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    };
    addQandAResults(req, res) {
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
    };
    editQandAResults(req, res) {
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
    };
    removeQandAResults(req, res) {
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
    };
}

// class LoginOperation extends DatabaseActions {
//     constructor() {
//         super();
//     }

// }

// class UserOperation extends DatabaseActions {
//     constructor() {
//         super();
//     }
// }

// class PresentationOperation extends DatabaseActions {
//     constructor() {
//         super();
//     }

// }

// class SlidesOperation extends DatabaseActions {
//     constructor() {
//         super();
//     }

// }

// class PollsOperation extends DatabaseActions {
//     constructor() {
//         super();
//     }

// }

// class PollResultsOperation extends DatabaseActions {
//     constructor() {
//         super();
//     }

// }

// class QandAOperation extends DatabaseActions {
//     constructor() {
//         super();
//     }

// }

// module.exports = {
//     DatabaseAction,
//     LoginOperation,
//     UserOperation,
//     PresentationOperation,
//     SlidesOperation,
//     PollResultsOperation,
//     PollsOperation,
//     QandAOperation
// };

module.exports = DatabaseActions;