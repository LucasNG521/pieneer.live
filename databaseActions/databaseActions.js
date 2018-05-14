class DatabaseActions {
    constructor(knex) {
        this.knex = knex;
    }
    getUser(loginId) {
        const user = this.knex("login")
            .select()
            .where("id", loginId);
        return user;
    }
    createUser(username, password, socialLogin) {
        const user = this.knex("login")
            .insert({
                username: username,
                password: password,
                social_login: JSON.stringify(socialLogin)
            });
        return user;
    }
    editUser(userId, username, password, socialLogin) {
        const user = this.knex("login")
            .update({
                username: username,
                password: req.body.password,
                social_login: JSON.stringify(socialLogin)
            })
            .where("id", userId);
        return user;
    }
    removeUser(userId) {
        const user = this.knex("login")
            .where("id", userId)
            .delete();
        return user;
    }

    // User info
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

    // Presentation
    getPresentation(id) {
        const presentation = this.knex("presentation")
            .select()
            .where("id", id);
        return presentation;
    }
    addPresentation(id, title, loc, address) {
        const presentation = this.knex("presentation")
            .insert({
                presenter_id: id,
                title: title,
                location: loc,
                address: address
            });
        return presentation;
    }
    editPresentation(presentationId, id, title, loc, address) {
        const presentation = this.knex("presentation")
            .update({
                presenter_id: id,
                title: title,
                location: loc,
                address: address
            })
            .where("id", presentationId);
        return presentation;
    }
    removePresentation(id) {
        const presentation = this.knex("presentation")
            .where("id", id)
            .delete();
        return presentation;
    }


    // Slides
    getSlides(id) {
        const slide = this.knex('pages')
            .select()
            .where('id', id);
        return slide;
    };
    addSlides(id, type, order) {
        const slide = this.knex('pages')
            .insert({
                presentation_id: id,
                page_type: type,
                order: order
            });
        return slide;
    };
    editSlides(slideId, id, type, order) {
        const slide = this.knex('pages')
            .update({
                presentation_id: id,
                page_type: type,
                order: order
            })
            .where('id', slideId);
        return slide;
    };
    removeSlides(id) {
        const slide = this.knex('pages')
            .where('id', id)
            .delete();
        return slide;
    };

    // Polls
    getPolls(pollId) {
        const poll = this.knex('polls')
            .select()
            .where('id', pollId);
        return poll;
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