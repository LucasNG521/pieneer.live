const SocketIO = require("socket.io");

class SocketIOConnection {
  constructor(http) {
    this.io = SocketIO(http);
  }

  router() {
    this.io.on("connection", socket => {
      console.log("a user connected to the socket");
      socket.on("upvote", incvalue => {
        this.io.emit("upvote", incvalue);
      });
    });
  }
}

module.exports = SocketIOConnection;
