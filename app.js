#!/usr/bin/nodejs

const express = require("express");
const device = require("express-device");
const setupPassport = require("./passport")
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const router = require('./routes/viewRoutes')(express);
// var multer = require('multer'); 




const SocketIOConnection = require("./sockets/socket-connection");
const socketIOConnection = new SocketIOConnection(http);
socketIOConnection.router();

const ViewRouter = require("./routes/viewRoutes");
const ApiRouter = require('./routes/apiRoutes');

const ImageActions = require('./databaseActions/imageActions');
const FolderActions = require('./databaseActions/folderActions');
const DatabaseActions = require('./databaseActions/databaseActions');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

setupPassport(app);

app.use(device.capture());
app.use(express.static(__dirname + "/public"));

// file upload
// const upload_path = './public/slides/';

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const config = require('./knexfile').development;
const knex = require('knex')(config);

// app.use("/", new ViewRouter().router());
app.use('/', router);
app.use('/api', new ApiRouter(new ImageActions(), new FolderActions(), new DatabaseActions(knex)).router());


http.listen(8181, () => console.log("App is running on 8181"));