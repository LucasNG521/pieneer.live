#!/usr/bin/nodejs

const express = require("express");
const device = require("express-device");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);

const SocketIOConnection = require("./sockets/socket-connection");
const socketIOConnection = new SocketIOConnection(http);
socketIOConnection.router();

const ViewRouter = require("./routes/viewRoutes.js");

app.use(device.capture());
app.use(express.static(__dirname + "/public"));
app.use("/", new ViewRouter().router());

app.listen(8181, () => console.log("App is running on 8181"));
