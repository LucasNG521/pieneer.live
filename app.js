#!/usr/bin/nodejs
const express = require("express");
const device = require("express-device");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
// var multer = require('multer'); 


const config = require('./knexfile').development;
const knex = require('knex')(config);

const SocketIOConnection = require("./sockets/socket-connection");
const socketIOConnection = new SocketIOConnection(http);
socketIOConnection.router();

const ViewRouter = require("./routes/viewRoutes");
const ApiRouter = require('./routes/apiRoutes');

const ImageActions = require('./databaseActions/imageActions');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

app.use(device.capture());
app.use(express.static(__dirname + "/public"));
app.use("/", new ViewRouter().router());
app.use('/api', new ApiRouter(new ImageActions(), knex).router());


http.listen(8181, () => console.log("App is running on 8181"));