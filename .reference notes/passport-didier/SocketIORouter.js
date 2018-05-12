class SocketIORouter {

    constructor(io, userService) {
        this.io = io;
        this.userService = userService;
    }

    router() {
        this.io.use((socket, next) => {
            if (!socket.session.passport) {
                socket.disconnect();
            } else {
                next();
            }
        });
        this.io.on('connection', this.connection.bind(this));
    }

    connection(socket) {
        // socket.emit('username', socket.session.passport.user);

        // socket.on('getUsers', this.getUsers(socket).bind(this));


        console.log(socket.session);
        console.log('a user connected to the socket');
        //user = 'admin';
        this.init(socket);
        var that = this;
        socket.on('new message', function (message) {
            //console.log(session);
            message.date = Date.now();
            message.from = socket.session.passport.user.username;
            console.log(message);
            that.postMessage(message);
            //io.to(message.room).emit('new message', message);
            that.io.emit('new message', message);
        });
    }

    init(socket, user) {
        //console.log(users);
        this.userService.smembers('users', (err, users) => { // list of all usernames
            console.log('!!!');
            console.log(socket.session);
            var user = socket.session.passport.user;
            console.log(user);
            this.userService.smembers(user.username, (err, rooms) => { // get set of rooms from a given user
                var messages = { me: {}, friends: [], messages: {} };
                for (var u of users) {
                    var [username, name] = u.split(':');
                    if (username != user.username) {
                        messages.friends.push({ 'username': username, 'name': name });
                        messages.messages[username] = [];
                    } else {
                        messages.me = { 'username': user.username, 'name': user.displayName };
                    }
                }
                console.log(messages);
                if (rooms.length == 0) {
                    socket.emit('init-messages', messages); // no messages yet
                } else {
                    console.log(rooms);
                    var i = 0;
                    for (const room of rooms) {     // get messages for each room
                        this.userService.lrange(room, 0, -1, (err, m) => {
                            console.log(room);
                            var [from, to] = room.split('/');
                            var friend = (from == user.username) ? to : from;  // get list of other people you are talking to
                            messages.messages[friend] = m.map(x => JSON.parse(x));
                            i++;
                            console.log(messages);
                            if (i == rooms.length) {    // last rooom
                                socket.emit('init-messages', messages);
                            }
                        });
                    }
                }
            });
        });

    }

    postMessage(message) {
        console.log(message);
        var room = (message.from < message.to) ? message.from + '/' + message.to : message.to + '/' + message.from;
        // create room if new
        console.log(room);
        this.userService.sadd(message.from, room);
        this.userService.sadd(message.to, room);
        this.userService.lpush(room, JSON.stringify(message));    // add message to room
    }

}

module.exports = SocketIORouter;