const SocketIO = require("socket.io");

class SocketIOConnection {
    constructor(http) {
        // this.io = SocketIO(http).of('/testroom');
        this.io = SocketIO(http);
    }

    router() {
        this.io.on("connection", socket => {
            console.log("a user connected to the socket");
            socket.on("upvote", incvalue => {
                this.io.emit("upvote", incvalue);
                console.log('upvote : ');
                console.log(incvalue);
            });
            socket.on("vote", (option) => {
                this.io.emit('vote', option);
                console.log('vote : ');
                console.log(option);
                // TODO: update database
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
                question.like++; // TODO: update ++ from DB
                this.io.emit('update-like-question', question);
                console.log('like-question : ');
                console.log(question);
            });
            socket.on("unlike-question", (question) => {
                question.like--; // TODO: update -- from DB
                this.io.emit('update-like-question', question);
                console.log('unlike-question : ');
                console.log(question);
            });
            socket.on("send-question", (option) => {
                // TODO: add to DB & get new id
                option.id = 4;
                option.like = 0;
                this.io.emit('new-question', option);
                console.log('send-question : ');
                console.log(option);
            });
        });
    }
}

module.exports = SocketIOConnection;
