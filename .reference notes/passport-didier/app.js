#!/usr/bin/nodejs

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const http = require('http').Server(app);

const session = require('express-session');

const setupPassport = require('./init-passport');

const router = require('./router')(express);

const io = require('socket.io')(http);
const redis = require('redis');

var client = redis.createClient({
    host: 'localhost',
    port: 6379
});

var users = require('./users');  // initial users

for (const user of users) {
    client.sadd('users', user.username+':'+user.displayName);
}





/* MESSAGE SERVICE */

// function postMessage(message) {
//     var room = (message.from < message.to) ? message.from + '/' + message.to : message.to + '/' + message.from;
//     // create room if new
//     client.sadd(message.from, room);
//     client.sadd(message.to, room);
//     client.lpush(room, JSON.stringify(message));    // add message to room
// }

// function init(socket, user) {
//     client.smembers('users', (err, users) => { // list of all usernames
//         //var users = ['admin', 'dj', 'user', 'new'];
//         console.log(users);
//         client.smembers(user, (err, rooms) => { // get set of rooms from a given user
//             var messages = {};
//             for (var u of users) {
//                 if (u != user) {
//                     messages[u] = [];
//                 }
//             }
//             if (rooms.length == 0) {
//                 socket.emit('init-messages', messages); // no messages yet
//             } else {
//                 console.log(rooms);
//                 var i = 0;
//                 for (const room of rooms) {     // get messages for each room
//                     client.lrange(room, 0, -1, (err, m) => {
//                         [from, to] = room.split('/');
//                         var friend = (from == user) ? to : friend;  // get list of other people you are talking to
//                         messages[friend] = m.map(x => JSON.parse(x));
//                         i++;
//                         console.log(messages);
//                         if (i == rooms.length) {    // last rooom
//                             socket.emit('init-messages', messages);
//                         }
//                     });
//                 }
//             }
//         });
//     });

// }

// io.on('connection', (socket) => {
//     console.log(session);
//     console.log('a user connected to the socket');
//     user = 'admin';
//     init(socket, user);
//     socket.on('new message', function (message) {
//         console.log(session);
//         message.date = Date.now();
//         message.from = user;
//         console.log(message);
//         postMessage(message);
//         //io.to(message.room).emit('new message', message);
//         io.emit('new message', message);
//     });
//     // socket.on('new room', function (to) {
//     //     newRoom(user+'/'+to);
//     // });
//     // socket.on('subscribe', (userToJoin) => {
//     //     var chatRoom = `${user}/${userToJoin}`;
//     //     newRoom(chatRoom);
//     //     // socket.join(chatRoom);
//     // });
// });

// app.use(session({
//     secret: 'supersecretsrfslekfjhslkefjh',
//     resave: true,
//     saveUninitialized: true
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const initSessions = require('./init-sessions')(app, io, client);

const SocketIORouter = require('./SocketIORouter');

new SocketIORouter(io, client).router();

setupPassport(app, client);

app.use('/', router);

http.listen(8080);