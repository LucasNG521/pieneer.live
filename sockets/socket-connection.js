const SocketIO = require("socket.io");

class SocketIOConnection {
    constructor(http, knex) {
        // this.io = SocketIO(http).of('/testroom');
        this.io = SocketIO(http);
        this.knex = knex;
    }

    router() {
        this.io.on("connection", socket => {
            console.log("a user connected to the socket");
            socket.on("upvote", (vote) => {
                const create_vote = this.knex('vote')
                .insert({"vote0":0, "vote1":0, "vote2":0, "vote3":0, "vote4":0, "vote5":0}).returning("id")
                .then((ids) => {
                    vote.id = ids.pop();
                    const upvote = this.knex('vote').where('id', '=', vote.id).increment('vote' + vote.vote, 1).then(() => {
                        console.log('db updated');
                    });
                });
                console.log(create_vote);
                this.io.emit("upvote", vote.vote);
                console.log('upvote : ');
                console.log(vote);
                // TODO: dyn id
            });
            socket.on("vote", (option) => {
                this.io.emit('vote', option);
                console.log('vote : ');
                console.log(option);
            });
            socket.on("vote-start", (option) => {
                this.io.emit('vote-start', option);
                console.log('vote-start : ');
                console.log(option);
            });
            socket.on("vote-stop", (option) => {
                this.io.emit('vote-stop', option);
                console.log('vote-stop : ');
                console.log(option);
            });
            socket.on("like-question", (question) => {
                const likequestion = this.knex('questions')
                    .where('id', '=', question.id)
                    .increment('likes', 1).returning("likes")
                    .then((likes) => {
                        question.likes = likes.pop();
                        this.io.emit('update-like-question', question);
                        console.log('like-question : ');
                        console.log(question);
                    });
            });
            socket.on("unlike-question", (question) => {
                const unlikequestion = this.knex('questions')
                    .where('id', '=', question.id)
                    .decrement('likes', 1).returning("likes")
                    .then((likes) => {
                        question.likes = likes.pop();
                        this.io.emit('update-like-question', question);
                        console.log('unlike-question : ');
                        console.log(question);
                    });
            });
            socket.on("send-question", (question) => {
                question.likes = 0;
                const add_question = this.knex('questions')
                    .insert(question).returning("id")
                    .then((ids) => {
                        question.id = ids.pop();
                        this.io.emit('new-question', question);
                        console.log('send-question : ');
                        console.log(question);
                    });
            });
        });
    }
}

module.exports = SocketIOConnection;
