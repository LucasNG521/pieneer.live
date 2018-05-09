const SocketIO = require("socket.io");

class SocketIOConnection {
  constructor(http) {
    this.io = SocketIO(http).of('/testroom');
  }

  router() {
    this.io.on("connection", socket => {
      console.log("a user connected to the socket");
      socket.on("upvote", incvalue => {
        this.io.emit("upvote", incvalue);
      });
      socket.on("vote", (option)=>{
        this.io.emit('vote', option);
      })
    });
  }
}

module.exports = SocketIOConnection;
